import { useState } from 'react'
import { MetricCard } from './MetricCard'
import { CompactStats } from './CompactStats'
import { ProfitChart } from './ProfitChart'
import { RecentTrades } from './RecentTrades'
import { 
  calculateWinRate, 
  calculateTotalProfit, 
  formatCurrency, 
  formatPercentage, 
  getTradesByPeriod,
  getMaxProfit,
  getMaxLoss,
  getMaxWinStreak,
  calculateAverageProfit
} from '@/utils/calculations'
import { CHART_PERIODS } from '@/constants'

export const Dashboard = ({ trades }) => {
  const [chartPeriod, setChartPeriod] = useState(CHART_PERIODS.DAILY)

  // 통계 계산
  const totalProfit = calculateTotalProfit(trades)
  const winRate = calculateWinRate(trades)
  const totalTrades = trades.length
  const currentBalance = trades.length > 0 ? parseFloat(trades[trades.length - 1].balance) || 0 : 0
  const maxProfit = getMaxProfit(trades)
  const maxLoss = getMaxLoss(trades)
  const maxWinStreak = getMaxWinStreak(trades)
  const averageProfit = calculateAverageProfit(trades)

  // Calculate trends (comparing last 5 trades to previous 5 for demo purposes)
  const calculateTrend = (data, count = 5) => {
    if (data.length < count * 2) return { trend: 'up', value: '0%' }
    const recent = data.slice(-count)
    const previous = data.slice(-count * 2, -count)
    const recentAvg = recent.reduce((sum, t) => sum + (parseFloat(t.withdrawal) - parseFloat(t.entry) || 0), 0) / count
    const previousAvg = previous.reduce((sum, t) => sum + (parseFloat(t.withdrawal) - parseFloat(t.entry) || 0), 0) / count
    
    if (previousAvg === 0) return { trend: 'up', value: '100%+' }
    const change = ((recentAvg - previousAvg) / Math.abs(previousAvg)) * 100
    return { 
      trend: change >= 0 ? 'up' : 'down', 
      value: `${Math.abs(change).toFixed(1)}%` 
    }
  }

  const profitTrend = calculateTrend(trades)

  // 차트 데이터 생성
  const chartData = [...trades]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(trade => ({
      date: trade.date,
      balance: parseFloat(trade.balance) || 0,
      profit: parseFloat(trade.entry) && parseFloat(trade.withdrawal) 
        ? parseFloat(trade.withdrawal) - parseFloat(trade.entry) 
        : 0
    }))

  // 컴팩트 통계 데이터
  const compactStats = [
    { label: '총 집계 거래', value: `${totalTrades}회` },
    { label: '승 기록 비율', value: formatPercentage(winRate) },
    { label: '세션당 수익', value: formatCurrency(averageProfit) },
    { label: '피크(Peak) 수익', value: formatCurrency(maxProfit) },
    { label: '드로우다운(Max)', value: formatCurrency(maxLoss) },
    { label: '연속 승 기록', value: `${maxWinStreak}연승` },
    { label: '최종 동기화', value: trades.length > 0 ? trades[trades.length - 1].date : '-' }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 상단 메인 메트릭 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="총 자산 상세"
          value={formatCurrency(currentBalance)}
          subtitle="전체 시드 머니 합계"
          trend="up"
          trendValue="12.5%"
        />
        <MetricCard
          title="누적 순수익"
          value={formatCurrency(totalProfit)}
          subtitle={totalProfit >= 0 ? '전체 기간 흑자' : '전체 기간 적자'}
          trend={profitTrend.trend}
          trendValue={profitTrend.value}
          className={totalProfit >= 0 ? 'ring-1 ring-success/10' : 'ring-1 ring-danger/10'}
        />
        <MetricCard
          title="통계 승률"
          value={formatPercentage(winRate)}
          subtitle={`${totalTrades}번의 유효 거래`}
          trend={winRate >= 50 ? 'up' : 'down'}
          trendValue={`${winRate.toFixed(1)}%`}
        />
        <MetricCard
          title="거래당 기댓값"
          value={formatCurrency(averageProfit)}
          subtitle="가중 평균 수익율"
          className="bg-slate-50 border-dashed"
        />
      </div>

      {/* 서브 메트릭 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/40 p-4 rounded-xl border border-slate-100 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">피크 수익</span>
          <span className="text-lg font-black text-success mt-1">{formatCurrency(maxProfit)}</span>
        </div>
        <div className="bg-white/40 p-4 rounded-xl border border-slate-100 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">최대 손실</span>
          <span className="text-lg font-black text-danger mt-1">{formatCurrency(maxLoss)}</span>
        </div>
        <div className="bg-white/40 p-4 rounded-xl border border-slate-100 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">런(Run) 승수</span>
          <span className="text-lg font-black text-primary mt-1">{maxWinStreak} WIN</span>
        </div>
        <div className="bg-white/40 p-4 rounded-xl border border-slate-100 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">기록 레코드</span>
          <span className="text-lg font-black text-slate-900 mt-1">{totalTrades} DATAS</span>
        </div>
      </div>

      {/* 메인 분석 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 수익 추이 분석 */}
        <div className="lg:col-span-2">
          <div className="premium-card h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-base font-black text-slate-800">퍼포먼스 아키텍처</h3>
                <p className="text-xs text-slate-600 mt-1 font-bold">시간 경과에 따른 잔고 및 수익 가시성</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {Object.values(CHART_PERIODS).map(period => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      chartPeriod === period
                        ? 'bg-white text-primary shadow-soft'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {period === 'daily' ? '1D' : period === 'weekly' ? '1W' : '1M'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full h-[350px] lg:h-[400px]">
              <ProfitChart data={chartData} period={chartPeriod} isMobile={typeof window !== 'undefined' && window.innerWidth < 1024} />
            </div>
          </div>
        </div>

        {/* 상세 분석 리포트 */}
        <div>
          <CompactStats stats={compactStats} />
        </div>
      </div>

      {/* 하단 섹션: 실시간 기록 */}
      <div className="space-y-4 pt-4 border-t border-slate-200/50">
        <div className="flex justify-between items-center px-2">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">실시간 분석 로그</h3>
            <p className="text-xs text-slate-700 mt-0.5 font-bold">최근 기록된 10개의 데이터 포인트</p>
          </div>
          <button className="text-xs font-bold text-primary hover:underline flex items-center space-x-1">
            <span>모든 데이터 보기</span>
            <ChevronRight size={14} />
          </button>
        </div>
        <RecentTrades trades={trades} />
      </div>
    </div>
  )
}

const ChevronRight = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)
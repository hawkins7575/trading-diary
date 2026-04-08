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
  getMaxProfit,
  getMaxLoss,
  getMaxWinStreak,
  calculateAverageProfit
} from '@/utils/calculations'
import { CHART_PERIODS } from '@/constants'
import { ArrowRight, Activity, TrendingUp, Zap, Calendar } from 'lucide-react'

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

  // 수익률 계산 (시드 머니 대비)
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date))
  const initialSeed = sortedTrades.length > 0 ? parseFloat(sortedTrades[0].seed || 0) : 0
  
  const totalProfitPercentage = initialSeed > 0 ? (totalProfit / initialSeed) * 100 : 0
  const balanceROI = initialSeed > 0 ? ((currentBalance - initialSeed) / initialSeed) * 100 : 0

  // 피크 수익/최대 손실율 계산
  const findTradeRate = (targetProfit) => {
    const trade = trades.find(t => t.profit === targetProfit)
    if (!trade) return 0
    const prevBalance = parseFloat(trade.balance) - (trade.profit || 0) - (parseFloat(trade.entry) || 0) + (parseFloat(trade.withdrawal) || 0)
    const base = prevBalance || parseFloat(trade.seed || 0)
    if (base === 0) return 0
    return ((trade.profit || 0) / base) * 100
  }

  const maxProfitRate = findTradeRate(maxProfit)
  const maxLossRate = findTradeRate(maxLoss)

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* 히어로 환영 메시지 (트렌디 요소) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">실시간 계정 분석 중</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">트레이딩 퍼포먼스</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">당신의 매매 데이터를 바탕으로 도출된 핵심 통계입니다.</p>
        </div>
        <div className="flex space-x-2">
           <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-700">{new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}</span>
           </div>
        </div>
      </div>

      {/* 상단 메인 메트릭 (Bento Grid Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard
          title="총 자산 상세"
          value={formatCurrency(currentBalance)}
          subtitle="전체 시드 머니 합계"
          trend={balanceROI >= 0 ? 'up' : 'down'}
          trendValue={formatPercentage(Math.abs(balanceROI))}
        />
        <MetricCard
          title="누적 순수익"
          value={formatCurrency(totalProfit)}
          subtitle={totalProfit >= 0 ? '전체 기간 흑자' : '전체 기간 적자'}
          trend={totalProfitPercentage >= 0 ? 'up' : 'down'}
          trendValue={formatPercentage(Math.abs(totalProfitPercentage))}
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
        />
      </div>

      {/* 서브 메트릭 (중간 강조 영역) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '최대 단일 이익', value: formatCurrency(maxProfit), rate: `+${maxProfitRate.toFixed(1)}%`, color: 'emerald', icon: <TrendingUp size={14}/> },
          { label: '최대 단일 손실', value: formatCurrency(maxLoss), rate: `${maxLossRate.toFixed(1)}%`, color: 'rose', icon: <Zap size={14}/> },
          { label: '최장 연속 승리', value: `${maxWinStreak}연승`, rate: 'Winning Streak', color: 'indigo', icon: <Activity size={14}/> },
          { label: '전체 거래 데이터', value: `${totalTrades}건`, rate: 'Data Points', color: 'slate', icon: <Calendar size={14}/> }
        ].map((item, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-sm p-5 rounded-3xl border border-white hover:border-primary/20 transition-all duration-300 group">
            <div className="flex justify-between items-center mb-3">
              <div className={`p-2 rounded-xl bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-black text-${item.color}-600 bg-${item.color}-50 px-2 py-0.5 rounded-full`}>
                {item.rate}
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
            <p className={`text-lg font-black mt-1 text-slate-900 group-hover:text-primary transition-colors`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* 메인 분석 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 수익 추이 분석 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium p-6 md:p-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">수익 퍼포먼스 아키텍처</h3>
                <p className="text-sm text-slate-500 font-bold mt-1">시간 경과에 따른 자산 변동성 및 수익 추이 분석</p>
              </div>
              <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
                {Object.values(CHART_PERIODS).map(period => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-5 py-2 text-xs font-black rounded-xl transition-all duration-300 ${
                      chartPeriod === period
                        ? 'bg-white text-primary shadow-soft scale-105'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {period === 'daily' ? '일간' : period === 'weekly' ? '주간' : '월간'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full h-[350px] lg:h-[450px]">
              <ProfitChart data={chartData} period={chartPeriod} isMobile={typeof window !== 'undefined' && window.innerWidth < 1024} />
            </div>
          </div>
        </div>

        {/* 상세 분석 리포트 */}
        <div className="space-y-6">
           <CompactStats stats={compactStats} />
           
           {/* 추가 인사이트 카드 (트렌디 요소) */}
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <TrendingUp size={120} />
              </div>
              <div className="relative z-10">
                <Zap size={24} className="text-yellow-400 mb-4 animate-pulse" />
                <h4 className="text-lg font-black mb-1">인공지능 분석 가이드</h4>
                <p className="text-indigo-100 text-xs font-bold leading-relaxed mb-6 opacity-80">현재 데이터상 승률이 안정적입니다. 리스크 관리에 집중하며 현재 전략을 유지하세요.</p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2">
                  <span>알고리즘 상세 분석</span>
                  <ArrowRight size={14} />
                </button>
              </div>
           </div>
        </div>
      </div>

      {/* 하단 섹션: 실시간 분석 로그 */}
      <div className="space-y-6 pt-10 border-t border-slate-100">
        <div className="flex justify-between items-end px-2">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
              Activity Logs
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">실시간 트레이딩 로그</h3>
          </div>
          <button className="text-[13px] font-black text-primary hover:bg-primary/5 px-4 py-2 rounded-xl transition-all flex items-center space-x-2 group">
            <span>모든 데이터 보기</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <RecentTrades trades={trades} />
      </div>
    </div>
  )
}
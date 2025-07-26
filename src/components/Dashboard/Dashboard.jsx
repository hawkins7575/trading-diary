import { useState } from 'react'
import { MetricCard } from './MetricCard'
import { CompactStats } from './CompactStats'
import { ProfitChart } from './ProfitChart'
import { RecentTrades } from './RecentTrades'
import { calculateWinRate, calculateTotalProfit, formatCurrency, formatPercentage, getTradesByPeriod } from '@/utils/calculations'
import { CHART_PERIODS } from '@/constants'

export const Dashboard = ({ trades }) => {
  const [chartPeriod, setChartPeriod] = useState(CHART_PERIODS.DAILY)

  // 통계 계산
  const totalProfit = calculateTotalProfit(trades)
  const winRate = calculateWinRate(trades)
  const totalTrades = trades.length
  const currentBalance = trades.length > 0 ? parseFloat(trades[trades.length - 1].balance) || 0 : 0

  // 기간별 거래 데이터
  const periodTrades = getTradesByPeriod(trades, chartPeriod)
  
  // 차트 데이터 생성
  const chartData = trades
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
    { label: '총 거래 횟수', value: `${totalTrades}회` },
    { label: '승률', value: formatPercentage(winRate) },
    { label: '평균 수익', value: totalTrades > 0 ? formatCurrency(totalProfit / totalTrades) : '₩0' },
    { label: '최근 거래', value: trades.length > 0 ? trades[trades.length - 1].date : '-' }
  ]

  return (
    <div className="space-y-6">
      {/* 상단 메트릭 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="현재 잔고"
          value={formatCurrency(currentBalance)}
          subtitle="총 자산"
        />
        <MetricCard
          title="총 수익"
          value={formatCurrency(totalProfit)}
          subtitle={totalProfit >= 0 ? '수익' : '손실'}
          className={totalProfit >= 0 ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}
        />
        <MetricCard
          title="승률"
          value={formatPercentage(winRate)}
          subtitle={`${totalTrades}회 거래`}
        />
        <MetricCard
          title="거래 횟수"
          value={`${totalTrades}회`}
          subtitle="전체 거래"
        />
      </div>

      {/* 차트 및 통계 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 수익 추이 차트 */}
        <div className="lg:col-span-2">
          <div className="metric-card p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
              <h3 className="text-lg font-semibold">수익 추이</h3>
              <div className="flex space-x-1 sm:space-x-2 overflow-x-auto">
                {Object.values(CHART_PERIODS).map(period => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors whitespace-nowrap ${
                      chartPeriod === period
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period === 'daily' ? '일간' : period === 'weekly' ? '주간' : '월간'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 데스크톱 차트 */}
            <div className="hidden lg:block">
              <ProfitChart data={chartData} period={chartPeriod} />
            </div>
            
            {/* 모바일 차트 */}
            <div className="lg:hidden">
              <ProfitChart data={chartData} period={chartPeriod} isMobile={true} />
            </div>
          </div>
        </div>

        {/* 컴팩트 통계 */}
        <div>
          <CompactStats stats={compactStats} />
        </div>
      </div>

      {/* 최근 거래 내역 */}
      <RecentTrades trades={trades} />
    </div>
  )
}
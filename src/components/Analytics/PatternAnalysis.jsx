import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TRADE_TAGS } from '@/constants'
import { 
  formatCurrency, 
  formatPercentage, 
  getMaxProfit, 
  getMaxLoss, 
  getMaxWinStreak, 
  getMaxLossStreak, 
  getMonthlyReturns, 
  getProfitDistribution, 
  calculateGoalAchievement, 
  getTradingFrequency,
  calculateAverageProfit 
} from '@/utils/calculations'

const COLORS = ['#3a5ba0', '#f7c873', '#6ea3c1', '#4ade80', '#f87171', '#a855f7', '#06b6d4', '#84cc16']

export const PatternAnalysis = ({ trades }) => {
  // 패턴 분석 데이터 계산
  const calculatePatternStats = () => {
    if (trades.length === 0) return { tagStats: {}, checklistStats: {}, emotionStats: {} }
    
    const tagStats = {}
    const checklistStats = {}
    const emotionStats = {}
    
    // 태그별 통계
    trades.forEach(trade => {
      if (trade.tags && Array.isArray(trade.tags)) {
        trade.tags.forEach(tag => {
          if (!tagStats[tag]) {
            tagStats[tag] = { count: 0, profit: 0, wins: 0 }
          }
          tagStats[tag].count++
          tagStats[tag].profit += trade.profit || 0
          if ((trade.profit || 0) > 0) tagStats[tag].wins++
        })
      }
    })
    
    // 체크리스트별 통계
    trades.forEach(trade => {
      if (trade.checklist && typeof trade.checklist === 'object') {
        Object.entries(trade.checklist).forEach(([key, checked]) => {
          if (!checklistStats[key]) {
            checklistStats[key] = { checked: 0, unchecked: 0, checkedProfit: 0, uncheckedProfit: 0 }
          }
          if (checked) {
            checklistStats[key].checked++
            checklistStats[key].checkedProfit += trade.profit || 0
          } else {
            checklistStats[key].unchecked++
            checklistStats[key].uncheckedProfit += trade.profit || 0
          }
        })
      }
    })
    
    // 감정별 통계
    trades.forEach(trade => {
      if (trade.emotion) {
        if (!emotionStats[trade.emotion]) {
          emotionStats[trade.emotion] = { count: 0, profit: 0, wins: 0 }
        }
        emotionStats[trade.emotion].count++
        emotionStats[trade.emotion].profit += trade.profit || 0
        if ((trade.profit || 0) > 0) emotionStats[trade.emotion].wins++
      }
    })
    
    return { tagStats, checklistStats, emotionStats }
  }

  const { tagStats, checklistStats, emotionStats } = calculatePatternStats()

  // 상세 통계 계산
  const maxProfit = getMaxProfit(trades)
  const maxLoss = getMaxLoss(trades)
  const maxWinStreak = getMaxWinStreak(trades)
  const maxLossStreak = getMaxLossStreak(trades)
  const averageProfit = calculateAverageProfit(trades)
  const monthlyReturns = getMonthlyReturns(trades)
  const profitDistribution = getProfitDistribution(trades)
  const goalAchievement = calculateGoalAchievement(trades)
  const tradingFreq = getTradingFrequency(trades)

  // 태그 차트 데이터
  const tagChartData = Object.entries(tagStats)
    .map(([tag, stats]) => ({
      name: tag.replace(/_/g, ' '),
      count: stats.count,
      winRate: stats.count > 0 ? (stats.wins / stats.count) * 100 : 0,
      avgProfit: stats.count > 0 ? stats.profit / stats.count : 0
    }))
    .sort((a, b) => b.count - a.count)

  // 감정별 차트 데이터
  const emotionChartData = Object.entries(emotionStats)
    .map(([emotion, stats]) => ({
      name: emotion.replace(/_/g, ' '),
      count: stats.count,
      winRate: stats.count > 0 ? (stats.wins / stats.count) * 100 : 0
    }))
    .sort((a, b) => b.winRate - a.winRate)

  // 체크리스트 효과 데이터
  const checklistEffectData = Object.entries(checklistStats)
    .map(([key, stats]) => ({
      name: key.replace(/_/g, ' '),
      checkedWinRate: stats.checked > 0 ? 
        (trades.filter(t => t.checklist?.[key] && (t.profit || 0) > 0).length / stats.checked) * 100 : 0,
      uncheckedWinRate: stats.unchecked > 0 ? 
        (trades.filter(t => !t.checklist?.[key] && (t.profit || 0) > 0).length / stats.unchecked) * 100 : 0,
      checkedCount: stats.checked,
      uncheckedCount: stats.unchecked
    }))
    .filter(item => item.checkedCount > 0 || item.uncheckedCount > 0)
    .sort((a, b) => (b.checkedWinRate - b.uncheckedWinRate) - (a.checkedWinRate - a.uncheckedWinRate))

  if (trades.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">매매복기</h2>
        <div className="metric-card p-8 text-center">
          <p className="text-gray-500">거래 데이터가 부족합니다. 더 많은 거래를 추가해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">매매복기</h2>

      {/* 상세 통계 카드들 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(maxProfit)}</div>
          <div className="text-sm text-gray-600">최고 수익</div>
        </div>
        <div className="metric-card p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{formatCurrency(maxLoss)}</div>
          <div className="text-sm text-gray-600">최고 손실</div>
        </div>
        <div className="metric-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(averageProfit)}</div>
          <div className="text-sm text-gray-600">평균 수익</div>
        </div>
        <div className="metric-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{formatPercentage(goalAchievement.achievementRate)}</div>
          <div className="text-sm text-gray-600">이번달 목표 달성률</div>
        </div>
      </div>

      {/* 연승/연패 및 거래 빈도 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metric-card p-6">
          <h3 className="text-lg font-semibold mb-4">연승/연패 기록</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{maxWinStreak}</div>
              <div className="text-sm text-gray-600">최대 연승</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{maxLossStreak}</div>
              <div className="text-sm text-gray-600">최대 연패</div>
            </div>
          </div>
        </div>

        <div className="metric-card p-6">
          <h3 className="text-lg font-semibold mb-4">거래 빈도</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">일평균:</span>
              <span className="font-semibold">{tradingFreq.dailyAvg.toFixed(1)}회</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">주평균:</span>
              <span className="font-semibold">{tradingFreq.weeklyAvg.toFixed(1)}회</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">월평균:</span>
              <span className="font-semibold">{tradingFreq.monthlyAvg.toFixed(1)}회</span>
            </div>
          </div>
        </div>
      </div>

      {/* 월별 수익률 추이 */}
      {monthlyReturns.length > 0 && (
        <div className="metric-card p-6">
          <h3 className="text-lg font-semibold mb-4">월별 수익률 추이</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'profit') return [formatCurrency(value), '월 수익']
                    if (name === 'winRate') return [formatPercentage(value), '승률']
                    return [value, name]
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#3a5ba0" 
                  strokeWidth={2}
                  name="월 수익"
                  yAxisId="left"
                />
                <Line 
                  type="monotone" 
                  dataKey="winRate" 
                  stroke="#f7c873" 
                  strokeWidth={2}
                  yAxisId="right"
                  name="승률"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 수익 분포 */}
      {profitDistribution.ranges.length > 0 && (
        <div className="metric-card p-6">
          <h3 className="text-lg font-semibold mb-4">수익 분포</h3>
          <div className="space-y-3">
            {profitDistribution.ranges.map((range, index) => (
              <div key={range.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{range.label}</span>
                <div className="text-right">
                  <div className="font-semibold">{range.count}회</div>
                  <div className="text-sm text-gray-600">
                    {((range.count / trades.length) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">
              수익 거래: {profitDistribution.stats.totalProfitTrades}회 
              ({formatPercentage(profitDistribution.stats.profitTradeRatio)})
            </div>
            <div className="text-sm font-medium text-red-800">
              손실 거래: {profitDistribution.stats.totalLossTrades}회 
              ({formatPercentage(100 - profitDistribution.stats.profitTradeRatio)})
            </div>
          </div>
        </div>
      )}

      {/* 패턴별 성과 분석 */}
      <div className="metric-card p-6">
        <h3 className="text-lg font-semibold mb-4">패턴별 성과 분석</h3>
        {tagChartData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tagChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'winRate') return [formatPercentage(value), '승률']
                    if (name === 'count') return [value, '거래 횟수']
                    if (name === 'avgProfit') return [formatCurrency(value), '평균 수익']
                    return [value, name]
                  }}
                />
                <Bar dataKey="count" fill="#3a5ba0" name="거래 횟수" />
                <Bar dataKey="winRate" fill="#f7c873" name="승률 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">패턴 태그 데이터가 없습니다</p>
        )}
      </div>

      {/* 감정 상태별 성과 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metric-card p-6">
          <h3 className="text-lg font-semibold mb-4">감정 상태별 성과</h3>
          {emotionChartData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {emotionChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, '거래 횟수']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">감정 데이터가 없습니다</p>
          )}
        </div>

        {/* 감정별 승률 상세 */}
        <div className="metric-card p-6">
          <h3 className="text-lg font-semibold mb-4">감정별 승률</h3>
          <div className="space-y-3">
            {emotionChartData.map((emotion, index) => (
              <div key={emotion.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium">{emotion.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPercentage(emotion.winRate)}</div>
                  <div className="text-sm text-gray-600">{emotion.count}회</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 체크리스트 효과 분석 */}
      <div className="metric-card p-6">
        <h3 className="text-lg font-semibold mb-4">체크리스트 준수 효과</h3>
        {checklistEffectData.length > 0 ? (
          <div className="space-y-4">
            {checklistEffectData.map((item) => (
              <div key={item.name} className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">{item.name}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">체크 시 승률</div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatPercentage(item.checkedWinRate)}
                    </div>
                    <div className="text-xs text-gray-500">{item.checkedCount}회</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-sm text-gray-600">미체크 시 승률</div>
                    <div className="text-lg font-semibold text-red-600">
                      {formatPercentage(item.uncheckedWinRate)}
                    </div>
                    <div className="text-xs text-gray-500">{item.uncheckedCount}회</div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className={`text-sm font-medium ${
                    item.checkedWinRate > item.uncheckedWinRate ? 'text-green-600' : 'text-red-600'
                  }`}>
                    차이: {formatPercentage(Math.abs(item.checkedWinRate - item.uncheckedWinRate))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">체크리스트 데이터가 없습니다</p>
        )}
      </div>

      {/* 개선 제안 */}
      <div className="metric-card p-6">
        <h3 className="text-lg font-semibold mb-4">개선 제안</h3>
        <div className="space-y-3">
          {/* 가장 성공적인 패턴 */}
          {tagChartData.length > 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">✅ 성공 패턴 강화</h4>
              <p className="text-green-700">
                '{tagChartData.sort((a, b) => b.winRate - a.winRate)[0]?.name}' 패턴의 승률이 
                {formatPercentage(tagChartData.sort((a, b) => b.winRate - a.winRate)[0]?.winRate)}로 
                가장 높습니다. 이 패턴을 더 자주 활용해보세요.
              </p>
            </div>
          )}

          {/* 체크리스트 개선 제안 */}
          {checklistEffectData.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">📋 체크리스트 준수 강화</h4>
              <p className="text-blue-700">
                '{checklistEffectData[0]?.name}' 항목을 체크했을 때 승률이 
                {formatPercentage(checklistEffectData[0]?.checkedWinRate - checklistEffectData[0]?.uncheckedWinRate)} 
                더 높습니다. 거래 전 반드시 확인하세요.
              </p>
            </div>
          )}

          {/* 감정 관리 제안 */}
          {emotionChartData.length > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">🧘 감정 관리</h4>
              <p className="text-yellow-700">
                '{emotionChartData.sort((a, b) => b.winRate - a.winRate)[0]?.name}' 상태일 때 
                성과가 가장 좋습니다. 감정적으로 불안정한 상태에서는 거래를 피하는 것이 좋겠습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
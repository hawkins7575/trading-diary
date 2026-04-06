import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import { TRADE_TAGS } from '@/constants'
import { 
  Trophy, 
  Skull, 
  TrendingUp, 
  Activity, 
  Target, 
  Zap, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  BarChart3,
  Calendar,
  AlertCircle
} from 'lucide-react'
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

const COLORS = {
  success: '#22c55e',
  danger: '#ef4444',
  primary: '#3b82f6',
  warning: '#f59e0b',
  slate: '#64748b'
}

export const PatternAnalysis = ({ trades }) => {
  // 패턴 분석 데이터 계산
  const calculatePatternStats = () => {
    if (trades.length === 0) return { tagStats: {}, checklistStats: {} }
    
    const tagStats = {}
    const checklistStats = {}
    
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
    
    return { tagStats, checklistStats }
  }

  const { tagStats, checklistStats } = calculatePatternStats()

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

  // 성공/실패 패턴 데이터를 구분하여 생성
  const successPatternChartData = TRADE_TAGS.success.map(tag => {
    const stats = tagStats[tag] || { count: 0, wins: 0, profit: 0 }
    return {
      name: tag.replace(/_/g, ' '),
      category: 'SUCCESS',
      count: stats.count,
      winRate: stats.count > 0 ? (stats.wins / stats.count) * 100 : 0
    }
  })

  const failurePatternChartData = TRADE_TAGS.failure.map(tag => {
    const stats = tagStats[tag] || { count: 0, wins: 0, profit: 0 }
    return {
      name: tag.replace(/_/g, ' '),
      category: 'FAILURE',
      count: stats.count,
      winRate: stats.count > 0 ? (stats.wins / stats.count) * 100 : 0
    }
  })

  const successPatternData = successPatternChartData
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count)

  const failurePatternData = failurePatternChartData
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count)

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
      <div className="premium-card py-20 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
          <BarChart3 size={40} />
        </div>
        <h3 className="text-xl font-black text-slate-800">데이터 분석이 불가능합니다</h3>
        <p className="text-slate-500 mt-2">최소 5건 이상의 거래 데이터를 입력하면 심층 분석 리포트가 생성됩니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 분석 헤더 섹션 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center space-x-2 text-primary mb-1">
            <Activity size={18} fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-widest">Advanced Intelligence</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">하이테크 매매 패턴 분석</h2>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl">
            과거의 성과를 분석하여 승리 확률을 높이는 전략적 인사이트를 제공합니다. 반복되는 성공과 실패의 패턴을 시각화합니다.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <Calendar size={16} className="text-slate-400" />
          <span className="text-xs font-black text-slate-600">누적 데이터: {trades.length}건</span>
        </div>
      </div>

      {/* 핵심 분석 지표 그리드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '최고 수익 (Max)', value: maxProfit, icon: <Trophy size={18} />, color: 'text-success', bg: 'bg-success/10' },
          { label: '최고 손실 (Drawdown)', value: maxLoss, icon: <Skull size={18} />, color: 'text-danger', bg: 'bg-danger/10' },
          { label: '평균 기대 수익 (EV)', value: averageProfit, icon: <Zap size={18} />, color: 'text-primary', bg: 'bg-primary/10' },
          { label: '목표 달성 지수', value: goalAchievement.achievementRate, icon: <Target size={18} />, color: 'text-warning', bg: 'bg-warning/10', isPercent: true },
        ].map((item, i) => (
          <div key={i} className="premium-card p-6 flex flex-col items-center text-center group">
            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
            <div className={`text-xl font-black text-slate-900 ${item.isPercent ? 'text-warning' : ''}`}>
               {item.isPercent ? `${item.value.toFixed(1)}%` : formatCurrency(item.value)}
            </div>
          </div>
        ))}
      </div>

      {/* 리스크 사이클 및 빈도 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="premium-card p-8 lg:col-span-2">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
            <Activity className="text-primary" size={16}/> 월별 수익 및 승률 상관관계
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyReturns}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} fontWeight="bold" />
                <YAxis yAxisId="left" stroke="#94A3B8" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value, name) => {
                    if (name === 'profit') return [formatCurrency(value), 'Profit']
                    if (name === 'winRate') return [`${value}%`, 'Win Rate']
                    return [value, name]
                  }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="profit" 
                  stroke={COLORS.primary} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorProfit)"
                  name="profit"
                />
                <Line 
                  yAxisId="right"
                  type="stepAfter" 
                  dataKey="winRate" 
                  stroke={COLORS.warning} 
                  strokeWidth={2}
                  dot={{ r: 4, fill: COLORS.warning, strokeWidth: 2, stroke: '#fff' }}
                  name="winRate"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="premium-card p-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Execution Cycle</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-success/5 rounded-2xl p-4 border border-success/10 text-center">
                <div className="text-2xl font-black text-success tracking-tighter">{maxWinStreak}</div>
                <div className="text-[10px] font-bold text-success/70 uppercase">Max Win Streak</div>
              </div>
              <div className="bg-danger/5 rounded-2xl p-4 border border-danger/10 text-center">
                <div className="text-2xl font-black text-danger tracking-tighter">{maxLossStreak}</div>
                <div className="text-[10px] font-bold text-danger/70 uppercase">Max Loss Streak</div>
              </div>
            </div>
          </div>

          <div className="premium-card p-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Yield Factor Architecture</h3>
            <div className="space-y-4">
              {(() => {
                const gains = trades.filter(t => (t.profit || 0) > 0).map(t => t.profit)
                const losses = trades.filter(t => (t.profit || 0) < 0).map(t => Math.abs(t.profit))
                const totalGains = gains.reduce((sum, g) => sum + g, 0)
                const totalLosses = losses.reduce((sum, l) => sum + l, 0)
                const avgWin = gains.length > 0 ? totalGains / gains.length : 0
                const avgLoss = losses.length > 0 ? totalLosses / losses.length : 0
                const profitFactor = totalLosses > 0 ? totalGains / totalLosses : (totalGains > 0 ? 100 : 0)
                const rrRatio = avgLoss > 0 ? avgWin / avgLoss : 0
                const breakEvenWinRate = rrRatio > 0 ? (1 / (1 + rrRatio)) * 100 : 0

                const metrics = [
                  { label: 'Profit Factor', value: profitFactor.toFixed(2), detail: '익절액 / 손절액', color: profitFactor >= 2.0 ? 'text-success' : profitFactor >= 1.0 ? 'text-primary' : 'text-danger' },
                  { label: 'Reward/Risk Ratio', value: `1:${rrRatio.toFixed(2)}`, detail: '평균 수익 / 평균 손실' },
                  { label: 'B.E Win Rate', value: `${breakEvenWinRate.toFixed(1)}%`, detail: '손익분기 승률' },
                ]

                return metrics.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors">
                    <div>
                      <span className="text-xs font-black text-slate-900 block tracking-tight">{item.label}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.detail}</span>
                    </div>
                    <span className={`text-sm font-black ${item.color || 'text-slate-900'}`}>{item.value}</span>
                  </div>
                ))
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* 인공지능 패턴 분석 리포트 */}
      <div className="premium-card p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BarChart3 size={200} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-primary-light mb-4">
            <Lightbulb size={20} className="text-primary"/>
            <h3 className="text-lg font-black tracking-tight text-primary">Strategic Insight Report</h3>
          </div>
          <p className="text-slate-400 text-sm mb-10 max-w-2xl">
            귀하의 매매 데이터를 기반으로 산출된 고위험 및 고수익 패턴 분석 결과입니다. 
            아래의 성공 공식을 강화하고 실패 트리거를 제거하십시오.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-success" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-300">Dominant Success Patterns</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {successPatternData.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-sm font-bold">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-success bg-success/10 px-2 py-1 rounded">Rate: {item.winRate.toFixed(1)}%</span>
                      <span className="text-xs text-slate-500 whitespace-nowrap">{item.count} hits</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={16} className="text-danger" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-300">Negative Correlation Triggers</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {failurePatternData.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-sm font-bold">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-danger bg-danger/10 px-2 py-1 rounded">Rate: {item.winRate.toFixed(1)}%</span>
                      <span className="text-xs text-slate-500 whitespace-nowrap">{item.count} hits</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 알고리즘 개선 알림 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-8">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
            <CheckCircle2 className="text-success" size={16}/> Checklist Performance Analysis
          </h3>
          <div className="space-y-6">
            {checklistEffectData.slice(0, 3).map((item, i) => (
              <div key={i} className="space-y-4 pb-6 border-b border-slate-100 last:border-none">
                <h4 className="text-sm font-black text-slate-700">{item.name}</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-success transition-all duration-1000" style={{ width: `${item.checkedWinRate}%` }} />
                    <div className="absolute -top-6 left-0 text-[10px] font-black text-success uppercase">Checked: {item.checkedWinRate.toFixed(1)}%</div>
                  </div>
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-danger transition-all duration-1000" style={{ width: `${item.uncheckedWinRate}%` }} />
                     <div className="absolute -top-6 left-0 text-[10px] font-black text-danger uppercase">Unchecked: {item.uncheckedWinRate.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="premium-card p-8 border-l-4 border-l-primary">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="text-primary" size={16}/> Professional Recommendation
            </h3>
            <div className="space-y-4">
               {successPatternData.length > 0 && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 mb-1">성공 패턴 집중 강화</div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      귀하의 트레이딩에서 <strong>'{successPatternData[0]?.name}'</strong> 패턴의 성공 확률이 매우 높습니다. 
                      이 시그널이 발생할 때 포지션 사이징을 강화해 보세요.
                    </p>
                  </div>
                </div>
              )}
              {failurePatternData.length > 0 && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-danger/10 flex-shrink-0 flex items-center justify-center text-danger">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 mb-1">위험 지표 필터링</div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <strong>'{failurePatternData[0]?.name}'</strong> 상황에서는 승률이 현격히 낮아집니다. 
                      해당 조건에서는 보수적인 관망을 추천드립니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
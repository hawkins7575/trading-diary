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
  AlertCircle,
  BrainCircuit,
  Workflow,
  Sparkles
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
  success: '#10b981',
  danger: '#f43f5e',
  primary: '#6366f1',
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
      <div className="bg-white rounded-[2.5rem] py-24 text-center border border-slate-100 shadow-premium">
        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300 border border-white">
          <BarChart3 size={40} />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">데이터 분석 대기 중</h3>
        <p className="text-sm text-slate-500 mt-2 font-medium">최소 5건 이상의 거래 데이터를 입력하면 심층 분석 리포트가 생성됩니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 px-2 lg:px-0">
      {/* 분석 헤더 섹션: 통일된 프리미엄 스타일 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="hidden sm:block"></div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-2 flex-1 sm:flex-none justify-center">
            <Calendar size={14} className="text-slate-400" />
            <span className="text-[11px] font-black text-slate-700">Accumulated Records: {trades.length}</span>
          </div>
        </div>
      </div>

      {/* 핵심 분석 지표 그리드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: 'Max Profit', value: maxProfit, icon: <Trophy size={18} />, color: 'emerald' },
          { label: 'Max Drawdown', value: maxLoss, icon: <Skull size={18} />, color: 'rose' },
          { label: 'Expected Value', value: averageProfit, icon: <Zap size={18} />, color: 'indigo' },
          { label: 'Goal Achievement', value: goalAchievement.achievementRate, icon: <Target size={18} />, color: 'amber', isPercent: true },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 lg:p-7 border border-slate-100 shadow-premium flex flex-col items-center text-center group transition-all duration-300 hover:border-slate-200">
            <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
              {item.icon}
            </div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{item.label}</div>
            <div className={`text-lg lg:text-xl font-black text-slate-900 tracking-tight`}>
               {item.isPercent ? `${item.value.toFixed(1)}%` : formatCurrency(item.value)}
            </div>
          </div>
        ))}
      </div>

      {/* 리스크 사이클 및 빈도 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium p-6 lg:p-10 lg:col-span-2">
          <div className="flex justify-between items-center mb-10">
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Correlative Analytics</p>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">수익 및 승률 상관관계</h3>
             </div>
             <Workflow size={24} className="text-slate-100" />
          </div>
          <div className="h-52 lg:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyReturns}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#cbd5e1" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: '900' }}
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
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorProfit)"
                  name="profit"
                />
                <Line 
                  yAxisId="right"
                  type="stepAfter" 
                  dataKey="winRate" 
                  stroke={COLORS.warning} 
                  strokeWidth={3}
                  dot={{ r: 5, fill: COLORS.warning, strokeWidth: 2, stroke: '#fff' }}
                  name="winRate"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium p-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 leading-none">Cycle Detection</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/50 text-center">
                <div className="text-3xl font-black text-emerald-600 tracking-tighter mb-1">{maxWinStreak}</div>
                <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none">Max Strak</div>
              </div>
              <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100/50 text-center">
                <div className="text-3xl font-black text-rose-600 tracking-tighter mb-1">{maxLossStreak}</div>
                <div className="text-[9px] font-black text-rose-400 uppercase tracking-widest leading-none">Max Drawdown</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <Sparkles size={120} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 leading-none relative z-10">Factor Architecture</p>
            <div className="space-y-3 relative z-10">
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
                  { label: 'Profit Factor', value: profitFactor.toFixed(2), detail: 'Ratio', color: profitFactor >= 2.0 ? 'text-emerald-400' : profitFactor >= 1.0 ? 'text-indigo-400' : 'text-rose-400' },
                  { label: 'R/R Ratio', value: `1:${rrRatio.toFixed(2)}`, detail: 'Average' },
                  { label: 'B.E Win Rate', value: `${breakEvenWinRate.toFixed(1)}%`, detail: 'Threshold' },
                ]

                return metrics.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 px-5 py-4 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all active:scale-[0.98]">
                    <div>
                      <span className="text-[13px] font-black text-white block tracking-tight">{item.label}</span>
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{item.detail}</span>
                    </div>
                    <span className={`text-base font-black ${item.color || 'text-white'}`}>{item.value}</span>
                  </div>
                ))
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* 인공지능 패턴 분석 리포트 */}
      <div className="bg-white rounded-[3rem] p-10 lg:p-12 border border-slate-100 shadow-premium relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                <Lightbulb size={20} strokeWidth={2.5}/>
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Insight Engine</p>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Strategic Performance Report</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Recommended Success Vectors</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {successPatternData.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100/50 hover:bg-white hover:shadow-subtle transition-all duration-300">
                    <span className="text-[14px] font-black text-slate-800">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">Rate: {item.winRate.toFixed(1)}%</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.count} Samples</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={16} className="text-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Detected Risk Correlations</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {failurePatternData.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100/50 hover:bg-white hover:shadow-subtle transition-all duration-300">
                    <span className="text-[14px] font-black text-slate-800">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">Rate: {item.winRate.toFixed(1)}%</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.count} Samples</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 알고리즘 개선 알림 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium">
          <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Rule Compliance Analysis</h3>
              <Activity className="text-slate-200" size={24} />
          </div>
          <div className="space-y-8">
            {checklistEffectData.slice(0, 3).map((item, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-[13px] font-black text-slate-700">{item.name}</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <div className="flex justify-between items-end">
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Followed</span>
                        <span className="text-xs font-black text-slate-900">{item.checkedWinRate.toFixed(1)}%</span>
                     </div>
                     <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full shadow-emerald-200 shadow-sm" style={{ width: `${item.checkedWinRate}%` }} />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-end">
                        <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Ignored</span>
                        <span className="text-xs font-black text-slate-900">{item.uncheckedWinRate.toFixed(1)}%</span>
                     </div>
                     <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full shadow-rose-200 shadow-sm" style={{ width: `${item.uncheckedWinRate}%` }} />
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <BrainCircuit size={120} />
            </div>
            <div className="relative z-10">
               <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-widest mb-10 flex items-center gap-2">
                 <Zap size={16} fill="currentColor" /> Professional Recommendation
               </h3>
               <div className="space-y-6">
                  {successPatternData.length > 0 && (
                   <div className="flex gap-5">
                     <div className="w-12 h-12 rounded-[1.2rem] bg-white/10 flex-shrink-0 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                       <TrendingUp size={20} strokeWidth={3} />
                     </div>
                     <div>
                       <div className="text-[15px] font-black text-white mb-2 tracking-tight">상위 성공 패턴 집중</div>
                       <p className="text-xs text-slate-400 font-bold leading-relaxed opacity-80">
                         최근 <strong>'{successPatternData[0]?.name}'</strong> 패턴에서 압도적인 승률({successPatternData[0]?.winRate.toFixed(1)}%)이 감지되었습니다. 
                         해당 시그널이 발생할 때 리스크 관리를 유지하며 비중을 점진적으로 확대하는 것을 권장합니다.
                       </p>
                     </div>
                   </div>
                 )}
                 {failurePatternData.length > 0 && (
                   <div className="flex gap-5">
                     <div className="w-12 h-12 rounded-[1.2rem] bg-white/10 flex-shrink-0 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                       <AlertCircle size={20} strokeWidth={3} />
                     </div>
                     <div>
                       <div className="text-[15px] font-black text-white mb-2 tracking-tight">위험 필터링 경고</div>
                       <p className="text-xs text-slate-400 font-bold leading-relaxed opacity-80">
                         <strong>'{failurePatternData[0]?.name}'</strong> 상황에서 가장 높은 손실 비율이 발생하고 있습니다. 
                         해당 조건이 충족될 때는 전략적 관망(Wait & See)을 통해 불필요한 드로우다운을 방지하십시오.
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
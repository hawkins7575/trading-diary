import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Target, BarChart3 } from 'lucide-react'

export const MetricCard = ({ title, value, subtitle, trend, trendValue, className = '' }) => {
  const isPositive = trend === 'up'
  
  const getIcon = () => {
    switch (title) {
      case '총 자산 상세': return <Wallet size={18} />
      case '누적 순수익': return <TrendingUp size={18} />
      case '통계 승률': return <Target size={18} />
      default: return <BarChart3 size={18} />
    }
  }

  const getIconColor = () => {
    switch (title) {
      case '누적 순수익': return isPositive ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'
      case '총 자산 상세': return 'text-blue-500 bg-blue-50'
      case '통계 승률': return 'text-indigo-500 bg-indigo-50'
      default: return 'text-slate-500 bg-slate-50'
    }
  }

  return (
    <div className={`premium-card group hover:scale-[1.02] active:scale-[0.98] ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl transition-colors duration-300 ${getIconColor()}`}>
          {getIcon()}
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${
            isPositive 
              ? 'bg-emerald-500/10 text-emerald-600' 
              : 'bg-rose-500/10 text-rose-600'
          }`}>
            {isPositive ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-1">{title}</p>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate group-hover:translate-x-1 transition-transform duration-300">
          {value}
        </h3>
      </div>

      {subtitle && (
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 truncate max-w-[70%]">{subtitle}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-colors"></div>
        </div>
      )}
    </div>
  )
}
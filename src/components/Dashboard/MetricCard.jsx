import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export const MetricCard = ({ title, value, subtitle, trend, trendValue, className = '' }) => {
  const isPositive = trend === 'up'
  const isNegative = trend === 'down'

  return (
    <div className={`premium-card group ${className}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{title}</h3>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          }`}>
            {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight transition-transform group-hover:translate-x-1 duration-300 truncate">{value}</div>
      </div>
      {subtitle && (
        <p className="text-[11px] font-bold text-slate-800 mt-2 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2 shrink-0"></span>
          <span className="truncate">{subtitle}</span>
        </p>
      )}
    </div>
  )
}
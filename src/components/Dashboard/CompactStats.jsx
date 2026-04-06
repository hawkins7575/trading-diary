export const CompactStats = ({ stats }) => {
  return (
    <div className="premium-card h-full">
      <div className="px-1 py-1 mb-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">계정 요약 리포트</h3>
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      </div>
      <div className="space-y-1">
        {stats.map((stat, index) => (
          <div key={index} className="compact-stat-item group hover:bg-slate-50 transition-colors px-2 rounded-lg">
            <span className="stat-label-compact group-hover:text-slate-700 transition-colors">{stat.label}</span>
            <span className="stat-value-compact font-black text-slate-900">{stat.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-slate-100 italic text-[10px] text-slate-400 font-medium">
        * 모든 데이터는 실시간으로 반영됩니다.
      </div>
    </div>
  )
}
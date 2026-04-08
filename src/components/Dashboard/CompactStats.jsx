export const CompactStats = ({ stats }) => {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-premium p-7">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">분석 리포트 요약</h3>
          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Account Summary</p>
        </div>
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-pulse delay-75"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-150"></div>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col space-y-1 group">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{stat.label}</span>
              <span className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight">{stat.value}</span>
            </div>
            <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
               <div className="h-full bg-slate-200 group-hover:bg-primary/30 transition-all duration-500 w-1/4 group-hover:w-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
        <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic opacity-80">
          "* 위 요약 정보는 최근 30일간의 매매 패턴을 기반으로 한 통계이며, 모든 데이터는 정산 시점을 기준으로 실시간 반영됩니다."
        </p>
      </div>
    </div>
  )
}
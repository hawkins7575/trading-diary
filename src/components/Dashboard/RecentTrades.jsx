import { formatCurrency } from '@/utils/calculations'
import { ArrowUpRight, ArrowDownRight, History } from 'lucide-react'

export const RecentTrades = ({ trades }) => {
  if (trades.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100 rotate-12 transition-transform duration-500">
          <History size={32} className="text-slate-300" />
        </div>
        <h3 className="text-lg font-black text-slate-900 tracking-tight">기록된 데이터가 없습니다</h3>
        <p className="text-sm text-slate-500 mt-2 font-medium max-w-[200px] mx-auto">새로운 거래 내역을 추가하여 분석을 시작하세요.</p>
      </div>
    )
  }

  const recentTrades = trades.slice(-10).reverse()

  return (
    <div className="space-y-4">
      {/* 데스크톱 테이블 뷰 */}
      <div className="hidden md:block data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>진행 일자</th>
              <th>입금액 (IN)</th>
              <th>출금액 (OUT)</th>
              <th>거래 손익 (P/L)</th>
              <th>수익률 (%)</th>
              <th>계정 잔고</th>
              <th className="text-right">데이터 비고</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.map(trade => {
              const entry = parseFloat(trade.entry || 0)
              const withdrawal = parseFloat(trade.withdrawal || 0)
              const profit = trade.profit || 0
              const isProfit = profit > 0
              const isLoss = profit < 0

              const prevBalance = parseFloat(trade.balance) - (trade.profit || 0) - (parseFloat(trade.entry) || 0) + (parseFloat(trade.withdrawal) || 0)
              const base = prevBalance || parseFloat(trade.seed || 0)
              const yieldRate = base !== 0 ? ((trade.profit || 0) / base) * 100 : 0
              
              return (
                <tr key={trade.id} className="group transition-colors">
                  <td className="font-bold text-slate-900 group-hover:text-primary transition-colors">{trade.date}</td>
                  <td className="text-slate-600 font-bold">{formatCurrency(entry)}</td>
                  <td className="text-slate-600 font-bold">{formatCurrency(withdrawal)}</td>
                  <td>
                    <div className={`inline-flex items-center space-x-1 font-black ${
                      isProfit ? 'text-emerald-500' : isLoss ? 'text-rose-500' : 'text-slate-400'
                    }`}>
                      {isProfit && <ArrowUpRight size={14} strokeWidth={3} />}
                      {isLoss && <ArrowDownRight size={14} strokeWidth={3} />}
                      <span>{formatCurrency(profit)}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`font-black text-xs ${
                      isProfit ? 'text-emerald-500' : isLoss ? 'text-rose-500' : 'text-slate-400'
                    }`}>
                      {isProfit && '+'}{yieldRate.toFixed(2)}%
                    </span>
                  </td>
                  <td className="font-black text-slate-900">{formatCurrency(parseFloat(trade.balance) || 0)}</td>
                  <td className="text-right">
                    <span className="text-[11px] text-slate-500 font-extrabold bg-slate-100/50 px-3 py-1.5 rounded-xl max-w-[150px] truncate inline-block group-hover:bg-slate-100 transition-colors">
                      {trade.memo || 'N/A'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 모바일 타임라인 카드 - 가독성 개선 가이드 반영 */}
      <div className="md:hidden space-y-3 px-1">
        {recentTrades.map((trade, i) => {
          const entry = parseFloat(trade.entry || 0)
          const withdrawal = parseFloat(trade.withdrawal || 0)
          const profit = trade.profit || 0
          const isProfit = profit > 0
          const isLoss = profit < 0

          const prevBalance = parseFloat(trade.balance) - (trade.profit || 0) - (parseFloat(trade.entry) || 0) + (parseFloat(trade.withdrawal) || 0)
          const base = prevBalance || parseFloat(trade.seed || 0)
          const yieldRate = base !== 0 ? ((trade.profit || 0) / base) * 100 : 0

          return (
            <div key={trade.id} className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-soft transition-all duration-300 active:scale-[0.98]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isProfit ? 'bg-emerald-50 text-emerald-600' : isLoss ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {isProfit ? <ArrowUpRight size={18} strokeWidth={3}/> : <ArrowDownRight size={18} strokeWidth={3}/>}
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">DATE</p>
                    <p className="text-[15px] font-black text-slate-900 leading-none">{trade.date}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-[15px] font-black leading-none mb-1 ${
                    isProfit ? 'text-emerald-600' : isLoss ? 'text-rose-600' : 'text-slate-900'
                  }`}>
                    {isProfit ? '+' : ''}{formatCurrency(profit)}
                  </div>
                  <div className={`inline-block px-1.5 py-0.5 rounded-lg text-[10px] font-black ${
                    isProfit ? 'bg-emerald-50 text-emerald-600' : isLoss ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isProfit && '+'}{yieldRate.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <div className="flex-1 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                  <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Entry</p>
                  <p className="text-[11px] font-bold text-slate-800">{formatCurrency(entry)}</p>
                </div>
                <div className="flex-1 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                  <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Exit</p>
                  <p className="text-[11px] font-bold text-slate-800">{formatCurrency(withdrawal)}</p>
                </div>
              </div>

              <div className="flex justify-between items-end pt-3 border-t border-dashed border-slate-200">
                <div className="flex flex-col">
                   <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5 tracking-tight">Financial Balance</p>
                   <p className="text-lg font-black text-primary tracking-tight leading-none">{formatCurrency(parseFloat(trade.balance) || 0)}</p>
                </div>
                <div className="flex -space-x-1">
                   {[1,2,3].map(dot => (
                     <div key={dot} className="w-1.5 h-1.5 rounded-full bg-slate-200 border border-white"></div>
                   ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
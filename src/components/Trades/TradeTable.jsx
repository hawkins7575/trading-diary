import { Edit3, Trash2, ArrowUpRight, ArrowDownRight, Tag } from 'lucide-react'
import { formatCurrency } from '@/utils/calculations'

export const TradeTable = ({ trades, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {/* 데스크톱 테이블 */}
      <div className="hidden lg:block data-table-container shadow-premium border-none" style={{ borderRadius: '24px' }}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="pl-8">체결 일자</th>
                <th>입금 상세 (Entry)</th>
                <th>출금 상세 (Exit)</th>
                <th>매매 손익 (P/L)</th>
                <th>수익률 (%)</th>
                <th>실시간 잔고</th>
                <th>패턴 & 감정</th>
                <th className="pr-8 text-right">매니지먼트</th>
              </tr>
            </thead>
            <tbody>
              {trades.map(trade => {
                const entry = parseFloat(trade.entry || 0)
                const withdrawal = parseFloat(trade.withdrawal || 0)
                const profit = trade.profit || 0
                const isProfit = profit > 0
                const isLoss = profit < 0
                
                // 수익률 계산 (이전 잔고 대비)
                const prevBalance = parseFloat(trade.balance) - (trade.profit || 0) - (parseFloat(trade.entry) || 0) + (parseFloat(trade.withdrawal) || 0)
                const base = prevBalance || parseFloat(trade.seed || 0)
                const yieldRate = base !== 0 ? ((trade.profit || 0) / base) * 100 : 0
                
                return (
                  <tr key={trade.id} className="group transition-colors">
                    <td className="pl-8 font-bold text-slate-900">{trade.date}</td>
                    <td className="text-slate-500 font-medium">{formatCurrency(entry)}</td>
                    <td className="text-slate-500 font-medium">{formatCurrency(withdrawal)}</td>
                    <td>
                      <div className={`inline-flex items-center space-x-1 font-black ${
                        isProfit ? 'text-emerald-500' : isLoss ? 'text-rose-500' : 'text-slate-400'
                      }`}>
                        {isProfit && <ArrowUpRight size={14} strokeWidth={3} />}
                        {isLoss && <ArrowDownRight size={14} strokeWidth={3} />}
                        <span>{profit !== 0 ? formatCurrency(profit) : '-'}</span>
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
                    <td>
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {trade.emotion && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                            {trade.emotion}
                          </span>
                        )}
                        {trade.tags?.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[10px] font-bold bg-primary/5 text-primary px-2 py-0.5 rounded-full border border-primary/10">
                            #{tag.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="pr-8 text-right">
                      <div className="flex justify-end items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(trade)}
                          className="p-2 text-slate-400 hover:text-primary transition-colors"
                          title="상세 수정"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(trade.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                          title="영구 삭제"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모바일/태블릿 카드 형태 - 가독성 개선 가이드 반영 */}
      <div className="lg:hidden space-y-3 px-1">
        {trades.map(trade => {
          const entry = parseFloat(trade.entry || 0)
          const withdrawal = parseFloat(trade.withdrawal || 0)
          const profit = trade.profit || 0
          const isProfit = profit > 0
          const isLoss = profit < 0
          
          const prevBalance = parseFloat(trade.balance) - (trade.profit || 0) - (parseFloat(trade.entry) || 0) + (parseFloat(trade.withdrawal) || 0)
          const base = prevBalance || parseFloat(trade.seed || 0)
          const yieldRate = base !== 0 ? ((trade.profit || 0) / base) * 100 : 0
          
          return (
            <div key={trade.id} className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-soft active:scale-[0.98] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isProfit ? 'bg-emerald-50 text-emerald-600' : isLoss ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {isProfit ? <ArrowUpRight size={18} strokeWidth={3}/> : <ArrowDownRight size={18} strokeWidth={3}/>}
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] leading-none mb-1">DATE</div>
                    <div className="text-[15px] font-black text-slate-900 leading-none">{trade.date}</div>
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

              <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase mb-0.5 tracking-tight">Final Balance</span>
                  <span className="text-lg font-black text-primary tracking-tight leading-none">{formatCurrency(parseFloat(trade.balance) || 0)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => onEdit(trade)} 
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary active:bg-primary/5 rounded-xl transition-colors"
                  >
                    <Edit3 size={16}/>
                  </button>
                  <button 
                    onClick={() => onDelete(trade.id)} 
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-500 active:bg-rose-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
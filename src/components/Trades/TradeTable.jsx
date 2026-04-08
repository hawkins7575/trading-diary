import { Edit3, Trash2, ArrowUpRight, ArrowDownRight, Tag } from 'lucide-react'
import { formatCurrency } from '@/utils/calculations'

export const TradeTable = ({ trades, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {/* 데스크톱 테이블 */}
      <div className="hidden lg:block data-table-container shadow-premium border-none">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="pl-8">체결 일자</th>
                <th>입금 상세 (Entry)</th>
                <th>출금 상세 (Exit)</th>
                <th>매매 손익 (P/L)</th>
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
                
                return (
                  <tr key={trade.id} className="group transition-colors">
                    <td className="pl-8 font-bold text-slate-900">{trade.date}</td>
                    <td className="text-slate-500 font-medium">{formatCurrency(entry)}</td>
                    <td className="text-slate-500 font-medium">{formatCurrency(withdrawal)}</td>
                    <td>
                      <div className={`inline-flex items-center space-x-1 font-black ${
                        isProfit ? 'text-success' : isLoss ? 'text-danger' : 'text-slate-400'
                      }`}>
                        {isProfit && <ArrowUpRight size={14} />}
                        {isLoss && <ArrowDownRight size={14} />}
                        <span>{profit !== 0 ? formatCurrency(profit) : '-'}</span>
                      </div>
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
                          className="p-2 text-slate-400 hover:text-danger transition-colors"
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

      {/* 모바일/태블릿 카드 형태 */}
      <div className="lg:hidden space-y-4">
        {trades.map(trade => {
          const entry = parseFloat(trade.entry || 0)
          const withdrawal = parseFloat(trade.withdrawal || 0)
          const profit = trade.profit || 0
          return (
            <div key={trade.id} className="premium-card p-5 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">EXECUTION DATE</div>
                  <div className="text-sm font-black text-slate-900">{trade.date}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded text-[10px] font-black ${
                    profit > 0 ? 'bg-success/10 text-success' : profit < 0 ? 'bg-danger/10 text-danger' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {profit > 0 ? '+' : ''}{formatCurrency(profit)}
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => onEdit(trade)} className="p-1.5 text-slate-400 hover:text-primary"><Edit3 size={14}/></button>
                    <button onClick={() => onDelete(trade.id)} className="p-1.5 text-slate-400 hover:text-danger"><Trash2 size={14}/></button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">ENTRY</div>
                  <div className="text-xs font-bold text-slate-700">{formatCurrency(entry)}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">EXIT</div>
                  <div className="text-xs font-bold text-slate-700">{formatCurrency(withdrawal)}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 mb-1">CURRENT BALANCE</div>
                  <div className="text-base font-black text-primary">{formatCurrency(parseFloat(trade.balance) || 0)}</div>
                </div>
                {trade.emotion && (
                  <div className="flex flex-col items-end">
                    <div className="text-[10px] font-bold text-slate-400 mb-1">EMOTION</div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{trade.emotion}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
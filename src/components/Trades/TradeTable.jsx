import { Edit3, Trash2, ArrowUpRight, ArrowDownRight, Tag, TrendingUp, Wallet } from 'lucide-react'
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
                          <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg border border-slate-200/50 uppercase tracking-tight">
                            {trade.emotion}
                          </span>
                        )}
                        {trade.tags?.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[10px] font-black bg-primary/5 text-primary px-2.5 py-1 rounded-lg border border-primary/10 uppercase tracking-tight">
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

      {/* 모바일/태블릿 카드 - 계층 구조 및 가독성 전면 개선 */}
      <div className="lg:hidden space-y-4 px-2">
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
            <div key={trade.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-premium overflow-hidden transition-all duration-300">
              {/* 카드 헤더: 날짜 및 액션 */}
              <div className="px-6 pt-5 pb-3 flex justify-between items-center border-b border-slate-50">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{trade.date}</span>
                </div>
                <div className="flex items-center space-x-0.5">
                  <button onClick={() => onEdit(trade)} className="p-2 text-slate-300 hover:text-primary active:bg-slate-50 rounded-xl transition-all"><Edit3 size={16}/></button>
                  <button onClick={() => onDelete(trade.id)} className="p-2 text-slate-300 hover:text-rose-500 active:bg-rose-50 rounded-xl transition-all"><Trash2 size={16}/></button>
                </div>
              </div>

              {/* 핵심 데이터 영역: 수익금 및 수익률 (하이라이트) */}
              <div className="px-8 py-6 bg-slate-50/30">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center">
                        <TrendingUp size={12} className="mr-1.5 text-slate-300" />
                        Trading P/L
                      </p>
                      <h3 className={`text-2xl font-black tracking-tighter leading-none ${
                        isProfit ? 'text-emerald-500' : isLoss ? 'text-rose-500' : 'text-slate-900'
                      }`}>
                        {isProfit ? '+' : ''}{formatCurrency(profit)}
                      </h3>
                   </div>
                   <div className={`px-3 py-1.5 rounded-2xl text-[13px] font-black shadow-sm flex items-center space-x-1 ${
                      isProfit ? 'bg-emerald-500 text-white shadow-emerald-200' : isLoss ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {isProfit ? <ArrowUpRight size={14} strokeWidth={3}/> : <ArrowDownRight size={14} strokeWidth={3}/>}
                      <span>{isProfit && '+'}{yieldRate.toFixed(2)}%</span>
                   </div>
                </div>
              </div>

              {/* 메인 잔액: 가장 강조되어야 하는 부분 */}
              <div className="px-8 py-6">
                 <div className="flex flex-col">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                      <Wallet size={12} className="mr-1.5 text-slate-300" />
                      Final Portfolio Balance
                    </p>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{formatCurrency(parseFloat(trade.balance) || 0)}</span>
                 </div>
              </div>

              {/* 보조 데이터 영역: 입금/출금 (가장 작고 소극적으로) */}
              <div className="px-8 pb-7 flex items-center space-x-8">
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60">Entry (In)</span>
                    <span className="text-[13px] font-bold text-slate-600 tabular-nums">{formatCurrency(entry)}</span>
                 </div>
                 <div className="w-px h-6 bg-slate-100"></div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60">Exit (Out)</span>
                    <span className="text-[13px] font-bold text-slate-600 tabular-nums">{formatCurrency(withdrawal)}</span>
                 </div>
              </div>

              {/* 패턴 및 감정 표시 (있는 경우에만) */}
              {trade.emotion && (
                <div className="px-8 pb-7">
                   <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                         Psychology: {trade.emotion}
                      </span>
                   </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
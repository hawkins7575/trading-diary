import { formatCurrency } from '@/utils/calculations'
import { ArrowUpRight, ArrowDownRight, History, TrendingUp, Wallet } from 'lucide-react'

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

      {/* 모바일 타임라인 카드 - 계층 구조 및 가독성 전면 개선 */}
      <div className="md:hidden space-y-4 px-1">
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
            <div key={trade.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-premium overflow-hidden transition-all duration-300">
               {/* 카드 헤더: 날짜 */}
               <div className="px-6 pt-5 pb-3 flex items-center space-x-2 border-b border-slate-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{trade.date}</span>
               </div>

               {/* 수익 데이터 영역 (강조) */}
               <div className="px-8 py-5 bg-slate-50/30">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center">
                          <TrendingUp size={12} className="mr-1.5 text-slate-300" />
                          Record P/L
                        </p>
                        <h3 className={`text-xl font-black tracking-tight leading-none ${
                          isProfit ? 'text-emerald-500' : isLoss ? 'text-rose-500' : 'text-slate-900'
                        }`}>
                          {isProfit ? '+' : ''}{formatCurrency(profit)}
                        </h3>
                     </div>
                     <div className={`px-2.5 py-1 rounded-xl text-[11px] font-black flex items-center space-x-1 ${
                        isProfit ? 'bg-emerald-500 text-white' : isLoss ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {isProfit && <ArrowUpRight size={12} strokeWidth={3}/>}
                        {isLoss && <ArrowDownRight size={12} strokeWidth={3}/>}
                        <span>{isProfit && '+'}{yieldRate.toFixed(2)}%</span>
                     </div>
                  </div>
               </div>

               {/* 잔액 영역 (최고 강조) */}
               <div className="px-8 py-6">
                  <div className="flex flex-col">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center">
                       <Wallet size={12} className="mr-1.5 text-slate-300" />
                       Total Balance
                     </p>
                     <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{formatCurrency(parseFloat(trade.balance) || 0)}</span>
                  </div>
               </div>

               {/* 입출금 영역 (소극적 보조 데이터) */}
               <div className="px-8 pb-7 flex items-center space-x-6">
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 opacity-60">In</span>
                    <span className="text-[12px] font-bold text-slate-600 tabular-nums">{formatCurrency(entry)}</span>
                 </div>
                 <div className="w-px h-4 bg-slate-100"></div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 opacity-60">Out</span>
                    <span className="text-[12px] font-bold text-slate-600 tabular-nums">{formatCurrency(withdrawal)}</span>
                 </div>
               </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
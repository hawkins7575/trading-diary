import { formatCurrency } from '@/utils/calculations'
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react'

export const RecentTrades = ({ trades }) => {
  if (trades.length === 0) {
    return (
      <div className="premium-card">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
            <MoreHorizontal className="text-slate-300" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">기록된 데이터가 없습니다</h3>
          <p className="text-xs text-slate-600 mt-1 font-bold">새로운 거래 내역을 추가하여 분석을 시작하세요.</p>
        </div>
      </div>
    )
  }

  const recentTrades = trades.slice(-10).reverse()

  return (
    <div className="data-table-container">
      {/* 데스크톱 테이블 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>진행 일자</th>
              <th>입금액 (IN)</th>
              <th>출금액 (OUT)</th>
              <th>거래 손익 (P/L)</th>
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
              
              return (
                <tr key={trade.id}>
                  <td className="font-bold text-slate-900">{trade.date}</td>
                  <td className="text-slate-800 font-bold">{formatCurrency(entry)}</td>
                  <td className="text-slate-800 font-bold">{formatCurrency(withdrawal)}</td>
                  <td>
                    <div className={`inline-flex items-center space-x-1 font-black ${
                      isProfit ? 'text-success' : isLoss ? 'text-danger' : 'text-slate-600'
                    }`}>
                      {isProfit && <ArrowUpRight size={14} />}
                      {isLoss && <ArrowDownRight size={14} />}
                      <span>{formatCurrency(profit)}</span>
                    </div>
                  </td>
                  <td className="font-black text-slate-900">{formatCurrency(parseFloat(trade.balance) || 0)}</td>
                  <td className="text-right">
                    <span className="text-xs text-slate-700 font-bold italic bg-slate-50 px-2 py-1 rounded max-w-[150px] truncate inline-block">
                      {trade.memo || 'N/A'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 모바일 카드 형태 */}
      <div className="md:hidden divide-y divide-slate-100">
        {recentTrades.map(trade => {
          const entry = parseFloat(trade.entry || 0)
          const withdrawal = parseFloat(trade.withdrawal || 0)
          const profit = trade.profit || 0
          return (
            <div key={trade.id} className="p-5 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">DATA POINT</div>
                  <div className="text-sm font-black text-slate-900">{trade.date}</div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-black ${
                  profit > 0 ? 'bg-success/10 text-success' : profit < 0 ? 'bg-danger/10 text-danger' : 'bg-slate-200 text-slate-700'
                }`}>
                  {profit > 0 ? '+' : ''}{formatCurrency(profit)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">ENTRY</div>
                  <div className="text-xs font-bold text-slate-700">{formatCurrency(entry)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">EXIT</div>
                  <div className="text-xs font-bold text-slate-700">{formatCurrency(withdrawal)}</div>
                </div>
              </div>
              
              <div className="bg-slate-50/80 rounded-xl p-3 flex justify-between items-center border border-slate-100">
                <span className="text-[10px] font-black text-slate-700">FINAL BALANCE</span>
                <span className="text-sm font-black text-primary">{formatCurrency(parseFloat(trade.balance) || 0)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
import { formatCurrency } from '@/utils/calculations'

export const RecentTrades = ({ trades }) => {
  if (trades.length === 0) {
    return (
      <div className="metric-card p-6">
        <h3 className="text-lg font-semibold mb-4">최근 거래</h3>
        <div className="text-center py-8 text-gray-500">
          아직 거래 내역이 없습니다
        </div>
      </div>
    )
  }

  const recentTrades = trades.slice(-5).reverse()

  return (
    <div className="metric-card p-6">
      <h3 className="text-lg font-semibold mb-4">최근 거래</h3>
      
      {/* 데스크톱 테이블 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">날짜</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">입금</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">출금</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">손익</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">잔고</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">메모</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.map(trade => {
              const profit = parseFloat(trade.withdrawal || 0) - parseFloat(trade.entry || 0)
              return (
                <tr key={trade.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{trade.date}</td>
                  <td className="py-3 px-4">{formatCurrency(parseFloat(trade.entry) || 0)}</td>
                  <td className="py-3 px-4">{formatCurrency(parseFloat(trade.withdrawal) || 0)}</td>
                  <td className={`py-3 px-4 font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(profit)}
                  </td>
                  <td className="py-3 px-4 font-medium">{formatCurrency(parseFloat(trade.balance) || 0)}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{trade.memo}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 모바일 카드 형태 */}
      <div className="md:hidden space-y-3">
        {recentTrades.map(trade => {
          const profit = parseFloat(trade.withdrawal || 0) - parseFloat(trade.entry || 0)
          return (
            <div key={trade.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              {/* 상단: 날짜와 손익 */}
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm font-medium text-gray-900">{trade.date}</div>
                <div className={`text-sm font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profit !== 0 ? formatCurrency(profit) : '0원'}
                </div>
              </div>
              
              {/* 중간: 입금/출금 */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">입금</div>
                  <div className="text-sm font-medium">
                    {trade.entry ? formatCurrency(parseFloat(trade.entry)) : '-'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">출금</div>
                  <div className="text-sm font-medium">
                    {trade.withdrawal ? formatCurrency(parseFloat(trade.withdrawal)) : '-'}
                  </div>
                </div>
              </div>
              
              {/* 하단: 잔고와 메모 */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">현재 잔고</div>
                    <div className="text-sm font-bold text-primary">
                      {formatCurrency(parseFloat(trade.balance) || 0)}
                    </div>
                  </div>
                  {trade.memo && (
                    <div className="ml-4 text-right flex-1">
                      <div className="text-xs text-gray-500 mb-1">메모</div>
                      <div className="text-sm text-gray-700 break-words">
                        {trade.memo.length > 20 ? `${trade.memo.slice(0, 20)}...` : trade.memo}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
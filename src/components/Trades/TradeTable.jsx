import { Edit, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/utils/calculations'

export const TradeTable = ({ trades, onEdit, onDelete }) => {
  return (
    <>
      {/* 데스크톱 테이블 */}
      <div className="hidden lg:block metric-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-600">날짜</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">입금</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">출금</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">손익</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">잔고</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">메모</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">감정</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">액션</th>
              </tr>
            </thead>
            <tbody>
              {trades.map(trade => {
                const profit = (parseFloat(trade.withdrawal) || 0) - (parseFloat(trade.entry) || 0)
                return (
                  <tr key={trade.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">{trade.date}</td>
                    <td className="py-4 px-6">
                      {trade.entry ? formatCurrency(parseFloat(trade.entry)) : '-'}
                    </td>
                    <td className="py-4 px-6">
                      {trade.withdrawal ? formatCurrency(parseFloat(trade.withdrawal)) : '-'}
                    </td>
                    <td className={`py-4 px-6 font-medium ${
                      profit > 0 ? 'text-green-600' : profit < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {profit !== 0 ? formatCurrency(profit) : '-'}
                    </td>
                    <td className="py-4 px-6 font-medium">
                      {formatCurrency(parseFloat(trade.balance) || 0)}
                    </td>
                    <td className="py-4 px-6 max-w-xs">
                      <div className="truncate" title={trade.memo}>
                        {trade.memo || '-'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {trade.emotion ? (
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {trade.emotion}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(trade)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="수정"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(trade.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="삭제"
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
          const profit = (parseFloat(trade.withdrawal) || 0) - (parseFloat(trade.entry) || 0)
          return (
            <div key={trade.id} className="metric-card p-4">
              {/* 상단: 날짜, 액션 버튼, 손익 */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{trade.date}</div>
                  {trade.emotion && (
                    <div className="mt-1">
                      <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded">
                        {trade.emotion}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`text-right ${
                    profit > 0 ? 'text-green-600' : profit < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <div className="text-xs text-gray-500">손익</div>
                    <div className="font-bold">
                      {profit !== 0 ? formatCurrency(profit) : '0원'}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 ml-3">
                    <button
                      onClick={() => onEdit(trade)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="수정"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(trade.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 중간: 입금/출금 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-xs text-blue-600 font-medium mb-1">입금</div>
                  <div className="text-sm font-semibold text-blue-800">
                    {trade.entry ? formatCurrency(parseFloat(trade.entry)) : '0원'}
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-xs text-orange-600 font-medium mb-1">출금</div>
                  <div className="text-sm font-semibold text-orange-800">
                    {trade.withdrawal ? formatCurrency(parseFloat(trade.withdrawal)) : '0원'}
                  </div>
                </div>
              </div>

              {/* 하단: 잔고와 메모 */}
              <div className="border-t border-gray-200 pt-4">
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">현재 잔고</div>
                  <div className="text-lg font-bold text-primary">
                    {formatCurrency(parseFloat(trade.balance) || 0)}
                  </div>
                </div>
                
                {trade.memo && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">메모</div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {trade.memo}
                    </div>
                  </div>
                )}

                {/* 태그 표시 */}
                {trade.tags && trade.tags.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 mb-2">패턴 태그</div>
                    <div className="flex flex-wrap gap-1">
                      {trade.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {tag.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {trade.tags.length > 3 && (
                        <span className="inline-block text-xs text-gray-500 px-2 py-1">
                          +{trade.tags.length - 3}개 더
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
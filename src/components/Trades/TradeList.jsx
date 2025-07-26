import { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import { TradeForm } from './TradeForm'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'
import { formatCurrency } from '@/utils/calculations'

export const TradeList = ({ trades, onAddTrade, onUpdateTrade, onDeleteTrade, onClearAll }) => {
  const [showTradeForm, setShowTradeForm] = useState(false)
  const [editingTrade, setEditingTrade] = useState(null)
  
  const confirmModal = useConfirmModal()
  const alertModal = useAlertModal()

  const handleEdit = (trade) => {
    setEditingTrade(trade)
    setShowTradeForm(true)
  }

  const handleDelete = async (id) => {
    const confirmed = await confirmModal.confirm({
      title: '거래 삭제',
      message: '이 거래를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소'
    })

    if (confirmed) {
      onDeleteTrade(id)
      alertModal.alert({
        title: '삭제 완료',
        message: '거래가 삭제되었습니다.',
        type: 'success'
      })
    }
  }

  const handleClearAll = async () => {
    const confirmed = await confirmModal.confirm({
      title: '모든 데이터 삭제',
      message: `정말로 모든 데이터를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다:\n• 모든 거래내역\n• 매매일지\n• 매매전략\n• 목표설정\n\n삭제 후 샘플 데이터로 초기화됩니다.`,
      confirmText: '모든 데이터 삭제',
      cancelText: '취소'
    })

    if (confirmed) {
      onClearAll()
      alertModal.alert({
        title: '초기화 완료',
        message: '모든 데이터가 초기화되었습니다.',
        type: 'success'
      })
    }
  }

  const handleFormSubmit = (formData) => {
    if (editingTrade) {
      onUpdateTrade(editingTrade.id, formData)
      alertModal.alert({
        title: '수정 완료',
        message: '거래가 수정되었습니다.',
        type: 'success'
      })
    } else {
      onAddTrade(formData)
      alertModal.alert({
        title: '추가 완료',
        message: '새 거래가 추가되었습니다.',
        type: 'success'
      })
    }
    setEditingTrade(null)
  }

  const handleFormClose = () => {
    setShowTradeForm(false)
    setEditingTrade(null)
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">거래 내역</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTradeForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>새 거래</span>
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            전체 삭제
          </button>
        </div>
      </div>

      {/* 거래 목록 */}
      <div className="metric-card">
        {trades.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">아직 거래 내역이 없습니다</p>
            <button
              onClick={() => setShowTradeForm(true)}
              className="btn-primary"
            >
              첫 거래 추가하기
            </button>
          </div>
        ) : (
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
                            onClick={() => handleEdit(trade)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="수정"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(trade.id)}
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
        )}
      </div>

      {/* 거래 폼 모달 */}
      <TradeForm
        isOpen={showTradeForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingTrade}
        isEditing={!!editingTrade}
      />

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.closeModal}
        title={confirmModal.confirmData.title}
        message={confirmModal.confirmData.message}
        onConfirm={confirmModal.confirmData.onConfirm}
        confirmText={confirmModal.confirmData.confirmText}
        cancelText={confirmModal.confirmData.cancelText}
      />

      {/* 알림 모달 */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={alertModal.closeModal}
        title={alertModal.alertData.title}
        message={alertModal.alertData.message}
        type={alertModal.alertData.type}
      />
    </div>
  )
}
import { useState } from 'react'
import { Edit, Trash2, Plus, TrendingUp } from 'lucide-react'
import { StrategyForm } from './StrategyForm'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'

const RISK_COLORS = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
}

const RISK_LABELS = {
  low: '낮음',
  medium: '보통',
  high: '높음'
}

export const StrategyList = ({ 
  strategies, 
  onAddStrategy, 
  onUpdateStrategy, 
  onDeleteStrategy 
}) => {
  const [showStrategyForm, setShowStrategyForm] = useState(false)
  const [editingStrategy, setEditingStrategy] = useState(null)
  
  const confirmModal = useConfirmModal()
  const alertModal = useAlertModal()

  const handleEdit = (strategy) => {
    setEditingStrategy(strategy)
    setShowStrategyForm(true)
  }

  const handleDelete = async (id) => {
    const confirmed = await confirmModal.confirm({
      title: '전략 삭제',
      message: '이 전략을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소'
    })

    if (confirmed) {
      onDeleteStrategy(id)
      alertModal.alert({
        title: '삭제 완료',
        message: '전략이 삭제되었습니다.',
        type: 'success'
      })
    }
  }

  const handleFormSubmit = (formData) => {
    if (editingStrategy) {
      onUpdateStrategy(editingStrategy.id, formData)
      alertModal.alert({
        title: '수정 완료',
        message: '전략이 수정되었습니다.',
        type: 'success'
      })
    } else {
      onAddStrategy(formData)
      alertModal.alert({
        title: '저장 완료',
        message: '새 전략이 저장되었습니다.',
        type: 'success'
      })
    }
    setEditingStrategy(null)
  }

  const handleFormClose = () => {
    setShowStrategyForm(false)
    setEditingStrategy(null)
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">매매전략</h2>
        <button
          onClick={() => setShowStrategyForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>새 전략</span>
        </button>
      </div>

      {/* 전략 목록 */}
      {strategies.length === 0 ? (
        <div className="metric-card p-8 text-center">
          <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">아직 생성된 전략이 없습니다</p>
          <button
            onClick={() => setShowStrategyForm(true)}
            className="btn-primary"
          >
            첫 전략 만들기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {strategies.map(strategy => (
            <div key={strategy.id} className="metric-card p-6">
              {/* 전략 헤더 */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{strategy.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${RISK_COLORS[strategy.riskLevel]}`}>
                      리스크: {RISK_LABELS[strategy.riskLevel]}
                    </span>
                    {strategy.timeframe && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {strategy.timeframe}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(strategy)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="수정"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(strategy.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="삭제"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* 전략 설명 */}
              {strategy.description && (
                <p className="text-gray-600 mb-4">{strategy.description}</p>
              )}

              {/* 전략 상세 정보 */}
              <div className="space-y-4">
                {strategy.buyConditions && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">매수 조건</h4>
                    <div className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded">
                      {strategy.buyConditions}
                    </div>
                  </div>
                )}
                
                {strategy.sellConditions && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">매도 조건</h4>
                    <div className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded">
                      {strategy.sellConditions}
                    </div>
                  </div>
                )}

                {strategy.riskManagement && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">리스크 관리</h4>
                    <div className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded">
                      {strategy.riskManagement}
                    </div>
                  </div>
                )}

                {/* 추가 정보 */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  {strategy.targetReturn && (
                    <div>
                      <span className="text-xs text-gray-500">목표 수익률</span>
                      <div className="text-sm font-medium">{strategy.targetReturn}</div>
                    </div>
                  )}
                  {strategy.maxDrawdown && (
                    <div>
                      <span className="text-xs text-gray-500">최대 손실폭</span>
                      <div className="text-sm font-medium">{strategy.maxDrawdown}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 전략 폼 모달 */}
      <StrategyForm
        isOpen={showStrategyForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingStrategy}
        isEditing={!!editingStrategy}
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
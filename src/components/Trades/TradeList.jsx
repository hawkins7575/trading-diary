import { useState } from 'react'
import { Plus, Trash2, History } from 'lucide-react'
import { TradeForm } from './TradeForm'
import { TradeTable } from './TradeTable'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* 헤더 섹션: 세련되고 컴팩트하게 개선 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <div className="hidden sm:block">
           {/* 공간 확보용 - 제목은 최상단 헤더에만 표시됨 */}
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setShowTradeForm(true)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-2xl font-black text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all"
          >
            <Plus size={18} strokeWidth={3} />
            <span>새 거래 추가</span>
          </button>
          
          <button
            onClick={handleClearAll}
            className="p-2.5 bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl border border-slate-100 transition-all active:scale-95 group"
            title="모든 데이터 초기화"
          >
            <Trash2 size={18} strokeWidth={2.5} className="group-hover:animate-shake" />
          </button>
        </div>
      </div>

      {/* 거래 목록 섹션 */}
      {trades.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-premium">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white">
            <Plus size={40} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">기록된 거래가 없습니다</h3>
          <p className="text-sm text-slate-500 mt-2 font-medium mb-8 max-w-[240px] mx-auto leading-relaxed">
            새로운 매매 기록을 추가하여 세밀한 수익 분석을 시작해 보세요.
          </p>
          <button
            onClick={() => setShowTradeForm(true)}
            className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-[15px] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            첫 번째 거래 추가하기
          </button>
        </div>
      ) : (
        <TradeTable 
          trades={trades} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {/* 거래 폼 모달 */}
      <TradeForm
        isOpen={showTradeForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingTrade}
        isEditing={!!editingTrade}
        latestSeed={trades.length > 0 ? [...trades].sort((a, b) => new Date(b.date) - new Date(a.date))[0].seed : ''}
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
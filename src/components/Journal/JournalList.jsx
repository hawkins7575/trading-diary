import { useState } from 'react'
import { Edit, Trash2, Plus, BookOpen } from 'lucide-react'
import { JournalForm } from './JournalForm'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'

const MOOD_COLORS = {
  excellent: 'bg-green-100 text-green-800',
  good: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-800',
  bad: 'bg-orange-100 text-orange-800',
  terrible: 'bg-red-100 text-red-800'
}

const MOOD_LABELS = {
  excellent: '매우 좋음',
  good: '좋음',
  neutral: '보통',
  bad: '나쁨',
  terrible: '매우 나쁨'
}

export const JournalList = ({ 
  journals, 
  onAddJournal, 
  onUpdateJournal, 
  onDeleteJournal 
}) => {
  const [showJournalForm, setShowJournalForm] = useState(false)
  const [editingJournal, setEditingJournal] = useState(null)
  
  const confirmModal = useConfirmModal()
  const alertModal = useAlertModal()

  const handleEdit = (journal) => {
    setEditingJournal(journal)
    setShowJournalForm(true)
  }

  const handleDelete = async (id) => {
    const confirmed = await confirmModal.confirm({
      title: '일지 삭제',
      message: '이 일지를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소'
    })

    if (confirmed) {
      onDeleteJournal(id)
      alertModal.alert({
        title: '삭제 완료',
        message: '일지가 삭제되었습니다.',
        type: 'success'
      })
    }
  }

  const handleFormSubmit = (formData) => {
    if (editingJournal) {
      onUpdateJournal(editingJournal.id, formData)
      alertModal.alert({
        title: '수정 완료',
        message: '일지가 수정되었습니다.',
        type: 'success'
      })
    } else {
      onAddJournal(formData)
      alertModal.alert({
        title: '저장 완료',
        message: '새 일지가 저장되었습니다.',
        type: 'success'
      })
    }
    setEditingJournal(null)
  }

  const handleFormClose = () => {
    setShowJournalForm(false)
    setEditingJournal(null)
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">매매일지</h2>
        <button
          onClick={() => setShowJournalForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>새 일지</span>
        </button>
      </div>

      {/* 일지 목록 */}
      {journals.length === 0 ? (
        <div className="metric-card p-8 text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">아직 작성된 일지가 없습니다</p>
          <button
            onClick={() => setShowJournalForm(true)}
            className="btn-primary"
          >
            첫 일지 작성하기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {journals
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(journal => (
              <div key={journal.id} className="metric-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold">{journal.date}</h3>
                    {journal.mood && (
                      <span className={`px-2 py-1 text-xs rounded-full ${MOOD_COLORS[journal.mood]}`}>
                        {MOOD_LABELS[journal.mood]}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(journal)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="수정"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(journal.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {journal.content}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 일지 폼 모달 */}
      <JournalForm
        isOpen={showJournalForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingJournal}
        isEditing={!!editingJournal}
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
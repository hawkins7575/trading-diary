import { useState } from 'react'
import { Edit3, Trash2, Plus, BookOpen, Calendar, Quote, MessageCircle, ArrowRight } from 'lucide-react'
import { JournalForm } from './JournalForm'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'

const MOOD_COLORS = {
  excellent: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  good: 'bg-blue-50 text-blue-600 border-blue-100',
  neutral: 'bg-slate-50 text-slate-500 border-slate-100',
  bad: 'bg-orange-50 text-orange-600 border-orange-100',
  terrible: 'bg-rose-50 text-rose-600 border-rose-100'
}

const MOOD_LABELS = {
  excellent: '컨디션 최상',
  good: '좋음',
  neutral: '보통',
  bad: '나쁨',
  terrible: '뇌동매매 주의'
}

const MOOD_EMOJIS = {
  excellent: '🔥',
  good: '✨',
  neutral: '☁️',
  bad: '⚠️',
  terrible: '🚫'
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-10">
      {/* 헤더 섹션: 통일성 있는 디자인 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <div className="hidden sm:block"></div>
        
        <button
          onClick={() => setShowJournalForm(true)}
          className="flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-[1.25rem] font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all w-full sm:w-auto"
        >
          <Plus size={18} strokeWidth={3} />
          <span>새 일지 작성</span>
        </button>
      </div>

      {/* 일지 목록 */}
      {journals.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-premium">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white">
            <BookOpen size={40} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">작성된 일지가 없습니다</h3>
          <p className="text-sm text-slate-500 mt-2 font-medium mb-8 max-w-[240px] mx-auto leading-relaxed">
            오늘의 매매 복기와 심리 상태를 기록하여 더 나은 수익을 준비하세요.
          </p>
          <button
            onClick={() => setShowJournalForm(true)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-[15px] shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
          >
            첫 일지 작성하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {journals
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(journal => (
              <div key={journal.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-premium hover:border-indigo-100/50 transition-all group relative overflow-hidden flex flex-col h-full">
                {/* 상단: 날짜 및 액션 */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-slate-200">
                        <span className="text-[10px] font-black leading-none opacity-60 mb-0.5">{new Date(journal.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
                        <span className="text-base font-black leading-none">{new Date(journal.date).getDate()}</span>
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Perspective Date</div>
                        <h3 className="text-base font-black text-slate-900 leading-none">{journal.date}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(journal)}
                      className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(journal.id)}
                      className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                {/* 무드 배지 */}
                <div className="mb-6">
                    {journal.mood && (
                      <span className={`inline-flex items-center px-4 py-2 text-[11px] font-black rounded-2xl border shadow-sm ${MOOD_COLORS[journal.mood]}`}>
                        <span className="mr-2 text-sm">{MOOD_EMOJIS[journal.mood]}</span>
                        {MOOD_LABELS[journal.mood]}
                      </span>
                    )}
                </div>

                {/* 매매 내용 (가독성 개선) */}
                <div className="relative flex-1">
                   <div className="absolute top-0 left-0 text-slate-100 -mt-2 -ml-2 pointer-events-none">
                      <Quote size={40} fill="currentColor" />
                   </div>
                   <div className="relative z-10 text-slate-800 whitespace-pre-wrap leading-[1.7] text-base font-bold bg-slate-50/70 p-7 rounded-[2rem] border-l-4 border-slate-200 hover:border-indigo-400 transition-colors italic">
                     {journal.content}
                   </div>
                </div>
                
                {/* 하단 푸터 (장식) */}
                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                   <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <MessageCircle size={14} />
                      <span>Trading Thought Report</span>
                   </div>
                   <div className="flex items-center space-x-1 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                      <span>Full Log</span>
                      <ArrowRight size={12} strokeWidth={3} />
                   </div>
                </div>

                {/* Decoration Gradient */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-50/20 rounded-full blur-3xl -mr-16 -mb-16 pointer-events-none group-hover:bg-indigo-100/30 transition-all duration-700"></div>
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
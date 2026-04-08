import { useState } from 'react'
import { Edit3, Trash2, Plus, Target, CheckCircle, Circle, Calendar, Trophy, TrendingUp, Percent } from 'lucide-react'
import { GoalForm } from './GoalForm'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'
import { formatCurrency } from '@/utils/calculations'

export const GoalList = ({ 
  goals, 
  onAddGoal, 
  onUpdateGoal, 
  onDeleteGoal,
  onToggleComplete,
  trades = []
}) => {
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  
  const confirmModal = useConfirmModal()
  const alertModal = useAlertModal()

  const handleEdit = (goal) => {
    setEditingGoal(goal)
    setShowGoalForm(true)
  }

  const handleDelete = async (id) => {
    const confirmed = await confirmModal.confirm({
      title: '목표 삭제',
      message: '이 목표를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소'
    })

    if (confirmed) {
      onDeleteGoal(id)
      alertModal.alert({
        title: '삭제 완료',
        message: '목표가 삭제되었습니다.',
        type: 'success'
      })
    }
  }

  const handleToggleComplete = (id) => {
    onToggleComplete(id)
  }

  const handleFormSubmit = (formData) => {
    if (editingGoal) {
      onUpdateGoal(editingGoal.id, formData)
      alertModal.alert({
        title: '수정 완료',
        message: '목표가 수정되었습니다.',
        type: 'success'
      })
    } else {
      onAddGoal(formData)
      alertModal.alert({
        title: '저장 완료',
        message: '새 목표가 저장되었습니다.',
        type: 'success'
      })
    }
    setEditingGoal(null)
  }

  const handleFormClose = () => {
    setShowJournalForm(false)
    setEditingGoal(null)
  }

  // 목표 진행률 계산
  const calculateProgress = (goal) => {
    if (goal.isCompleted) return 100

    let progress = 0
    const now = new Date()
    const deadline = new Date(goal.deadline)
    const created = new Date(goal.createdAt || Date.now())

    if (deadline > created) {
      const totalDays = Math.ceil((deadline - created) / (1000 * 60 * 60 * 24))
      const passedDays = Math.ceil((now - created) / (1000 * 60 * 60 * 24))
      const timeProgress = Math.min((passedDays / totalDays) * 100, 100)

      let performanceProgress = 0
      
      if (goal.targetAmount && trades.length > 0) {
        const totalProfit = trades.reduce((sum, trade) => sum + (trade.profit || 0), 0)
        performanceProgress = Math.min((totalProfit / parseFloat(goal.targetAmount)) * 100, 100)
      }

      if (goal.targetWinRate && trades.length > 0) {
        const profitTrades = trades.filter(t => (t.profit || 0) > 0).length
        const winRate = (profitTrades / trades.length) * 100
        const winRateProgress = Math.min((winRate / parseFloat(goal.targetWinRate)) * 100, 100)
        performanceProgress = Math.max(performanceProgress, winRateProgress)
      }

      progress = Math.max(timeProgress * 0.3 + performanceProgress * 0.7, 0)
    }

    return Math.round(progress)
  }

  const formatDeadline = (deadline) => {
    if (!deadline) return ''
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return `${Math.abs(diffDays)}일 지남`
    } else if (diffDays === 0) {
      return 'D-DAY'
    } else if (diffDays <= 30) {
      return `D-${diffDays}`
    } else {
      return date.toLocaleDateString('ko-KR')
    }
  }

  const isOverdue = (deadline) => {
    if (!deadline) return false
    return new Date(deadline) < new Date()
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* 헤더 섹션: 통일된 프리미엄 스타일 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <div className="hidden sm:block"></div>
        
        <button
          onClick={() => setShowGoalForm(true)}
          className="flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all w-full sm:w-auto"
        >
          <Plus size={18} strokeWidth={3} />
          <span>신규 목표 설정</span>
        </button>
      </div>

      {/* 목표 목록 */}
      {goals.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-premium">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white">
            <Target size={40} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">설정된 목표가 없습니다</h3>
          <p className="text-sm text-slate-500 mt-2 font-medium mb-8 max-w-[240px] mx-auto leading-relaxed">
            원하는 수익금이나 승률 목표를 설정하고 달성 과정을 실시간으로 추적하세요.
          </p>
          <button
            onClick={() => setShowGoalForm(true)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-[15px] shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
          >
            첫 목표 설정하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {goals.map(goal => {
            const progress = calculateProgress(goal)
            const deadlineText = formatDeadline(goal.deadline)
            const overdue = isOverdue(goal.deadline)

            return (
              <div key={goal.id} className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-premium group relative overflow-hidden transition-all duration-300 hover:border-emerald-100">
                {/* 헤더: 진행 상태 체크와 액션 */}
                <div className="flex justify-between items-start mb-6">
                  <button
                    onClick={() => handleToggleComplete(goal.id)}
                    className={`transition-all active:scale-90 ${
                      goal.isCompleted ? 'text-emerald-500' : 'text-slate-200 hover:text-emerald-500'
                    }`}
                  >
                    {goal.isCompleted ? <CheckCircle size={32} strokeWidth={2.5} /> : <Circle size={32} strokeWidth={2.5} />}
                  </button>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(goal)} className="p-2 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                    <button onClick={() => handleDelete(goal.id)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                  </div>
                </div>

                {/* 제목 및 설명 */}
                <div className="mb-8">
                  <h3 className={`text-xl font-black text-slate-900 tracking-tight leading-snug ${
                    goal.isCompleted ? 'line-through opacity-40' : ''
                  }`}>
                    {goal.title}
                  </h3>
                  {goal.description && (
                    <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">{goal.description}</p>
                  )}
                </div>

                {/* 진행률 바: 프리미엄 디자인 */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Achieving Progress</span>
                    <span className="text-base font-black text-slate-900">{progress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${
                        goal.isCompleted ? 'bg-emerald-500 shadow-emerald-200' : 'bg-primary shadow-primary-200'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* 목표 수치 정보 */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  {goal.targetAmount && (
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                       <span className="text-[9px] font-black text-slate-400 uppercase mb-1.5 block flex items-center">
                         <TrendingUp size={12} className="mr-1.5" />
                         Target Profit
                       </span>
                       <span className="text-sm font-black text-slate-800">{formatCurrency(parseFloat(goal.targetAmount))}</span>
                    </div>
                  )}
                  {goal.targetWinRate && (
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                       <span className="text-[9px] font-black text-slate-400 uppercase mb-1.5 block flex items-center">
                         <Percent size={12} className="mr-1.5" />
                         Target Winrate
                       </span>
                       <span className="text-sm font-black text-slate-800">{goal.targetWinRate}%</span>
                    </div>
                  )}
                  {goal.deadline && (
                    <div className="col-span-full bg-slate-900 p-4 rounded-2xl flex justify-between items-center mt-1">
                       <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
                          <Calendar size={14} className="mr-2" />
                          Final Deadline
                       </div>
                       <span className={`text-xs font-black px-3 py-1 rounded-lg ${
                         overdue ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white animate-pulse'
                       }`}>
                         {deadlineText}
                       </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 목표 폼 모달 */}
      <GoalForm
        isOpen={showGoalForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingGoal}
        isEditing={!!editingGoal}
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
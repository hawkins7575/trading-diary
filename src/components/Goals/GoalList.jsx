import { useState } from 'react'
import { Edit, Trash2, Plus, Target, CheckCircle, Circle, Calendar } from 'lucide-react'
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
    setShowGoalForm(false)
    setEditingGoal(null)
  }

  // 목표 진행률 계산
  const calculateProgress = (goal) => {
    if (goal.isCompleted) return 100

    let progress = 0
    const now = new Date()
    const deadline = new Date(goal.deadline)
    const created = new Date(goal.createdAt || Date.now())

    // 시간 기준 진행률
    if (deadline > created) {
      const totalDays = Math.ceil((deadline - created) / (1000 * 60 * 60 * 24))
      const passedDays = Math.ceil((now - created) / (1000 * 60 * 60 * 24))
      const timeProgress = Math.min((passedDays / totalDays) * 100, 100)

      // 실제 성과 기준 진행률
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
      return '오늘까지'
    } else if (diffDays <= 30) {
      return `${diffDays}일 남음`
    } else {
      return date.toLocaleDateString('ko-KR')
    }
  }

  const isOverdue = (deadline) => {
    if (!deadline) return false
    return new Date(deadline) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">목표설정</h2>
        <button
          onClick={() => setShowGoalForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>새 목표</span>
        </button>
      </div>

      {/* 목표 목록 */}
      {goals.length === 0 ? (
        <div className="metric-card p-8 text-center">
          <Target size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">아직 설정된 목표가 없습니다</p>
          <button
            onClick={() => setShowGoalForm(true)}
            className="btn-primary"
          >
            첫 목표 설정하기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map(goal => {
            const progress = calculateProgress(goal)
            const deadlineText = formatDeadline(goal.deadline)
            const overdue = isOverdue(goal.deadline)

            return (
              <div key={goal.id} className="metric-card p-6">
                {/* 목표 헤더 */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => handleToggleComplete(goal.id)}
                      className={`mt-1 transition-colors ${
                        goal.isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                      }`}
                    >
                      {goal.isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
                    </button>
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 ${
                        goal.isCompleted ? 'line-through text-gray-500' : ''
                      }`}>
                        {goal.title}
                      </h3>
                      {goal.description && (
                        <p className="text-gray-600 mb-3">{goal.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="수정"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* 목표 상세 정보 */}
                <div className="space-y-4">
                  {/* 진행률 바 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">진행률</span>
                      <span className={`text-sm font-medium ${
                        goal.isCompleted ? 'text-green-600' : progress >= 80 ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          goal.isCompleted ? 'bg-green-500' : 
                          progress >= 80 ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* 목표 지표 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {goal.targetAmount && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">목표 수익</div>
                        <div className="text-lg font-semibold text-blue-600">
                          {formatCurrency(parseFloat(goal.targetAmount))}
                        </div>
                      </div>
                    )}
                    
                    {goal.targetWinRate && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">목표 승률</div>
                        <div className="text-lg font-semibold text-green-600">
                          {goal.targetWinRate}%
                        </div>
                      </div>
                    )}
                    
                    {goal.deadline && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 flex items-center justify-center">
                          <Calendar size={14} className="mr-1" />
                          마감일
                        </div>
                        <div className={`text-lg font-semibold ${
                          overdue ? 'text-red-600' : 'text-gray-700'
                        }`}>
                          {deadlineText}
                        </div>
                      </div>
                    )}
                  </div>
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
import { useState } from 'react'
import { Plus, MessageSquare, Clock, CheckCircle, XCircle, Filter } from 'lucide-react'
import { FeedbackForm } from './FeedbackForm'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'

export const FeedbackList = ({ feedbacks, onAddFeedback, onUpdateFeedback, onDeleteFeedback }) => {
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const confirmModal = useConfirmModal()
  const alertModal = useAlertModal()

  const handleSubmit = (feedbackData) => {
    onAddFeedback(feedbackData)
    alertModal.alert({
      title: '요청사항 제출 완료',
      message: '요청사항이 성공적으로 제출되었습니다. 검토 후 처리해드리겠습니다.',
      type: 'success'
    })
  }

  const handleDelete = async (id) => {
    const confirmed = await confirmModal.confirm({
      title: '요청사항 삭제',
      message: '이 요청사항을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소'
    })

    if (confirmed) {
      onDeleteFeedback(id)
      alertModal.alert({
        title: '삭제 완료',
        message: '요청사항이 삭제되었습니다.',
        type: 'success'
      })
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'reviewing':
        return <MessageSquare className="w-4 h-4 text-yellow-500" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'closed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'submitted': return '제출됨'
      case 'reviewing': return '검토중'
      case 'completed': return '완료'
      case 'closed': return '종료'
      default: return '알 수 없음'
    }
  }

  const getTypeText = (type) => {
    switch (type) {
      case 'feature': return '기능 요청'
      case 'improvement': return '개선 요청'
      case 'bug': return '버그 신고'
      case 'ui': return 'UI/UX'
      case 'other': return '기타'
      default: return type
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent': return '긴급'
      case 'high': return '높음'
      case 'medium': return '보통'
      case 'low': return '낮음'
      default: return priority
    }
  }

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const statusMatch = filter === 'all' || feedback.status === filter
    const typeMatch = typeFilter === 'all' || feedback.type === typeFilter
    return statusMatch && typeMatch
  })

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">요청사항 게시판</h2>
          <p className="text-gray-600 text-sm mt-1">
            새로운 기능이나 개선사항을 요청해주세요
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>새 요청사항</span>
        </button>
      </div>

      {/* 필터 */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">모든 상태</option>
            <option value="submitted">제출됨</option>
            <option value="reviewing">검토중</option>
            <option value="completed">완료</option>
            <option value="closed">종료</option>
          </select>
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">모든 유형</option>
          <option value="feature">기능 요청</option>
          <option value="improvement">개선 요청</option>
          <option value="bug">버그 신고</option>
          <option value="ui">UI/UX</option>
          <option value="other">기타</option>
        </select>
      </div>

      {/* 요청사항 목록 */}
      {filteredFeedbacks.length === 0 ? (
        <div className="metric-card p-8 text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {filter === 'all' && typeFilter === 'all' 
              ? '아직 요청사항이 없습니다' 
              : '필터 조건에 맞는 요청사항이 없습니다'
            }
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            첫 요청사항 작성하기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFeedbacks.map(feedback => (
            <div key={feedback.id} className="metric-card p-6 hover:shadow-md transition-shadow">
              {/* 헤더 */}
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{feedback.title}</h3>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(feedback.status)}
                      <span className="text-sm text-gray-600">{getStatusText(feedback.status)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {getTypeText(feedback.type)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                      {getPriorityText(feedback.priority)}
                    </span>
                    <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(feedback.id)}
                  className="mt-2 sm:mt-0 text-red-600 hover:text-red-800 text-sm"
                >
                  삭제
                </button>
              </div>

              {/* 내용 */}
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {feedback.description}
              </div>

              {/* 이메일 정보 */}
              {feedback.email && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">연락처: {feedback.email}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 요청사항 작성 폼 */}
      <FeedbackForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
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
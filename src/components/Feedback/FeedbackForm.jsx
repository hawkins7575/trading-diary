import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { Modal } from '@/components/UI/Modal'

export const FeedbackForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'feature',
    title: '',
    description: '',
    priority: 'medium',
    email: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      return
    }

    onSubmit(formData)
    
    // Reset form
    setFormData({
      type: 'feature',
      title: '',
      description: '',
      priority: 'medium',
      email: ''
    })
    
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="요청사항 작성" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 요청 유형 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            요청 유형
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="feature">새로운 기능 요청</option>
            <option value="improvement">기존 기능 개선</option>
            <option value="bug">버그 신고</option>
            <option value="ui">UI/UX 개선</option>
            <option value="other">기타</option>
          </select>
        </div>

        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="요청사항을 간단히 요약해주세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상세 설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="요청사항에 대해 자세히 설명해주세요&#10;&#10;예시:&#10;- 현재 상황과 문제점&#10;- 원하는 기능이나 개선사항&#10;- 기대 효과"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            required
          />
        </div>

        {/* 우선순위 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            우선순위
          </label>
          <select
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="low">낮음 - 있으면 좋은 기능</option>
            <option value="medium">보통 - 개선이 필요한 기능</option>
            <option value="high">높음 - 꼭 필요한 기능</option>
            <option value="urgent">긴급 - 버그나 심각한 문제</option>
          </select>
        </div>

        {/* 이메일 (선택사항) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이메일 <span className="text-gray-400">(선택사항)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="답변을 받고 싶으시면 이메일을 입력해주세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            이메일을 입력하시면 요청사항 처리 상황을 알려드립니다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!formData.title.trim() || !formData.description.trim()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send size={16} />
            <span>요청사항 제출</span>
          </button>
        </div>
      </form>
    </Modal>
  )
}
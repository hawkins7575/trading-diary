import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export const GoalForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    targetWinRate: '',
    deadline: '',
    description: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        title: '',
        targetAmount: '',
        targetWinRate: '',
        deadline: '',
        description: ''
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('목표명을 입력해주세요')
      return
    }

    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl m-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">
            {isEditing ? '목표 수정' : '새 목표 설정'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 목표명 */}
          <div>
            <label className="form-label">목표명 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="form-input"
              placeholder="달성하고 싶은 목표를 입력하세요"
              required
            />
          </div>

          {/* 목표 설정 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">목표 수익 금액 (원)</label>
              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
                className="form-input"
                placeholder="예: 100000"
              />
            </div>
            
            <div>
              <label className="form-label">목표 승률 (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.targetWinRate}
                onChange={(e) => setFormData(prev => ({ ...prev, targetWinRate: e.target.value }))}
                className="form-input"
                placeholder="예: 70"
              />
            </div>
          </div>

          {/* 마감일 */}
          <div>
            <label className="form-label">목표 달성 기한</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="form-input"
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="form-label">목표 설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="form-textarea"
              rows="4"
              placeholder="목표에 대한 상세한 설명을 입력하세요"
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditing ? '수정' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
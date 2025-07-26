import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const MOOD_OPTIONS = [
  { value: 'excellent', label: '매우 좋음', color: 'text-green-600' },
  { value: 'good', label: '좋음', color: 'text-blue-600' },
  { value: 'neutral', label: '보통', color: 'text-gray-600' },
  { value: 'bad', label: '나쁨', color: 'text-orange-600' },
  { value: 'terrible', label: '매우 나쁨', color: 'text-red-600' }
]

export const JournalForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    content: '',
    mood: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        content: '',
        mood: ''
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.content.trim()) {
      alert('일지 내용을 입력해주세요')
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
            {isEditing ? '일지 수정' : '새 일지 작성'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 날짜 */}
          <div>
            <label className="form-label">날짜</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="form-input"
              required
            />
          </div>

          {/* 기분 */}
          <div>
            <label className="form-label">오늘의 기분</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {MOOD_OPTIONS.map(mood => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, mood: mood.value }))}
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    formData.mood === mood.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className={`font-medium ${mood.color}`}>
                    {mood.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 내용 */}
          <div>
            <label className="form-label">일지 내용 *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="form-textarea"
              rows="8"
              placeholder="오늘의 매매 경험, 느낀 점, 배운 점 등을 자유롭게 작성해주세요..."
              required
            />
            <div className="text-sm text-gray-500 mt-1">
              {formData.content.length}/1000자
            </div>
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
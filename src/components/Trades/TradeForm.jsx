import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { TRADE_TAGS, TRADE_CHECKLIST } from '@/constants'

export const TradeForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    entry: '',
    withdrawal: '',
    balance: '',
    memo: '',
    tags: [],
    checklist: {}
  })

  const [activeTagCategory, setActiveTagCategory] = useState('success')
  const [showScrollForm, setShowScrollForm] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        entry: '',
        withdrawal: '',
        balance: '',
        memo: '',
        tags: [],
        checklist: {}
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.date || !formData.balance) {
      alert('날짜와 잔고는 필수 입력 항목입니다.')
      return
    }

    onSubmit(formData)
    onClose()
  }

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleChecklistToggle = (key) => {
    setFormData(prev => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [key]: !prev.checklist[key]
      }
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden m-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">
            {isEditing ? '거래 수정' : '새 거래 추가'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* 스크롤 가능한 폼 영역 */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">날짜 *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">잔고 *</label>
                <input
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData(prev => ({ ...prev, balance: e.target.value }))}
                  className="form-input"
                  placeholder="현재 잔고"
                  required
                />
              </div>
              <div>
                <label className="form-label">입금</label>
                <input
                  type="number"
                  value={formData.entry}
                  onChange={(e) => setFormData(prev => ({ ...prev, entry: e.target.value }))}
                  className="form-input"
                  placeholder="입금액"
                />
              </div>
              <div>
                <label className="form-label">출금</label>
                <input
                  type="number"
                  value={formData.withdrawal}
                  onChange={(e) => setFormData(prev => ({ ...prev, withdrawal: e.target.value }))}
                  className="form-input"
                  placeholder="출금액"
                />
              </div>
            </div>

            {/* 메모 */}
            <div>
              <label className="form-label">메모</label>
              <textarea
                value={formData.memo}
                onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))}
                className="form-textarea"
                rows="3"
                placeholder="거래에 대한 메모를 입력하세요"
              />
            </div>

            {/* 패턴 태그 */}
            <div>
              <label className="form-label">거래 패턴 태그</label>
              <div className="mb-3">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setActiveTagCategory('success')}
                    className={`px-4 py-2 rounded-md text-sm ${
                      activeTagCategory === 'success' 
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    성공 패턴
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTagCategory('failure')}
                    className={`px-4 py-2 rounded-md text-sm ${
                      activeTagCategory === 'failure' 
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    실패 패턴
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRADE_TAGS[activeTagCategory].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      formData.tags.includes(tag)
                        ? activeTagCategory === 'success'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                        : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {tag.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* 체크리스트 */}
            <div>
              <label className="form-label">매매 체크리스트</label>
              <div className="space-y-2">
                {Object.entries(TRADE_CHECKLIST).map(([key, question]) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.checklist[key] || false}
                      onChange={() => handleChecklistToggle(key)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{question}</span>
                  </label>
                ))}
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
                {isEditing ? '수정' : '추가'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
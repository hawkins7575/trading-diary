import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const RISK_LEVELS = [
  { value: 'low', label: '낮음', color: 'text-green-600' },
  { value: 'medium', label: '보통', color: 'text-yellow-600' },
  { value: 'high', label: '높음', color: 'text-red-600' }
]

export const StrategyForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    buyConditions: '',
    sellConditions: '',
    riskManagement: '',
    stopLoss: '',
    technicalIndicators: '',
    riskLevel: 'medium',
    timeframe: '',
    targetReturn: '',
    maxDrawdown: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: '',
        description: '',
        buyConditions: '',
        sellConditions: '',
        riskManagement: '',
        stopLoss: '',
        technicalIndicators: '',
        riskLevel: 'medium',
        timeframe: '',
        targetReturn: '',
        maxDrawdown: ''
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('전략명을 입력해주세요')
      return
    }

    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden m-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">
            {isEditing ? '전략 수정' : '새 전략 추가'}
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
              <div className="md:col-span-2">
                <label className="form-label">전략명 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                  placeholder="전략의 이름을 입력하세요"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="form-label">전략 설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="form-textarea"
                  rows="3"
                  placeholder="전략에 대한 간단한 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="form-label">리스크 수준</label>
                <div className="grid grid-cols-3 gap-2">
                  {RISK_LEVELS.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, riskLevel: level.value }))}
                      className={`p-3 text-sm rounded-lg border transition-colors ${
                        formData.riskLevel === level.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className={`font-medium ${level.color}`}>
                        {level.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">시간 프레임</label>
                <input
                  type="text"
                  value={formData.timeframe}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeframe: e.target.value }))}
                  className="form-input"
                  placeholder="예: 1시간, 4시간, 일간"
                />
              </div>
            </div>

            {/* 매수/매도 조건 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">매수 조건</label>
                <textarea
                  value={formData.buyConditions}
                  onChange={(e) => setFormData(prev => ({ ...prev, buyConditions: e.target.value }))}
                  className="form-textarea"
                  rows="6"
                  placeholder="매수 시점의 조건들을 입력하세요&#10;예:&#10;• RSI 30 이하&#10;• 이동평균선 돌파&#10;• 거래량 증가"
                />
              </div>
              
              <div>
                <label className="form-label">매도 조건</label>
                <textarea
                  value={formData.sellConditions}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellConditions: e.target.value }))}
                  className="form-textarea"
                  rows="6"
                  placeholder="매도 시점의 조건들을 입력하세요&#10;예:&#10;• RSI 70 이상&#10;• 저항선 도달&#10;• 목표 수익률 달성"
                />
              </div>
            </div>

            {/* 리스크 관리 */}
            <div>
              <label className="form-label">리스크 관리</label>
              <textarea
                value={formData.riskManagement}
                onChange={(e) => setFormData(prev => ({ ...prev, riskManagement: e.target.value }))}
                className="form-textarea"
                rows="4"
                placeholder="리스크 관리 방법을 입력하세요&#10;예:&#10;• 손절: -3%&#10;• 목표: +6%&#10;• 포지션 크기: 총 자금의 10%"
              />
            </div>

            {/* 기술적 지표 및 기타 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">기술적 지표</label>
                <textarea
                  value={formData.technicalIndicators}
                  onChange={(e) => setFormData(prev => ({ ...prev, technicalIndicators: e.target.value }))}
                  className="form-textarea"
                  rows="3"
                  placeholder="사용하는 기술적 지표들&#10;예: RSI, 이동평균선, 볼린저밴드"
                />
              </div>
              
              <div>
                <label className="form-label">손절 기준</label>
                <textarea
                  value={formData.stopLoss}
                  onChange={(e) => setFormData(prev => ({ ...prev, stopLoss: e.target.value }))}
                  className="form-textarea"
                  rows="3"
                  placeholder="손절 기준을 입력하세요&#10;예: 매수가 기준 -3%"
                />
              </div>
            </div>

            {/* 목표 및 기대값 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">목표 수익률</label>
                <input
                  type="text"
                  value={formData.targetReturn}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetReturn: e.target.value }))}
                  className="form-input"
                  placeholder="예: 월 10-15%"
                />
              </div>
              
              <div>
                <label className="form-label">최대 손실폭</label>
                <input
                  type="text"
                  value={formData.maxDrawdown}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxDrawdown: e.target.value }))}
                  className="form-input"
                  placeholder="예: 최대 5%"
                />
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
    </div>
  )
}
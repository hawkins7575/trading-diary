import { useState, useEffect } from 'react'
import { X, Target, TrendingUp, Percent, Calendar, FileText, Check, Trophy } from 'lucide-react'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* 상단 액센트 바 */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-800"></div>
        
        {/* 헤더 */}
        <div className="flex items-center justify-between p-8 pb-4 relative z-10 border-b border-slate-50">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Trophy size={20} strokeWidth={2.5} />
             </div>
             <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {isEditing ? '재무 목표 최적화' : '새로운 미래 가치 설정'}
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Financial Objective Architecture</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-8 relative z-10">
          {/* 목표명 */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
              <Target size={12} className="mr-1.5" /> 목표 식별 명칭 (Goal Title)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
              placeholder="달성하고 싶은 구체적인 목표를 입력하세요 (예: 1억 자산 형성)"
              required
            />
          </div>

          {/* 수치 설정 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
                <TrendingUp size={12} className="mr-1.5" /> 목표 수익 금액 ($)
              </label>
              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                placeholder="예: 50000"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
                <Percent size={12} className="mr-1.5" /> 타겟 승률 지표 (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.targetWinRate}
                onChange={(e) => setFormData(prev => ({ ...prev, targetWinRate: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                placeholder="예: 75"
              />
            </div>
          </div>

          {/* 마감일 */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
              <Calendar size={12} className="mr-1.5" /> 목표 달성 기한 (Deadline)
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
            />
          </div>

          {/* 상세 설명 */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
              <FileText size={12} className="mr-1.5" /> 목표 이행 로드맵 (Description)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-5 px-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none resize-none leading-relaxed"
              rows="3"
              placeholder="이 목표를 달성하기 위한 구체적인 방법이나 다짐을 기록하세요"
            />
          </div>

          {/* 버튼 */}
          <div className="flex items-center space-x-3 pt-4 border-t border-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-300 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Check size={18} strokeWidth={3} />
              <span>{isEditing ? '목표 수정 반영' : '목표 설정 완료'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
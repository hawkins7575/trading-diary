import { useState, useEffect } from 'react'
import { X, Calendar, PenTool, Sparkles, Layout, Check, BookOpen } from 'lucide-react'

const MOOD_OPTIONS = [
  { value: 'excellent', label: '최상', emoji: '🔥', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { value: 'good', label: '좋음', emoji: '✨', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  { value: 'neutral', label: '보통', emoji: '☁️', color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' },
  { value: 'bad', label: '나쁨', emoji: '⚠️', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' },
  { value: 'terrible', label: '주의', emoji: '🚫', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' }
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
    mood: 'neutral'
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        content: '',
        mood: 'neutral'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* 장식용 배경 요소 */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        {/* 헤더 */}
        <div className="flex items-center justify-between p-8 pb-4 relative z-10">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <BookOpen size={20} strokeWidth={2.5} />
             </div>
             <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {isEditing ? '일지 내용 수정' : '새로운 매매 인사이트 기록'}
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Perspective Entry Form</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 날짜 */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
                 <Calendar size={12} className="mr-1.5" /> 기록 날짜 (Date)
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm font-black text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                required
              />
            </div>

            {/* 기분 */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
                 <Sparkles size={12} className="mr-1.5" /> 심리 상태 (Condition)
              </label>
              <div className="relative group">
                 <select
                   value={formData.mood}
                   onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value }))}
                   className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-10 text-sm font-black text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none appearance-none cursor-pointer"
                 >
                   {MOOD_OPTIONS.map(mood => (
                     <option key={mood.value} value={mood.value}>
                       {mood.emoji} {mood.label}
                     </option>
                   ))}
                 </select>
                 <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <Layout size={18} />
                 </div>
              </div>
            </div>
          </div>

          {/* 기분 셀렉터 */}
          <div className="grid grid-cols-5 gap-3">
             {MOOD_OPTIONS.map(mood => (
               <button
                 key={mood.value}
                 type="button"
                 onClick={() => setFormData(prev => ({ ...prev, mood: mood.value }))}
                 className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 group ${
                   formData.mood === mood.value
                     ? `${mood.border} ${mood.bg} scale-105 shadow-md`
                     : 'border-transparent bg-slate-50 hover:bg-slate-100 grayscale opacity-70'
                 }`}
               >
                 <span className={`text-xl mb-1.5 transition-transform ${formData.mood === mood.value ? 'scale-125' : 'group-hover:scale-110'}`}>{mood.emoji}</span>
                 <span className={`text-[10px] font-black uppercase tracking-tighter ${formData.mood === mood.value ? mood.color : 'text-slate-500'}`}>{mood.label}</span>
                 {formData.mood === mood.value && (
                    <div className={`mt-2 w-1.5 h-1.5 rounded-full ${mood.color.replace('text-', 'bg-')} animate-pulse`}></div>
                 )}
               </button>
             ))}
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
               <PenTool size={12} className="mr-1.5" /> 매매 복기 및 자기 성찰 (Insights)
            </label>
            <div className="relative group">
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-6 px-7 text-base font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none resize-none leading-relaxed"
                rows="6"
                placeholder="오늘의 매매 경험, 감정의 변화, 그리고 다음을 위한 레슨을 상세히 기록하세요..."
                required
              />
              <div className="absolute bottom-6 right-8 flex items-center space-x-2">
                 <span className={`text-[10px] font-black tracking-widest ${formData.content.length > 900 ? 'text-rose-500' : 'text-slate-400 uppercase'}`}>
                   {formData.content.length} / 1000
                 </span>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex items-center space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Check size={18} strokeWidth={3} />
              <span>{isEditing ? '기록 수정 완료' : '일지 저장하기'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
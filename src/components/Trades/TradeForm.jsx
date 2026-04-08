import { useState, useEffect } from 'react'
import { X, Calendar, Wallet, Receipt, ArrowDownCircle, ArrowUpCircle, PenTool, Check, Hash, ListChecks, ShieldCheck } from 'lucide-react'
import { TRADE_TAGS, TRADE_CHECKLIST } from '@/constants'

export const TradeForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  isEditing = false,
  latestSeed = ''
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    entry: '',
    withdrawal: '',
    balance: '',
    seed: latestSeed || '',
    memo: '',
    tags: [],
    checklist: {}
  })

  const [activeTagCategory, setActiveTagCategory] = useState('success')

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        entry: '',
        withdrawal: '',
        balance: '',
        seed: latestSeed || '',
        memo: '',
        tags: [],
        checklist: {}
      })
    }
  }, [initialData, isOpen, latestSeed])

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* 상단 액센트 바 */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-800"></div>
        
        {/* 헤더 */}
        <div className="flex items-center justify-between p-8 pb-4 relative z-10 border-b border-slate-100">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Receipt size={20} strokeWidth={2.5} />
             </div>
             <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {isEditing ? '거래 레코드 데이터 수정' : '신규 거래 데이터 동기화'}
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5 whitespace-nowrap">Transaction Data Entry</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* 스크롤 가능한 폼 영역 */}
        <div className="overflow-y-auto max-h-[calc(90vh-160px)] no-scrollbar p-8 pt-6 space-y-12">
          <form id="trade-form" onSubmit={handleSubmit} className="space-y-12">
            
            {/* 섹션 1: 금융 메트릭 */}
            <div className="space-y-6">
               <div className="flex items-center space-x-2 px-1">
                  <Wallet size={16} className="text-indigo-600" />
                  <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">핵심 거래 지표 (Metrics)</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">총 투자 시드머니</label>
                    <div className="relative group">
                       <input
                         type="number"
                         value={formData.seed}
                         onChange={(e) => setFormData(prev => ({ ...prev, seed: e.target.value }))}
                         className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                         placeholder="0.00"
                       />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">날짜 기록 *</label>
                    <div className="relative group">
                       <input
                         type="date"
                         value={formData.date}
                         onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                         className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                         required
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">현재 잔고 (Balance) *</label>
                    <div className="relative group">
                       <input
                         type="number"
                         value={formData.balance}
                         onChange={(e) => setFormData(prev => ({ ...prev, balance: e.target.value }))}
                         className="w-full bg-indigo-50 border border-indigo-200 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 placeholder:text-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                         placeholder="0.00"
                         required
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">총 입금액 (Entry)</label>
                    <div className="relative">
                       <ArrowDownCircle className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                       <input
                         type="number"
                         value={formData.entry}
                         onChange={(e) => setFormData(prev => ({ ...prev, entry: e.target.value }))}
                         className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl py-4.5 pl-6 pr-12 text-sm font-black text-slate-900 placeholder:text-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-400 transition-all outline-none"
                         placeholder="0.00"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">총 출금액 (Withdrawal)</label>
                    <div className="relative">
                       <ArrowUpCircle className="absolute right-6 top-1/2 -translate-y-1/2 text-rose-500" size={18} />
                       <input
                         type="number"
                         value={formData.withdrawal}
                         onChange={(e) => setFormData(prev => ({ ...prev, withdrawal: e.target.value }))}
                         className="w-full bg-rose-50 border border-rose-200 rounded-2xl py-4.5 pl-6 pr-12 text-sm font-black text-slate-900 placeholder:text-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100/50 focus:border-rose-400 transition-all outline-none"
                         placeholder="0.00"
                       />
                    </div>
                  </div>
               </div>
            </div>

            {/* 섹션 2: 패턴 분석 & 태깅 */}
            <div className="space-y-6">
               <div className="flex items-center space-x-2 px-1">
                  <Hash size={16} className="text-slate-900" />
                  <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">패턴 식별 및 태깅</span>
               </div>
               
               <div className="space-y-4">
                  <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 w-full sm:w-fit">
                    <button
                      type="button"
                      onClick={() => setActiveTagCategory('success')}
                      className={`px-8 py-2.5 rounded-xl text-[11px] font-black tracking-widest transition-all ${
                        activeTagCategory === 'success' 
                          ? 'bg-white text-emerald-600 shadow-sm scale-110'
                          : 'text-slate-500'
                      }`}
                    >
                      성공 패턴 (SUCCESS)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTagCategory('failure')}
                      className={`px-8 py-2.5 rounded-xl text-[11px] font-black tracking-widest transition-all ${
                        activeTagCategory === 'failure' 
                          ? 'bg-white text-rose-600 shadow-sm scale-110'
                          : 'text-slate-500'
                      }`}
                    >
                      실패 패턴 (FAILURE)
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    {TRADE_TAGS[activeTagCategory].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`px-5 py-2.5 rounded-2xl text-[12px] font-black border-2 transition-all active:scale-95 ${
                          formData.tags.includes(tag)
                            ? activeTagCategory === 'success'
                              ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200'
                              : 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200'
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {tag.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            {/* 섹션 3: 체크리스트 & 원칙 준수 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 px-1">
                   <ListChecks size={16} className="text-slate-900" />
                   <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">매매 원칙 체크리스트</span>
                </div>
                <div className="space-y-3 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  {Object.entries(TRADE_CHECKLIST).map(([key, question]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleChecklistToggle(key)}
                      className={`w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all text-left ${
                        formData.checklist[key]
                          ? 'bg-white border-indigo-200 text-indigo-700 shadow-sm'
                          : 'bg-white border-white text-slate-400 opacity-60'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${
                        formData.checklist[key] ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200'
                      }`}>
                        {formData.checklist[key] && <Check size={14} strokeWidth={4} />}
                      </div>
                      <span className="text-xs font-black tracking-tight">{question}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-2 px-1">
                   <PenTool size={16} className="text-slate-900" />
                   <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">디테일 메모</span>
                </div>
                <textarea
                  value={formData.memo}
                  onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 text-base font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none resize-none leading-relaxed h-[280px]"
                  placeholder="거래 중 발생한 특이사항이나 감정적인 부분을 기록하세요"
                />
              </div>
            </div>
          </form>
        </div>

        {/* 푸터 액션 */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center space-x-4 relative z-20">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95"
          >
            취소 (Cancel)
          </button>
          <button
            type="submit"
            form="trade-form"
            className="flex-[2] py-4.5 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-300 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <Check size={18} strokeWidth={3} />
            <span>{isEditing ? '데이터 수정 반영' : '거래 데이터 동기화'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
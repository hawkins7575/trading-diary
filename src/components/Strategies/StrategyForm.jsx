import { useState, useEffect } from 'react'
import { X, ShieldCheck, Target, Zap, Activity, Clock, BarChart3, TrendingUp, AlertCircle, Check, BookOpen, PenTool } from 'lucide-react'

const RISK_LEVELS = [
  { value: 'low', label: '상시 방어형', emoji: '🛡️', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { value: 'medium', label: '균형 수익형', emoji: '⚖️', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { value: 'high', label: '고수익 추구', emoji: '⚡', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-100' }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* 상단 액센트 바 */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-800"></div>
        
        {/* 헤더 */}
        <div className="flex items-center justify-between p-8 pb-4 relative z-10 border-b border-slate-100">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <ShieldCheck size={20} strokeWidth={2.5} />
             </div>
             <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {isEditing ? '전략 알고리즘 최적화' : '새로운 매매 전략 설계'}
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5 whitespace-nowrap">Quantitative Strategy Architecture</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* 스크롤 가능한 폼 영역 */}
        <div className="overflow-y-auto max-h-[calc(90vh-160px)] no-scrollbar p-8 pt-6 space-y-12">
          <form id="strategy-form" onSubmit={handleSubmit} className="space-y-12">
            
            {/* 섹션 1: 전략 개요 */}
            <div className="space-y-6">
               <div className="flex items-center space-x-2 px-1">
                  <BookOpen size={16} className="text-indigo-600" />
                  <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">전략 설정 개요</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">전략 식별 명칭</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                      placeholder="분석 가능한 명확한 전략 명칭 (예: 1시간봉 RSI 다이버전스)"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">상세 전략 설명</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-5 px-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none resize-none leading-relaxed"
                      rows="3"
                      placeholder="이 전략의 핵심 아이디어와 사용 목적을 기록하세요"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">리스크 프로필 선택</label>
                    <div className="grid grid-cols-3 gap-3">
                      {RISK_LEVELS.map(level => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, riskLevel: level.value }))}
                          className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 transition-all duration-300 ${
                            formData.riskLevel === level.value
                              ? `${level.border} ${level.bg} scale-105 shadow-md`
                              : 'border-transparent bg-slate-50 hover:bg-slate-100 grayscale opacity-70'
                          }`}
                        >
                          <span className="text-xl mb-1">{level.emoji}</span>
                          <span className={`text-[10px] font-black whitespace-nowrap ${formData.riskLevel === level.value ? level.color : 'text-slate-500'}`}>{level.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">운용 시간 프레임 (Timeframe)</label>
                    <div className="relative group">
                       <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                       <input
                        type="text"
                        value={formData.timeframe}
                        onChange={(e) => setFormData(prev => ({ ...prev, timeframe: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 pl-14 pr-6 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                        placeholder="예: 1시간봉, 4시간봉, 일봉"
                      />
                    </div>
                  </div>
               </div>
            </div>

            {/* 섹션 2: 매매 알고리즘 로직 */}
            <div className="space-y-6">
               <div className="flex items-center space-x-2 px-1">
                  <Zap size={16} className="text-amber-600" />
                  <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">매매 실행 로직</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                       <label className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">매수 / 진입 조건 (Entry)</label>
                       <TrendingUp size={14} className="text-emerald-600" />
                    </div>
                    <textarea
                      value={formData.buyConditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, buyConditions: e.target.value }))}
                      className="w-full bg-emerald-50 border border-emerald-100 rounded-[2rem] py-6 px-7 text-sm font-black text-slate-900 placeholder:text-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-400 transition-all outline-none resize-none leading-relaxed"
                      rows="6"
                      placeholder="• RSI 30 하단 돌파&#10;• MACD 골든크로스 발생&#10;• 주요 지지선 터치 후 반등"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                       <label className="text-[11px] font-black text-rose-700 uppercase tracking-widest">매도 / 청산 조건 (Exit)</label>
                       <TrendingUp size={14} className="text-rose-600 rotate-180" />
                    </div>
                    <textarea
                      value={formData.sellConditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, sellConditions: e.target.value }))}
                      className="w-full bg-rose-50 border border-rose-100 rounded-[2rem] py-6 px-7 text-sm font-black text-slate-900 placeholder:text-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100/50 focus:border-rose-400 transition-all outline-none resize-none leading-relaxed"
                      rows="6"
                      placeholder="• 타겟 목표가 도달&#10;• 추세 이탈 확인 시&#10;• 데드크로스 발생 시"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center space-x-2 px-1">
                       <PenTool size={14} className="text-indigo-600" />
                       <label className="text-[11px] font-black text-indigo-700 uppercase tracking-widest">활용 기술적 지표</label>
                    </div>
                    <input
                      type="text"
                      value={formData.technicalIndicators}
                      onChange={(e) => setFormData(prev => ({ ...prev, technicalIndicators: e.target.value }))}
                      className="w-full bg-indigo-50 border border-indigo-100 rounded-2xl py-4.5 px-6 text-sm font-black text-slate-900 placeholder:text-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 transition-all outline-none"
                      placeholder="RSI, 볼린저 밴드, 매물대 프로필"
                    />
                  </div>
               </div>
            </div>

            {/* 섹션 3: 리스크 관리 기준 */}
            <div className="space-y-6">
               <div className="flex items-center space-x-2 px-1">
                  <ShieldCheck size={16} className="text-slate-900" />
                  <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">리스크 거버넌스</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">자산 관리 및 운용 원칙</label>
                    <textarea
                      value={formData.riskManagement}
                      onChange={(e) => setFormData(prev => ({ ...prev, riskManagement: e.target.value }))}
                      className="w-full bg-slate-900 text-slate-100 border border-slate-800 rounded-[2rem] py-6 px-7 text-sm font-bold placeholder:text-slate-600 focus:bg-slate-950 focus:ring-4 focus:ring-slate-100 transition-all outline-none resize-none leading-relaxed"
                      rows="4"
                      placeholder="• 총 자산의 1% 미만 리스크&#10;• 2% 수익 시 본절가 스탑로스 이동"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-rose-700 uppercase tracking-widest ml-1">강제 손절 기준 (Stop Loss)</label>
                    <div className="relative group">
                       <AlertCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                       <input
                        type="text"
                        value={formData.stopLoss}
                        onChange={(e) => setFormData(prev => ({ ...prev, stopLoss: e.target.value }))}
                        className="w-full bg-rose-50 border border-rose-100 rounded-2xl py-4.5 pl-14 pr-6 text-sm font-black text-slate-900 placeholder:text-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100/50 focus:border-rose-300 transition-all outline-none"
                        placeholder="예: -3% 또는 고정 금액"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-emerald-700 uppercase tracking-widest ml-1">기대 수익 목표 (Target)</label>
                    <div className="relative group">
                       <Target className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                       <input
                        type="text"
                        value={formData.targetReturn}
                        onChange={(e) => setFormData(prev => ({ ...prev, targetReturn: e.target.value }))}
                        className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl py-4.5 pl-14 pr-6 text-sm font-black text-slate-900 placeholder:text-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-300 transition-all outline-none"
                        placeholder="예: 월 10% 이상 수익"
                      />
                    </div>
                  </div>
               </div>
            </div>
          </form>
        </div>

        {/* 하단 푸터 액션 */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center space-x-4 relative z-20">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95"
          >
            취소
          </button>
          <button
            type="submit"
            form="strategy-form"
            className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <Check size={18} strokeWidth={3} />
            <span>{isEditing ? '전략 수정 완료' : '전측 신규 등록'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
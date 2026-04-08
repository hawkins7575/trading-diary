import { useState } from 'react'
import { 
  Edit3, 
  Trash2, 
  Plus, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  Target, 
  ArrowDownCircle, 
  Zap, 
  Scale,
  ChevronRight,
  Info,
  ShieldCheck
} from 'lucide-react'
import { StrategyForm } from './StrategyForm'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'

const RISK_COLORS = {
  low: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  medium: 'bg-amber-50 text-amber-600 border-amber-100',
  high: 'bg-rose-50 text-rose-600 border-rose-100'
}

const RISK_LABELS = {
  low: '보수적',
  medium: '중립적',
  high: '공격적'
}

export const StrategyList = ({ 
  strategies, 
  onAddStrategy, 
  onUpdateStrategy, 
  onDeleteStrategy 
}) => {
  const [showStrategyForm, setShowStrategyForm] = useState(false)
  const [editingStrategy, setEditingStrategy] = useState(null)
  
  const confirmModal = useConfirmModal()
  const alertModal = useAlertModal()

  const handleEdit = (strategy) => {
    setEditingStrategy(strategy)
    setShowStrategyForm(true)
  }

  const handleDelete = async (id) => {
    const confirmed = await confirmModal.confirm({
      title: '전략 데이터 영구 삭제',
      message: '이 매매 전략을 시스템에서 완전히 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.',
      confirmText: '데이터 삭제',
      cancelText: '취소'
    })

    if (confirmed) {
      onDeleteStrategy(id)
      alertModal.alert({
        title: '삭제 완료',
        message: '매매 전략이 안전하게 삭제되었습니다.',
        type: 'success'
      })
    }
  }

  const handleFormSubmit = (formData) => {
    if (editingStrategy) {
      onUpdateStrategy(editingStrategy.id, formData)
    } else {
      onAddStrategy(formData)
    }
    setEditingStrategy(null)
  }

  const handleFormClose = () => {
    setShowStrategyForm(false)
    setEditingStrategy(null)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* 헤더 섹션: 세련된 통일감 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <div className="hidden sm:block"></div>
        
        <button
          onClick={() => setShowStrategyForm(true)}
          className="flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all w-full sm:w-auto"
        >
          <Plus size={18} strokeWidth={3} />
          <span>신규 전략 추가</span>
        </button>
      </div>

      {/* 전략 목록 */}
      {strategies.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-premium mt-6">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white">
            <Zap size={40} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">활성화된 전략이 없습니다</h3>
          <p className="text-sm text-slate-500 mt-2 font-medium mb-8 max-w-[240px] mx-auto leading-relaxed text-balance">
            나만의 매수/매도 원칙을 기록하여 시장의 변동성에 현명하게 대응하세요.
          </p>
          <button
            onClick={() => setShowStrategyForm(true)}
            className="bg-amber-500 text-white px-8 py-3 rounded-2xl font-black text-[15px] shadow-lg shadow-amber-100 hover:scale-105 active:scale-95 transition-all"
          >
            첫 전략 구축하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {strategies.map(strategy => (
            <div key={strategy.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden transition-all duration-300 hover:border-amber-100/50 group flex flex-col">
              {/* 상단: 기본 정보 */}
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-3">
                    <div className={`inline-flex items-center px-3 py-1 text-[10px] font-black rounded-lg border uppercase tracking-widest ${RISK_COLORS[strategy.riskLevel]}`}>
                      {RISK_LABELS[strategy.riskLevel]} 리스크
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors">{strategy.name}</h3>
                    <div className="flex items-center space-x-4 text-slate-400">
                      {strategy.timeframe && (
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold">
                          <Clock size={14} className="text-slate-300" />
                          <span>Timeframe: {strategy.timeframe}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(strategy)} className="p-2.5 text-slate-300 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                    <button onClick={() => handleDelete(strategy.id)} className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4.5 text-[13px] font-medium text-slate-600 border border-slate-100/50 leading-relaxed italic mb-8">
                  <Info size={16} className="inline mr-2 text-slate-400 -mt-0.5" />
                  {strategy.description || '전략에 대한 설명이 비어 있습니다.'}
                </div>
              </div>

              {/* 본문: 매매 로직 */}
              <div className="px-8 pb-8 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                     <div className="flex items-center space-x-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 self-start px-2 py-0.5 rounded-lg w-fit">
                        <TrendingUp size={12} />
                        <span>Entry Logic</span>
                      </div>
                      <div className="text-[13px] text-slate-600 font-medium leading-relaxed whitespace-pre-line p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100/50 min-h-[100px]">
                        {strategy.buyConditions || '진입 조건 미설정'}
                      </div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex items-center space-x-2 text-[10px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 self-start px-2 py-0.5 rounded-lg w-fit">
                        <ArrowDownCircle size={12} />
                        <span>Exit Logic</span>
                      </div>
                      <div className="text-[13px] text-slate-600 font-medium leading-relaxed whitespace-pre-line p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100/50 min-h-[100px]">
                        {strategy.sellConditions || '청산 조건 미설정'}
                      </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-50 p-5 space-y-3">
                    <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <ShieldAlert size={14} />
                       <span>Risk Management Policy</span>
                    </div>
                    <p className="text-[13px] font-bold text-slate-700 leading-relaxed">{strategy.riskManagement || '규칙 미설정'}</p>
                </div>
              </div>

              {/* 푸터: 퍼포먼스 타겟 */}
              <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center space-x-8">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Target ROI</span>
                    <div className="flex items-center text-emerald-600 font-black text-lg">
                      <Target size={16} className="mr-1.5" />
                      <span>{strategy.targetReturn || '0%'}</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Max Drawdown</span>
                    <div className="flex items-center text-slate-900 font-black text-lg">
                      <Scale size={16} className="mr-1.5" />
                      <span>{strategy.maxDrawdown || '0%'}</span>
                    </div>
                  </div>
                </div>
                
                <button className="text-xs font-black text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-xl transition-all flex items-center space-x-2 group/btn">
                  <span>Full Analytics</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 전략 폼 모달 */}
      <StrategyForm
        isOpen={showStrategyForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingStrategy}
        isEditing={!!editingStrategy}
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
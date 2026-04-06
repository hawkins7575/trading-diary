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
  Info
} from 'lucide-react'
import { StrategyForm } from './StrategyForm'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { ConfirmModal, AlertModal } from '@/components/UI/Modal'

const RISK_COLORS = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-danger/10 text-danger border-danger/20'
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 헤더 섹션 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center space-x-2 text-primary mb-1">
            <Zap size={18} fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-widest">Global Strategies</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">알고리즘 및 매매 전략고</h2>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl">
            시장의 변동성에 대응하기 위해 검증된 전략을 관리하세요. 각 전략은 리스크 관리 및 진입/청산 로직을 포함합니다.
          </p>
        </div>
        <button
          onClick={() => setShowStrategyForm(true)}
          className="btn-primary group flex items-center space-x-2 shadow-lg shadow-primary/20"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>신규 전략 라이브러리 추가</span>
        </button>
      </div>

      {/* 전략 목록 그리드 */}
      {strategies.length === 0 ? (
        <div className="premium-card py-20 text-center border-dashed border-2 bg-slate-50/50">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-soft flex items-center justify-center mx-auto mb-6">
            <TrendingUp size={36} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">활성화된 전략이 없습니다</h3>
          <p className="text-slate-500 mb-8 text-sm">트레이딩 성과를 높이기 위해 나만의 매수/매도 원칙을 기록해 보세요.</p>
          <button
            onClick={() => setShowStrategyForm(true)}
            className="btn-outline border-slate-200"
          >
            첫 매매 전략 구축하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {strategies.map(strategy => (
            <div key={strategy.id} className="premium-card group hover:scale-[1.01] transition-all duration-300">
              {/* 카드 상단: 메타 정보 */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{strategy.name}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-black border rounded-full uppercase tracking-tighter ${RISK_COLORS[strategy.riskLevel]}`}>
                      {RISK_LABELS[strategy.riskLevel]} 리스크
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-400">
                    {strategy.timeframe && (
                      <div className="flex items-center space-x-1.5 text-xs font-medium">
                        <Clock size={14} />
                        <span>타임프레임: {strategy.timeframe}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(strategy)}
                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                    title="전략 수정"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(strategy.id)}
                    className="p-2 text-slate-400 hover:text-danger transition-colors"
                    title="전략 삭제"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* 전략 요약 본문 */}
              {strategy.description && (
                <div className="bg-slate-50 rounded-xl p-4 mb-6 italic text-sm text-slate-600 border-l-4 border-slate-200">
                  <Info size={16} className="inline mr-2 text-slate-400" />
                  {strategy.description}
                </div>
              )}

              {/* 기술적 로직 섹션 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold text-success uppercase tracking-wider">
                      <TrendingUp size={14} />
                      <span>ENTRY LOGIC (매수)</span>
                    </div>
                    <div className="text-xs text-slate-600 whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-100 min-h-[80px]">
                      {strategy.buyConditions || '진입 조건이 정의되지 않았습니다.'}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold text-danger uppercase tracking-wider">
                      <ArrowDownCircle size={14} />
                      <span>EXIT LOGIC (매도)</span>
                    </div>
                    <div className="text-xs text-slate-600 whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-100 min-h-[80px]">
                      {strategy.sellConditions || '청산 조건이 정의되지 않았습니다.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 리스크 관리 포인트 */}
              <div className="mb-8 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <ShieldAlert size={14} />
                  <span>RISK MANAGEMENT (리스크 관리)</span>
                </div>
                <div className="text-xs text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-blue-100/50">
                  {strategy.riskManagement || '자금 관리 규칙이 설정되지 않았습니다.'}
                </div>
              </div>

              {/* 지표 하이라이트 (Footer) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <div className="flex space-x-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Target ROI</span>
                    <div className="flex items-center text-primary font-black">
                      <Target size={14} className="mr-1" />
                      <span>{strategy.targetReturn || '0%'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col border-l border-slate-200 pl-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Max Drawdown</span>
                    <div className="flex items-center text-slate-900 font-bold">
                      <Scale size={14} className="mr-1 text-slate-400" />
                      <span>{strategy.maxDrawdown || '0%'}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleEdit(strategy)}
                  className="flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-primary transition-colors pr-2"
                >
                  <span>세부 명세 보기</span>
                  <ChevronRight size={14} />
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
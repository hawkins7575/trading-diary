import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/Layout/Sidebar'
import { Header } from '@/components/Layout/Header'
import { Footer } from '@/components/Layout/Footer'
import { Dashboard } from '@/components/Dashboard/Dashboard'
import { TradeList } from '@/components/Trades/TradeList'
import { JournalList } from '@/components/Journal/JournalList'
import { StrategyList } from '@/components/Strategies/StrategyList'
import { GoalList } from '@/components/Goals/GoalList'
import { PatternAnalysis } from '@/components/Analytics/PatternAnalysis'
import { HelpGuide } from '@/components/Help/HelpGuide'
import { FeedbackList } from '@/components/Feedback/FeedbackList'
import { LoginForm } from '@/components/Auth/LoginForm'
import { TermsOfService } from '@/components/Legal/TermsOfService'
import { PrivacyPolicy } from '@/components/Legal/PrivacyPolicy'
import { CookiePolicy } from '@/components/Legal/CookiePolicy'
import { CookieConsent } from '@/components/Legal/CookieConsent'
import { Modal, ConfirmModal, AlertModal } from '@/components/UI/Modal'
import { useConfirmModal, useAlertModal } from '@/hooks/useModal'
import { useTrades } from '@/hooks/useTrades'
import { useJournals } from '@/hooks/useJournals'
import { useStrategies } from '@/hooks/useStrategies'
import { useGoals } from '@/hooks/useGoals'
import { useFeedback } from '@/hooks/useFeedback'
import { useAuth } from '@/hooks/useAuth'
import { initializeSupabase, testSupabaseConnection } from '@/services/supabase'
import { TABS } from '@/constants'

function App() {
  // UI State
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [currentPage, setCurrentPage] = useState('main')
  
  // Auth hook
  const { 
    isLoggedIn, 
    user, 
    error: authError,
    handleLogin: authLogin,
    handleSignUp: authSignUp,
    handleLogout: authLogout,
    setError: setAuthError
  } = useAuth()
  
  // Data hooks
  const { trades, addTrade, updateTrade, deleteTrade, clearAllTrades } = useTrades()
  const { journals, addJournal, updateJournal, deleteJournal } = useJournals()
  const { strategies, addStrategy, updateStrategy, deleteStrategy } = useStrategies()
  const { goals, addGoal, updateGoal, deleteGoal, toggleGoalComplete } = useGoals()
  const { feedbacks, addFeedback, updateFeedback, deleteFeedback } = useFeedback()
  
  // Modal hooks
  const confirmModal = useConfirmModal()
  const alertModal = useAlertModal()

  // Initialize app
  useEffect(() => {
    // Initialize Supabase
    initializeSupabase()
    testSupabaseConnection()
  }, [])

  const handleLogin = () => {
    setShowLoginModal(true)
  }

  const handleLoginSubmit = async (event) => {
    const result = await authLogin(event)
    if (result?.success) {
      setShowLoginModal(false)
      setAuthError('')
      alertModal.alert({
        title: '로그인 완료',
        message: '성공적으로 로그인되었습니다.',
        type: 'success'
      })
    }
  }

  const handleSignUpSubmit = async (event) => {
    const result = await authSignUp(event)
    if (result?.success) {
      setShowLoginModal(false)
      setAuthError('')
      alertModal.alert({
        title: '회원가입 완료',
        message: result.message || '회원가입이 완료되었습니다.',
        type: 'success'
      })
    }
  }

  const handleLogout = async () => {
    const confirmed = await confirmModal.confirm({
      title: '로그아웃',
      message: '정말 로그아웃하시겠습니까?',
      confirmText: '로그아웃',
      cancelText: '취소'
    })

    if (confirmed) {
      authLogout()
      alertModal.alert({
        title: '로그아웃 완료',
        message: '성공적으로 로그아웃되었습니다.',
        type: 'success'
      })
    }
  }

  const handleClearAllData = () => {
    clearAllTrades()
    // Add other clear functions when implemented
  }

  const handleNavigateToLegal = (page) => {
    setCurrentPage(page)
  }

  const handleBackToMain = () => {
    setCurrentPage('main')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.DASHBOARD:
        return <Dashboard trades={trades} />
      
      case 'trades':
        return (
          <TradeList 
            trades={trades}
            onAddTrade={addTrade}
            onUpdateTrade={updateTrade}
            onDeleteTrade={deleteTrade}
            onClearAll={handleClearAllData}
          />
        )
      
      case TABS.JOURNAL:
        return (
          <JournalList 
            journals={journals}
            onAddJournal={addJournal}
            onUpdateJournal={updateJournal}
            onDeleteJournal={deleteJournal}
          />
        )
      
      case TABS.STRATEGIES:
        return (
          <StrategyList 
            strategies={strategies}
            onAddStrategy={addStrategy}
            onUpdateStrategy={updateStrategy}
            onDeleteStrategy={deleteStrategy}
          />
        )
      
      case TABS.GOALS:
        return (
          <GoalList 
            goals={goals}
            onAddGoal={addGoal}
            onUpdateGoal={updateGoal}
            onDeleteGoal={deleteGoal}
            onToggleComplete={toggleGoalComplete}
            trades={trades}
          />
        )
      
      case TABS.ANALYTICS:
        return <PatternAnalysis trades={trades} />
      
      case TABS.FEEDBACK:
        return (
          <FeedbackList 
            feedbacks={feedbacks}
            onAddFeedback={addFeedback}
            onUpdateFeedback={updateFeedback}
            onDeleteFeedback={deleteFeedback}
          />
        )
      
      case TABS.HELP:
        return <HelpGuide />
      
      default:
        return <Dashboard trades={trades} />
    }
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 'terms':
        return (
          <div>
            <button 
              onClick={handleBackToMain}
              className="mb-4 px-4 py-2 text-primary hover:bg-primary-light rounded-lg transition-colors"
            >
              ← 메인으로 돌아가기
            </button>
            <TermsOfService />
          </div>
        )
      case 'privacy':
        return (
          <div>
            <button 
              onClick={handleBackToMain}
              className="mb-4 px-4 py-2 text-primary hover:bg-primary-light rounded-lg transition-colors"
            >
              ← 메인으로 돌아가기
            </button>
            <PrivacyPolicy />
          </div>
        )
      case 'cookies':
        return (
          <div>
            <button 
              onClick={handleBackToMain}
              className="mb-4 px-4 py-2 text-primary hover:bg-primary-light rounded-lg transition-colors"
            >
              ← 메인으로 돌아가기
            </button>
            <CookiePolicy />
          </div>
        )
      default:
        return renderTabContent()
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {currentPage === 'main' && (
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}
      
      <div className="flex-1 flex flex-col">
        {currentPage === 'main' && (
          <Header 
            user={user}
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavigate={handleNavigateToLegal}
          />
        )}
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderPageContent()}
          </div>
        </main>

        {currentPage === 'main' && (
          <Footer onNavigate={handleNavigateToLegal} />
        )}
      </div>

      {/* Login Modal */}
      <Modal 
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false)
          setAuthError('')
        }}
        title=""
        size="md"
      >
        <LoginForm
          onLogin={handleLoginSubmit}
          onSignUp={handleSignUpSubmit}
          error={authError}
        />
      </Modal>

      {/* Global Modals */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.closeModal}
        title={confirmModal.confirmData.title}
        message={confirmModal.confirmData.message}
        onConfirm={confirmModal.confirmData.onConfirm}
        confirmText={confirmModal.confirmData.confirmText}
        cancelText={confirmModal.confirmData.cancelText}
      />

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={alertModal.closeModal}
        title={alertModal.alertData.title}
        message={alertModal.alertData.message}
        type={alertModal.alertData.type}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  )
}

export default App
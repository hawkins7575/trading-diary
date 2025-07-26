import React, { useState, useEffect } from 'react';

// 먼저 기본 앱부터 테스트
const SimpleApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Trading Diary
          </h1>
          <p className="text-gray-600 mb-8">
            코인 매매 일지 애플리케이션
          </p>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✓ React 앱이 정상적으로 실행되었습니다!
          </div>
        </div>
      </div>
    </div>
  );
};

const TradingDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 기존 final.html의 UI 구조를 여기에 통합
  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Coin Trading Diary
              </h1>
              <p className="text-gray-600 mb-8">
                개인 트레이딩 기록과 분석을 위한 플랫폼
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  로그인
                </button>
                <button
                  onClick={() => setShowSignUpForm(true)}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Trading Diary
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  안녕하세요, {user?.name}님
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 네비게이션 */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {['dashboard', 'trades', 'journal', 'analysis', 'strategies', 'goals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'dashboard' && '대시보드'}
                  {tab === 'trades' && '거래내역'}
                  {tab === 'journal' && '매매일지'}
                  {tab === 'analysis' && '분석'}
                  {tab === 'strategies' && '전략관리'}
                  {tab === 'goals' && '목표설정'}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* 메인 컨텐츠 */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {activeTab === 'dashboard' && <DashboardContent />}
            {activeTab === 'trades' && <TradesContent />}
            {activeTab === 'journal' && <JournalContent />}
            {activeTab === 'analysis' && <AnalysisContent />}
            {activeTab === 'strategies' && <StrategiesContent />}
            {activeTab === 'goals' && <GoalsContent />}
          </div>
        </main>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      
      {showLoginForm && (
        <LoginForm
          onToggleForm={() => {
            setShowLoginForm(false);
            setShowSignUpForm(true);
          }}
          onClose={() => setShowLoginForm(false)}
        />
      )}
      
      {showSignUpForm && (
        <SignUpForm
          onToggleForm={() => {
            setShowSignUpForm(false);
            setShowLoginForm(true);
          }}
          onClose={() => setShowSignUpForm(false)}
        />
      )}
    </>
  );
};

// 각 탭별 컨텐츠 컴포넌트들 (임시 구현)
const DashboardContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">대시보드</h2>
    <p className="text-gray-600">대시보드 컨텐츠가 여기에 표시됩니다.</p>
  </div>
);

const TradesContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">거래내역</h2>
    <p className="text-gray-600">거래내역이 여기에 표시됩니다.</p>
  </div>
);

const JournalContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">매매일지</h2>
    <p className="text-gray-600">매매일지가 여기에 표시됩니다.</p>
  </div>
);

const AnalysisContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">분석</h2>
    <p className="text-gray-600">분석 차트와 통계가 여기에 표시됩니다.</p>
  </div>
);

const StrategiesContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">전략관리</h2>
    <p className="text-gray-600">전략 관리 컨텐츠가 여기에 표시됩니다.</p>
  </div>
);

const GoalsContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">목표설정</h2>
    <p className="text-gray-600">목표 설정 컨텐츠가 여기에 표시됩니다.</p>
  </div>
);

const App = () => {
  return <SimpleApp />;
};

export default App;
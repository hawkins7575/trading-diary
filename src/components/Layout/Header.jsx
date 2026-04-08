import { useState } from 'react'
import { 
  User, 
  LogOut, 
  Settings, 
  FileText, 
  Bell, 
  Search, 
  ChevronDown, 
  Menu,
  LayoutDashboard,
  History,
  BookOpen,
  TrendingUp,
  Target,
  ShieldCheck
} from 'lucide-react'
import { TABS } from '@/constants'

export const Header = ({ 
  user, 
  isLoggedIn, 
  activeTab, 
  setActiveTab, 
  onLogin, 
  onLogout, 
  onNavigate, 
  onReset, 
  setIsMobileMenuOpen 
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLegalMenu, setShowLegalMenu] = useState(false)

  const tabItems = [
    { id: TABS.DASHBOARD, label: '통합 대시보드', icon: LayoutDashboard, mobileLabel: '대시보드' },
    { id: TABS.TRADES, label: '거래 히스토리', icon: History, mobileLabel: '히스토리' },
    { id: TABS.JOURNAL, label: '매매일지', icon: BookOpen, mobileLabel: '매매일지' },
    { id: TABS.ANALYTICS, label: '데이터 분석', icon: TrendingUp, mobileLabel: '분석' },
    { id: TABS.STRATEGIES, label: '매매 전략', icon: ShieldCheck, mobileLabel: '전략' },
    { id: TABS.GOALS, label: '재무 목표', icon: Target, mobileLabel: '목표' },
  ]

  const activeTabLabel = tabItems.find(item => item.id === activeTab)?.label || "통합 대시보드"

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60 shadow-sm transition-all duration-300 w-full max-w-full overflow-hidden">
      {/* Main Header Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>

            {/* Title / Logo Placeholder for Mobile if needed */}
            <h2 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight transition-all truncate max-w-[150px] sm:max-w-none">
              {activeTabLabel}
            </h2>
            
            {/* Desktop Dashboard Search */}
            <div className="relative hidden lg:block group">
              <div className="flex items-center space-x-2 bg-slate-100 rounded-xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                <Search size={16} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="거래 기록 검색..." 
                  className="bg-transparent border-none outline-none text-sm text-slate-700 w-64 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notifications */}
            <button className="p-2.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-all relative group">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
            </button>

            {/* Desktop Legal Pages Menu */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowLegalMenu(!showLegalMenu)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all text-slate-600 font-bold text-sm"
              >
                <span>정책</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${showLegalMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showLegalMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-premium border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => {
                      setShowLegalMenu(false)
                      onNavigate('terms')
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-[13px] font-semibold text-slate-600 flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <FileText size={16} />
                    </div>
                    <span>이용약관</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowLegalMenu(false)
                      onNavigate('privacy')
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-[13px] font-semibold text-slate-600 flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <ShieldCheck size={16} />
                    </div>
                    <span>개인정보 처리방침</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center p-1 rounded-full hover:bg-slate-50 md:pl-3 md:border md:border-transparent md:hover:border-slate-200 transition-all group"
                >
                  <div className="flex flex-col items-end hidden md:flex mr-3">
                    <span className="text-[13px] font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                      {user?.email?.split('@')[0] || 'Member'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Premium Plan</span>
                  </div>
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm transition-transform active:scale-95">
                    <User size={20} className="text-slate-600" />
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-premium border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-5 py-2 mb-2 border-b border-slate-50">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">나의 계정</p>
                    </div>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-4 w-full px-5 py-3 text-left hover:bg-slate-50 transition-colors text-[13px] font-bold text-slate-700"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                        <Settings size={16} />
                      </div>
                      <span>프로필 및 설정</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        onLogout()
                      }}
                      className="flex items-center space-x-4 w-full px-5 py-3 text-left hover:bg-red-50/50 transition-colors text-[13px] font-bold text-danger"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                        <LogOut size={16} />
                      </div>
                      <span>로그아웃</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onReset}
                  className="hidden sm:block text-slate-400 hover:text-slate-800 text-[13px] font-bold transition-colors"
                >
                  데이터 초기화
                </button>
                <button
                  onClick={onLogin}
                  className="bg-primary text-white px-5 py-2 rounded-xl font-bold text-[13px] shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  로그인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Chips (Horizontal Scroll) */}
      <div className="md:hidden border-t border-slate-50 bg-white/50 backdrop-blur-sm">
        <div className="overflow-x-auto no-scrollbar flex items-center space-x-3 px-4 py-3 scroll-smooth">
          {tabItems.map((item) => {
            const isActive = activeTab === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex items-center space-x-1.5 px-4 py-2 rounded-full whitespace-nowrap text-[13px] font-bold transition-all
                  ${isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/10 scale-105' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }
                `}
              >
                <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.mobileLabel}</span>
              </button>
            )
          })}
          {/* Spacer for ending padding */}
          <div className="min-w-[16px]"></div>
        </div>
      </div>
    </header>
  )
}


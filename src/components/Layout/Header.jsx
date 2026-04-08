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
    { id: TABS.DASHBOARD, label: '통합 대시보드', icon: LayoutDashboard, mobileLabel: 'Dashboard' },
    { id: TABS.TRADES, label: '거래 히스토리', icon: History, mobileLabel: 'History' },
    { id: TABS.JOURNAL, label: '매매일지', icon: BookOpen, mobileLabel: 'Journal' },
    { id: TABS.ANALYTICS, label: '분석', icon: TrendingUp, mobileLabel: 'Analytics' },
    { id: TABS.STRATEGIES, label: '매매전략', icon: ShieldCheck, mobileLabel: 'Strategy' },
    { id: TABS.GOALS, label: '목표', icon: Target, mobileLabel: 'Goals' },
  ]

  const activeTabItem = tabItems.find(item => item.id === activeTab)
  const activeTabLabel = activeTabItem?.label || "통합 대시보드"

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60 shadow-sm transition-all duration-300 w-full max-w-full overflow-hidden">
      {/* Main Header Line */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-18">
          <div className="flex items-center gap-3 lg:gap-8">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-2xl text-slate-900 bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all border border-slate-200/50"
            >
              <Menu size={20} strokeWidth={3} />
            </button>

            {/* Title / Logo Header */}
            <div className="flex flex-col">
               <h2 className="text-[15px] md:text-xl font-black text-slate-900 tracking-tight transition-all truncate max-w-[140px] sm:max-w-none leading-none">
                 {activeTabLabel}
               </h2>
               <p className="hidden md:block text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest leading-none">Perspective Studio</p>
            </div>
            
            {/* Desktop Dashboard Search */}
            <div className="relative hidden lg:block group ml-4">
              <div className="flex items-center space-x-3 bg-slate-100/50 rounded-2xl px-5 py-2.5 border border-transparent focus-within:border-slate-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-slate-100 transition-all">
                <Search size={16} className="text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <input 
                  type="text" 
                  placeholder="데이터 레코드 검색..." 
                  className="bg-transparent border-none outline-none text-[13px] text-slate-700 w-64 placeholder:text-slate-400 font-bold"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notifications */}
            <button className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all relative group border border-transparent hover:border-slate-100">
              <Bell size={20} strokeWidth={2.5} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block opacity-50" />

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center p-1 rounded-full hover:bg-slate-50 md:pl-3 md:border md:border-transparent md:hover:border-slate-100 transition-all group"
                >
                  <div className="flex flex-col items-end hidden md:flex mr-3">
                    <span className="text-[13px] font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">
                      {user?.email?.split('@')[0] || 'Member'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Analytic Pro</span>
                  </div>
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 shadow-md transition-transform active:scale-95 overflow-hidden">
                    <User size={20} className="text-white" />
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-3xl shadow-premium border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                    <div className="px-5 py-2 mb-2 border-b border-slate-50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Manager</p>
                    </div>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-4 w-full px-5 py-3 text-left hover:bg-slate-50 transition-colors text-[13px] font-black text-slate-700"
                    >
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <Settings size={18} />
                      </div>
                      <span>시스템 설정</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        onLogout()
                      }}
                      className="flex items-center space-x-4 w-full px-5 py-3 text-left hover:bg-rose-50/50 transition-colors text-[13px] font-black text-rose-600"
                    >
                      <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                        <LogOut size={18} />
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
                  className="hidden sm:block text-slate-400 hover:text-slate-800 text-[12px] font-black tracking-tight transition-colors"
                >
                  초기화
                </button>
                <button
                  onClick={onLogin}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-black text-[13px] shadow-xl shadow-slate-200 active:scale-95 transition-all"
                >
                  시작하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Chips: 프리미엄 다크 스타일로 통일 */}
      <div className="md:hidden border-t border-slate-50 bg-white/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar flex items-center space-x-2.5 px-4 py-3 scroll-smooth">
          {tabItems.map((item) => {
            const isActive = activeTab === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-2xl whitespace-nowrap text-[12px] font-black transition-all active:scale-95
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 ring-4 ring-slate-900/5' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }
                `}
              >
                <Icon size={14} strokeWidth={isActive ? 3 : 2.5} />
                <span className="tracking-tight">{item.mobileLabel}</span>
              </button>
            )
          })}
          <div className="min-w-[12px]"></div>
        </div>
      </div>
    </header>
  )
}
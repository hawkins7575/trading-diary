import { useState } from 'react'
import { User, LogOut, Settings, FileText, Bell, Search, ChevronDown } from 'lucide-react'

export const Header = ({ user, isLoggedIn, onLogin, onLogout, onNavigate }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLegalMenu, setShowLegalMenu] = useState(false)

  const activeTabName = "통합 대시보드" // This could be passed as a prop for dynamic title

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 py-4 border-b border-slate-200/60">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-8">
          <h2 className="text-lg font-bold text-slate-800 hidden md:block">{activeTabName}</h2>
          
          {/* Dashboard Search */}
          <div className="relative hidden lg:block bg-slate-100 rounded-xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
            <div className="flex items-center space-x-2">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="거래 기록 검색..." 
                className="bg-transparent border-none outline-none text-sm text-slate-700 w-64 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-5">
          {/* Notifications */}
          <button className="p-2 text-slate-500 hover:text-primary transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
          </button>

          {/* Legal Pages Menu */}
          <div className="relative">
            <button
              onClick={() => setShowLegalMenu(!showLegalMenu)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 font-medium text-sm"
            >
              <span className="">정책 및 약관</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${showLegalMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showLegalMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-premium border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => {
                    setShowLegalMenu(false)
                    onNavigate('terms')
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors text-sm text-slate-600 flex items-center space-x-2"
                >
                  <FileText size={16} />
                  <span>이용약관</span>
                </button>
                <button
                  onClick={() => {
                    setShowLegalMenu(false)
                    onNavigate('privacy')
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors text-sm text-slate-600 flex items-center space-x-2"
                >
                  <ShieldCheck size={16} />
                  <span>개인정보 처리방침</span>
                </button>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 mx-2" />

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-1 pl-3 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
              >
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {user?.email?.split('@')[0] || 'Member'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Standard Plan</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <User size={18} className="text-slate-600" />
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-premium border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 mb-2 border-b border-slate-50">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">계정 관리</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors text-sm text-slate-600"
                  >
                    <Settings size={16} />
                    <span>프로필 설정</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      onLogout()
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors text-sm text-danger"
                  >
                    <LogOut size={16} />
                    <span>로그아웃</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="btn-primary"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

const ShieldCheck = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)
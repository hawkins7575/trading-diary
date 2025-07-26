import { useState } from 'react'
import { User, LogOut, Settings, FileText } from 'lucide-react'

export const Header = ({ user, isLoggedIn, onLogin, onLogout, onNavigate }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLegalMenu, setShowLegalMenu] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="md:hidden" /> {/* Spacer for mobile menu button */}
        
        <div className="flex items-center space-x-4">
          {/* Legal Pages Menu */}
          <div className="relative">
            <button
              onClick={() => setShowLegalMenu(!showLegalMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            >
              <FileText size={18} />
              <span className="hidden sm:inline text-sm">약관</span>
            </button>
            
            {showLegalMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => {
                    setShowLegalMenu(false)
                    onNavigate('terms')
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm"
                >
                  이용약관
                </button>
                <button
                  onClick={() => {
                    setShowLegalMenu(false)
                    onNavigate('privacy')
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm"
                >
                  개인정보 처리방침
                </button>
                <button
                  onClick={() => {
                    setShowLegalMenu(false)
                    onNavigate('cookies')
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-sm"
                >
                  쿠키 정책
                </button>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm font-medium">
                  {user?.email || '사용자'}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      // Add settings functionality here
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                  >
                    <Settings size={16} />
                    <span>설정</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      onLogout()
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-red-600"
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
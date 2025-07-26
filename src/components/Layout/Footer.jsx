export const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear()

  const handleLegalPageClick = (page) => {
    onNavigate(page)
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 첫 번째 줄: 저작권 및 법적 링크 */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-xs text-gray-500">
            © {currentYear} Trading Diary. All rights reserved.
          </div>
          
          <div className="flex flex-wrap items-center space-x-4 text-xs">
            <button 
              onClick={() => handleLegalPageClick('terms')}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              이용약관
            </button>
            <button 
              onClick={() => handleLegalPageClick('privacy')}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              개인정보처리방침
            </button>
            <button 
              onClick={() => handleLegalPageClick('cookies')}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              쿠키정책
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('cookie-consent')
                window.location.reload()
              }}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              쿠키설정
            </button>
          </div>
        </div>
        
        {/* 두 번째 줄: 면책조항 */}
        <div className="border-t border-gray-200 mt-3 pt-3">
          <div className="text-xs text-gray-400 text-center">
            본 서비스는 투자 조언을 제공하지 않으며, 모든 투자 결정의 책임은 사용자에게 있습니다.
          </div>
        </div>
      </div>
    </footer>
  )
}
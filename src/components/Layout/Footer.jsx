export const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear()

  const handleLegalPageClick = (page) => {
    onNavigate(page)
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* 저작권 및 법적 링크 */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-xs text-gray-500 order-2 sm:order-1">
            © {currentYear} Trading Diary. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs order-1 sm:order-2">
            <button 
              onClick={() => handleLegalPageClick('terms')}
              className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              이용약관
            </button>
            <button 
              onClick={() => handleLegalPageClick('privacy')}
              className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              개인정보처리방침
            </button>
            <button 
              onClick={() => handleLegalPageClick('cookies')}
              className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              쿠키정책
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('cookie-consent')
                window.location.reload()
              }}
              className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              쿠키설정
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
export const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear()

  const handleLegalPageClick = (page) => {
    onNavigate(page)
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 서비스 정보 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Diary</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              개인 투자자를 위한 매매일지 및 거래 관리 서비스입니다. 
              체계적인 거래 기록으로 더 나은 투자 결과를 만들어보세요.
            </p>
            <div className="text-xs text-gray-500">
              © {currentYear} Trading Diary. All rights reserved.
            </div>
          </div>

          {/* 주요 기능 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">주요 기능</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 거래 내역 기록 및 관리</li>
              <li>• 매매일지 작성</li>
              <li>• 투자전략 수립</li>
              <li>• 목표 설정 및 추적</li>
              <li>• 거래 패턴 분석</li>
            </ul>
          </div>

          {/* 법적 정보 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">법적 정보</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLegalPageClick('terms')}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  이용약관
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLegalPageClick('privacy')}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  개인정보 처리방침
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLegalPageClick('cookies')}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  쿠키 정책
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    localStorage.removeItem('cookie-consent')
                    window.location.reload()
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  쿠키 설정
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 및 추가 정보 */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-500 mb-4 md:mb-0">
              본 서비스는 투자 조언을 제공하지 않으며, 모든 투자 결정의 책임은 사용자에게 있습니다.
            </div>
            <div className="text-xs text-gray-400">
              Made with ❤️ for better trading
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
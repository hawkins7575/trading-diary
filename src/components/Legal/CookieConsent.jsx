import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      advertising: true,
      date: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      advertising: false,
      date: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  const handleCustomize = () => {
    setShowDetails(!showDetails)
  }

  if (!isVisible) return null

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      
      {/* 쿠키 동의 모달 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transform transition-transform">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Cookie className="w-6 h-6 text-amber-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                쿠키 사용 동의
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Trading Diary는 서비스 개선과 맞춤형 광고 제공을 위해 쿠키를 사용합니다. 
                계속 사용하시면 쿠키 사용에 동의하는 것으로 간주됩니다.
              </p>

              {showDetails && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">필수 쿠키</h4>
                      <p className="text-xs text-gray-600">웹사이트 기본 기능에 필요한 쿠키입니다.</p>
                    </div>
                    <div className="text-green-600 text-sm font-medium">항상 활성화</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">분석 쿠키</h4>
                      <p className="text-xs text-gray-600">사이트 사용 통계 및 성능 개선을 위한 쿠키입니다.</p>
                    </div>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">광고 쿠키</h4>
                      <p className="text-xs text-gray-600">맞춤형 광고 제공을 위한 쿠키입니다.</p>
                    </div>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  모두 수락
                </button>
                
                <button
                  onClick={handleAcceptNecessary}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  필수만 수락
                </button>
                
                <button
                  onClick={handleCustomize}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {showDetails ? '간단히 보기' : '상세 설정'}
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export const CookiePolicy = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">쿠키 정책</h2>
        <p className="text-gray-600">최종 업데이트: 2024년 7월 26일</p>
      </div>

      <div className="metric-card p-8 max-w-4xl mx-auto">
        <div className="prose prose-gray max-w-none">
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">1. 쿠키란 무엇인가요?</h3>
            <p className="mb-4 leading-relaxed">
              쿠키는 웹사이트를 방문할 때 브라우저에 저장되는 작은 텍스트 파일입니다. 
              쿠키는 웹사이트가 사용자의 방문을 기억하고, 사용자 경험을 개선하며, 
              사이트 사용에 대한 정보를 수집하는 데 사용됩니다.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">2. Trading Diary에서 사용하는 쿠키</h3>
            
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-2 text-green-800">필수 쿠키 (항상 활성화)</h4>
                <p className="text-sm text-green-700 mb-3">
                  웹사이트의 기본 기능과 보안을 위해 반드시 필요한 쿠키입니다.
                </p>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• <strong>세션 관리:</strong> 로그인 상태 유지</li>
                  <li>• <strong>보안:</strong> CSRF 공격 방지</li>
                  <li>• <strong>설정 저장:</strong> 언어, 테마 등 사용자 설정</li>
                  <li>• <strong>기능 쿠키:</strong> 거래 데이터 임시 저장</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold mb-2 text-blue-800">분석 쿠키 (선택 사항)</h4>
                <p className="text-sm text-blue-700 mb-3">
                  웹사이트 사용 패턴을 분석하여 서비스를 개선하는 데 사용됩니다.
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Google Analytics:</strong> 방문자 통계 및 사용 패턴 분석</li>
                  <li>• <strong>페이지 조회수:</strong> 인기 기능 파악</li>
                  <li>• <strong>사용 시간:</strong> 서비스 이용 패턴 분석</li>
                  <li>• <strong>오류 추적:</strong> 기술적 문제 해결</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold mb-2 text-amber-800">광고 쿠키 (선택 사항)</h4>
                <p className="text-sm text-amber-700 mb-3">
                  맞춤형 광고 제공과 광고 효과 측정에 사용됩니다.
                </p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• <strong>Google AdSense:</strong> 관련성 높은 광고 표시</li>
                  <li>• <strong>광고 노출 빈도:</strong> 동일 광고 반복 제한</li>
                  <li>• <strong>광고 효과:</strong> 클릭률 및 전환율 측정</li>
                  <li>• <strong>관심사 기반 광고:</strong> 사용자 관심사에 맞는 광고</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">3. 쿠키 보존 기간</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">세션 쿠키</h4>
                  <p className="text-sm text-gray-600">브라우저 종료 시 자동 삭제</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">지속 쿠키</h4>
                  <p className="text-sm text-gray-600">설정된 만료일까지 유지 (최대 2년)</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                대부분의 쿠키는 30일~1년 간 보존되며, 사용자가 언제든지 삭제할 수 있습니다.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">4. 쿠키 관리 방법</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">사이트 내 설정</h4>
                <p className="text-sm text-gray-600 mb-2">
                  페이지 하단의 "쿠키 설정" 링크를 통해 언제든지 쿠키 사용을 변경할 수 있습니다.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">브라우저 설정</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Chrome:</strong> 설정 → 개인정보 보호 및 보안 → 쿠키 및 기타 사이트 데이터</li>
                    <li><strong>Firefox:</strong> 설정 → 개인 정보 보호 및 보안 → 쿠키 및 사이트 데이터</li>
                    <li><strong>Safari:</strong> 환경설정 → 개인정보 보호 → 쿠키 및 웹사이트 데이터</li>
                    <li><strong>Edge:</strong> 설정 → 쿠키 및 사이트 권한</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">5. 쿠키 비활성화의 영향</h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">필수 쿠키 비활성화 시</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 로그인 기능 사용 불가</li>
                  <li>• 거래 데이터 저장 및 불러오기 불가</li>
                  <li>• 사용자 설정 저장 불가</li>
                  <li>• 일부 보안 기능 작동 불가</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">분석 쿠키 비활성화 시</h4>
                <p className="text-sm text-blue-700">
                  서비스 이용에는 영향이 없으나, 서비스 개선을 위한 데이터 수집이 제한됩니다.
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-800 mb-2">광고 쿠키 비활성화 시</h4>
                <p className="text-sm text-amber-700">
                  광고는 계속 표시되지만, 개인 관심사와 관련성이 낮은 일반적인 광고가 노출됩니다.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">6. 제3자 쿠키</h3>
            <div className="space-y-3">
              <p className="leading-relaxed">
                Trading Diary는 서비스 개선과 광고 제공을 위해 다음과 같은 제3자 서비스를 이용합니다:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li><strong>Google Analytics:</strong> 웹사이트 분석 및 통계</li>
                  <li><strong>Google AdSense:</strong> 광고 서비스</li>
                  <li><strong>Vercel:</strong> 웹사이트 호스팅 및 성능 모니터링</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                각 제3자 서비스의 쿠키 정책은 해당 업체의 개인정보 처리방침을 참조하시기 바랍니다.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">7. 문의사항</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2 text-sm">
                쿠키 사용과 관련하여 문의사항이 있으시면 서비스 내 도움말 페이지를 통해 연락주시기 바랍니다.
              </p>
              <p className="text-xs text-gray-600">
                본 쿠키 정책은 관련 법령 및 정책 변경에 따라 수정될 수 있으며, 
                변경 시 웹사이트를 통해 공지하겠습니다.
              </p>
            </div>
          </section>

          <div className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold mb-2 text-amber-900">쿠키 사용 동의 관리</h4>
            <p className="text-sm text-amber-800 leading-relaxed mb-4">
              언제든지 쿠키 사용 설정을 변경하실 수 있습니다. 
              아래 버튼을 클릭하여 쿠키 설정을 다시 확인하거나 변경하세요.
            </p>
            <button 
              onClick={() => {
                localStorage.removeItem('cookie-consent')
                window.location.reload()
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
            >
              쿠키 설정 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
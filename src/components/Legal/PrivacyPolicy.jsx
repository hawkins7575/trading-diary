export const PrivacyPolicy = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">개인정보 처리방침</h2>
        <p className="text-gray-600">최종 업데이트: 2024년 7월 26일</p>
      </div>

      <div className="metric-card p-8 max-w-4xl mx-auto">
        <div className="prose prose-gray max-w-none">
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">1. 개인정보 처리 목적</h3>
            <p className="mb-4 leading-relaxed">
              Trading Diary(이하 "서비스")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>회원 가입 및 관리</li>
              <li>서비스 제공 및 개선</li>
              <li>거래 데이터 저장 및 관리</li>
              <li>고객 문의 및 민원 처리</li>
              <li>법령 및 약관 위반 행위 대응</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">2. 처리하는 개인정보의 항목</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">가. 필수항목</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>이메일 주소</li>
                  <li>비밀번호 (암호화 저장)</li>
                  <li>서비스 이용기록</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">나. 자동 수집 항목</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>IP 주소</li>
                  <li>쿠키 및 세션 정보</li>
                  <li>서비스 이용기록</li>
                  <li>기기 정보 (브라우저 종류, OS 등)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">다. 사용자 입력 데이터</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>거래 내역 및 금액 정보</li>
                  <li>매매일지 및 메모</li>
                  <li>투자전략 및 목표</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">3. 개인정보의 처리 및 보유기간</h3>
            <div className="space-y-3">
              <p>1. 개인정보는 수집・이용에 관한 동의일로부터 개인정보의 수집・이용목적을 달성할 때까지 보유・이용됩니다.</p>
              <p>2. 각 항목별 보유기간:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>회원정보:</strong> 회원 탈퇴 후 즉시 삭제 (단, 관련 법령에 따라 보존이 필요한 경우 해당 기간)</li>
                <li><strong>거래 데이터:</strong> 회원 탈퇴 또는 삭제 요청 시까지</li>
                <li><strong>로그 기록:</strong> 1년 (보안 및 서비스 개선 목적)</li>
                <li><strong>쿠키:</strong> 브라우저 설정에 따라 자동 삭제</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">4. 개인정보의 제3자 제공</h3>
            <div className="space-y-3">
              <p>서비스는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                <li>통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우 (특정 개인을 식별할 수 없는 형태)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">5. 개인정보 처리 위탁</h3>
            <div className="space-y-3">
              <p>서비스 향상을 위해 아래와 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>위탁받는 업체:</strong> Vercel Inc. (호스팅 서비스)</p>
                <p><strong>위탁업무 내용:</strong> 웹사이트 호스팅 및 운영</p>
                <p><strong>개인정보 보유기간:</strong> 서비스 종료 시 또는 위탁계약 종료 시까지</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p><strong>위탁받는 업체:</strong> Supabase Inc. (선택적)</p>
                <p><strong>위탁업무 내용:</strong> 데이터베이스 관리 및 백업</p>
                <p><strong>개인정보 보유기간:</strong> 회원 탈퇴 시 또는 위탁계약 종료 시까지</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">6. 정보주체의 권리・의무 및 행사방법</h3>
            <div className="space-y-3">
              <p>이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>개인정보 처리정지 요구권</li>
                <li>개인정보 열람요구권</li>
                <li>개인정보 정정・삭제요구권</li>
                <li>개인정보 처리정지 요구권</li>
              </ul>
              <p className="mt-4">
                위의 권리 행사는 서비스 내 설정 메뉴 또는 고객문의를 통해 요청하실 수 있으며, 지체 없이 조치하겠습니다.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">7. 개인정보의 파기</h3>
            <div className="space-y-3">
              <p>1. 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
              <p>2. 개인정보 파기의 절차 및 방법은 다음과 같습니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>파기절차:</strong> 파기 사유가 발생한 개인정보를 선정하고 개인정보보호책임자의 승인을 받아 파기</li>
                <li><strong>파기방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">8. 개인정보 보호를 위한 기술적・관리적 대책</h3>
            <div className="space-y-3">
              <p>서비스는 개인정보를 안전하게 처리하기 위하여 다음과 같은 보안조치를 하고 있습니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>비밀번호는 암호화하여 저장 및 관리</li>
                <li>HTTPS 프로토콜을 통한 안전한 데이터 전송</li>
                <li>정기적인 보안 업데이트 적용</li>
                <li>개인정보에 대한 접근권한 제한</li>
                <li>로그 기록 및 모니터링을 통한 비정상적 접근 탐지</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">9. 쿠키의 운영 및 거부</h3>
            <div className="space-y-3">
              <p>1. 서비스는 개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
              <p>2. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보입니다.</p>
              <p>3. 이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 브라우저 설정을 통해 쿠키를 거부할 수 있습니다.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">10. 개인정보보호책임자</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2"><strong>개인정보보호책임자:</strong> Trading Diary 운영팀</p>
              <p className="mb-2"><strong>연락처:</strong> 서비스 내 도움말 페이지 문의 기능 이용</p>
              <p className="text-sm text-gray-600">
                개인정보 처리와 관련된 문의사항이나 불만처리, 피해구제 등이 필요하신 경우 위 연락처로 문의하시기 바랍니다.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">11. 개인정보 처리방침 변경</h3>
            <p className="mb-4 leading-relaxed">
              이 개인정보처리방침은 2024년 7월 26일부터 적용됩니다. 개인정보 처리방침의 변경이 있는 경우 서비스 공지사항을 통해 공지하겠습니다.
            </p>
          </section>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2 text-blue-900">개인정보 관련 추가 안내</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              본 서비스는 개인의 투자 기록 관리를 위한 도구이며, 입력된 모든 데이터는 개인정보보호법에 따라 안전하게 보호됩니다. 
              투자와 관련된 민감한 정보이므로 더욱 엄격한 보안 조치를 적용하고 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
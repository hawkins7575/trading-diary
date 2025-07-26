export const TermsOfService = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">이용약관</h2>
        <p className="text-gray-600">최종 업데이트: 2024년 7월 26일</p>
      </div>

      <div className="metric-card p-8 max-w-4xl mx-auto">
        <div className="prose prose-gray max-w-none">
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제1조 (목적)</h3>
            <p className="mb-4 leading-relaxed">
              본 약관은 Trading Diary(이하 "서비스")를 이용함에 있어 이용자와 서비스 제공자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제2조 (정의)</h3>
            <div className="space-y-3">
              <p><strong>1. "서비스"</strong>란 Trading Diary 웹 애플리케이션 및 관련 서비스를 의미합니다.</p>
              <p><strong>2. "이용자"</strong>란 본 약관에 따라 서비스를 이용하는 개인을 의미합니다.</p>
              <p><strong>3. "거래 데이터"</strong>란 이용자가 서비스를 통해 입력, 저장하는 모든 매매 관련 정보를 의미합니다.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제3조 (약관의 효력 및 변경)</h3>
            <div className="space-y-3">
              <p>1. 본 약관은 서비스를 이용하는 모든 이용자에게 그 효력이 발생합니다.</p>
              <p>2. 약관의 변경이 있는 경우, 변경된 약관을 서비스 내에 공지하며, 이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제4조 (서비스의 제공)</h3>
            <div className="space-y-3">
              <p>1. 서비스는 다음과 같은 기능을 제공합니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>거래 내역 기록 및 관리</li>
                <li>매매일지 작성 및 보관</li>
                <li>투자전략 수립 및 관리</li>
                <li>목표 설정 및 진행률 추적</li>
                <li>거래 패턴 분석</li>
              </ul>
              <p>2. 서비스는 24시간 제공을 원칙으로 하나, 시스템 점검, 업데이트 등으로 인해 일시적으로 중단될 수 있습니다.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제5조 (이용자의 의무)</h3>
            <div className="space-y-3">
              <p>1. 이용자는 다음 행위를 하여서는 안 됩니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>타인의 개인정보를 도용하거나 허위 정보를 입력하는 행위</li>
                <li>서비스의 안정적 운영을 방해하는 행위</li>
                <li>다른 이용자에게 피해를 주는 행위</li>
                <li>법령에 위반되는 행위</li>
              </ul>
              <p>2. 이용자는 자신의 계정 정보를 안전하게 관리할 책임이 있습니다.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제6조 (개인정보 보호)</h3>
            <p className="mb-4 leading-relaxed">
              서비스는 이용자의 개인정보를 보호하기 위해 최선을 다하며, 개인정보 처리에 관한 자세한 내용은 별도의 개인정보 처리방침에서 정합니다.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제7조 (데이터 백업 및 보관)</h3>
            <div className="space-y-3">
              <p>1. 이용자는 자신의 거래 데이터에 대한 백업을 주기적으로 수행할 것을 권장합니다.</p>
              <p>2. 서비스 제공자는 기술적 문제로 인한 데이터 손실에 대해 책임을 지지 않습니다.</p>
              <p>3. 이용자가 서비스를 탈퇴하거나 장기간 미이용시 데이터가 삭제될 수 있습니다.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제8조 (서비스 이용의 제한)</h3>
            <div className="space-y-3">
              <p>1. 서비스 제공자는 다음의 경우 서비스 이용을 제한할 수 있습니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>본 약관을 위반한 경우</li>
                <li>서비스의 정상적 운영을 방해한 경우</li>
                <li>법령에 위반되는 행위를 한 경우</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제9조 (면책조항)</h3>
            <div className="space-y-3">
              <p>1. 서비스는 투자 조언을 제공하지 않으며, 이용자의 투자 결정 및 그 결과에 대해 책임지지 않습니다.</p>
              <p>2. 서비스는 이용자가 입력한 데이터의 정확성에 대해 보장하지 않습니다.</p>
              <p>3. 서비스 제공자는 천재지변, 정전, 네트워크 장애 등 불가항력으로 인한 서비스 중단에 대해 책임지지 않습니다.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제10조 (분쟁해결)</h3>
            <p className="mb-4 leading-relaxed">
              본 약관과 관련하여 발생한 분쟁은 대한민국 법령에 따라 해결하며, 관할법원은 서비스 제공자의 주소지를 관할하는 법원으로 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">제11조 (광고 및 제휴)</h3>
            <div className="space-y-3">
              <p>1. 서비스는 운영을 위해 광고를 게재할 수 있습니다.</p>
              <p>2. 이용자는 서비스 이용 중 표시되는 광고에 대해 동의한 것으로 간주됩니다.</p>
              <p>3. 광고주와의 거래에서 발생하는 문제에 대해서는 이용자와 광고주 간에 해결해야 합니다.</p>
            </div>
          </section>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">문의사항</h4>
            <p className="text-sm text-gray-600">
              본 약관과 관련하여 문의사항이 있으신 경우, 서비스 내 도움말 페이지를 통해 연락주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
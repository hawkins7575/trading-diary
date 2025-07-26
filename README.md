# Coin Trading Tracker

코인 거래 추적 및 분석을 위한 웹 애플리케이션입니다.

## 🚀 주요 기능

### 📊 대시보드
- 실시간 거래 통계 (총 수익, 총 거래 수, 승률, 평균 수익률)
- 투자금 대비 수익률 차트 (일/주/월간 토글)
- 동적 Y축 스케일링으로 데이터에 맞는 정확한 시각화

### 💰 거래내역 관리
- 거래 추가/수정/삭제
- 입금, 출금, 잔고, 수익 관리
- 메모 기능으로 거래 내용 기록
- 모바일 반응형 카드 형태 표시

### 📝 매매일지
- 캘린더 형태의 직관적인 일지 관리
- 날짜별 매매 기록 작성
- 일지 목록 보기 지원
- 심플하고 균형잡힌 캘린더 디자인

### 📈 분석 도구
- 거래 현황 분석 (파이 차트)
- 월별 수익 현황 (바 차트)
- 주요 지표 대시보드
- 시각적 데이터 표현

### 🎯 매매전략 관리
- 전략 등록 및 관리
- 위험도 설정 (낮음/보통/높음)
- 전략별 규칙 및 설명 기록

### 🏆 목표설정
- 목표 금액 및 승률 설정
- 마감일 관리
- 목표 달성 현황 추적

## 🛠 기술 스택

- **Frontend**: React 18 (UMD 빌드)
- **Styling**: Tailwind CSS
- **Charts**: 커스텀 SVG 차트 (Recharts 대신)
- **Data Storage**: localStorage
- **Build**: 단일 HTML 파일

## 📱 반응형 디자인

### 모바일 최적화
- 하단 탭 네비게이션
- 카드 형태 데이터 표시
- 터치 친화적 인터페이스
- 컴팩트한 레이아웃

### 데스크톱
- 사이드바 네비게이션
- 테이블 형태 데이터 표시
- 넓은 화면 활용

## 🎨 디자인 시스템

### 색상 팔레트
```css
:root {
  --background: #f5f7fa;    /* 배경색 */
  --foreground: #1a2238;    /* 텍스트 */
  --card: #e3eaf2;          /* 카드 배경 */
  --primary: #3a5ba0;       /* 주 색상 */
  --secondary: #f7c873;     /* 보조 색상 */
  --accent: #6ea3c1;        /* 강조 색상 */
}
```

### 폰트 크기 체계
- `text-xs` (12px): 작은 텍스트, 버튼
- `text-sm` (14px): 본문 텍스트, 테이블 데이터
- `text-base` (16px): 일반 텍스트
- `text-lg` (18px): 소제목
- `text-xl` (20px): 페이지 제목

## 🔧 설치 및 실행

1. 파일 다운로드
```bash
git clone [repository-url]
cd claude-coin
```

2. 웹 서버에서 실행
```bash
# 간단한 HTTP 서버
python -m http.server 8000
# 또는
npx serve .
```

3. 브라우저에서 접속
```
http://localhost:8000/final.html
```

## 📁 프로젝트 구조

```
claude-coin/
├── final.html          # 메인 애플리케이션
├── test.html           # React 기능 테스트
├── simple.html         # 간단한 데모 버전
├── working.html        # 개발 중 백업
└── README.md           # 개발 문서
```

## 💾 데이터 구조

### 거래 데이터
```javascript
{
  id: string,
  date: string,        // YYYY-MM-DD
  entry: number,       // 입금액
  withdrawal: number,  // 출금액
  balance: number,     // 잔고
  profit: number,      // 수익
  memo: string        // 메모
}
```

### 일지 데이터
```javascript
{
  id: string,
  date: string,        // YYYY-MM-DD
  content: string,     // 일지 내용
  createdAt: string   // 생성일시
}
```

### 전략 데이터
```javascript
{
  id: string,
  name: string,        // 전략명
  description: string, // 설명
  rules: string,       // 규칙
  riskLevel: string,   // 위험도 (low/medium/high)
  createdAt: string   // 생성일시
}
```

### 목표 데이터
```javascript
{
  id: string,
  title: string,       // 목표명
  targetAmount: number,// 목표 금액
  targetWinRate: number,// 목표 승률
  deadline: string,    // 마감일
  description: string, // 설명
  createdAt: string   // 생성일시
}
```

## 🔄 상태 관리

React의 `useState` 훅을 사용한 컴포넌트 레벨 상태 관리:

- `activeTab`: 현재 활성 탭
- `trades`: 거래 데이터 배열
- `journals`: 일지 데이터 배열
- `strategies`: 전략 데이터 배열
- `goals`: 목표 데이터 배열
- `isLoggedIn`: 로그인 상태
- `currentMonth`: 캘린더 현재 월
- `selectedDate`: 선택된 날짜
- `chartPeriod`: 차트 기간 (daily/weekly/monthly)

## 📊 차트 시스템

### 투자 수익률 차트
- 커스텀 SVG 기반 구현
- 동적 Y축 스케일링
- 데이터 범위에 따른 자동 조정
- 부드러운 애니메이션 효과

### 차트 기능
- 일간/주간/월간 토글
- 호버 효과
- 반응형 디자인
- 실시간 데이터 업데이트

## 🔐 보안 고려사항

- 클라이언트 사이드 전용 (서버 없음)
- localStorage 사용으로 데이터 로컬 저장
- 민감한 정보 암호화 없음 (개발 목적)
- HTTPS 사용 권장

## 🐛 알려진 이슈

1. **브라우저 호환성**: IE 지원 안함
2. **데이터 백업**: localStorage 의존으로 브라우저 데이터 삭제 시 손실
3. **동시 접근**: 멀티 탭 사용 시 데이터 동기화 문제 가능

## 🔮 향후 개발 계획

- [ ] 서버 사이드 구현
- [ ] 데이터베이스 연동
- [ ] 사용자 계정 시스템
- [ ] 데이터 내보내기/가져오기
- [ ] 더 많은 차트 유형
- [ ] 알림 시스템
- [ ] PWA 지원

## 🤝 기여 방법

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 라이선스

MIT License - 자유롭게 사용 가능합니다.

## 📞 지원

문제가 있거나 개선 사항이 있다면 이슈를 생성해 주세요.

---

**개발 환경**: Claude Code  
**최종 업데이트**: 2025년 1월  
**버전**: 1.0.0
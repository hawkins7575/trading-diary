# Trading Diary 개발 계획서

## 1. 프로젝트 개요
- **프로젝트명**: Trading Diary (코인 매매 일지 및 거래 분석 도구)
- **목적**: 암호화폐 투자자들이 자신의 매매 기록을 체계적으로 관리하고, 전략 및 목표를 설정하여 객관적인 투자 성과 분석을 할 수 있도록 돕는 웹 서비스.
- **타겟 사용자**: 코인 트레이딩을 하며 매매 복기와 수익률 관리가 필요한 개인 투자자.

## 2. 기술 스택 (Tech Stack)
- **Frontend**: React (Vite), JavaScript (JSX)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend/DB**: Supabase (PostgreSQL, Authentication)
- **Hosting/Deployment**: Vercel

## 3. 주요 기능 (Key Features)

### 3.1. 매매 일지 (Journal)
- **기능**: 날짜별 매매 내역 및 감정 상태(기분) 기록
- **세부 항목**: 날짜, 오늘의 기분(5단계), 일지 내용 작성 (최대 1000자)
- **특징**: 그날의 심리 상태와 매매 결과를 함께 복기할 수 있는 환경 제공

### 3.2. 매매 전략 (Strategy)
- **기능**: 트레이딩 전략 수립 및 리스크 관리 규칙 명문화
- **세부 항목**: 전략명, 리스크 수준(낮음/보통/높음), 매수/매도 조건, 리스크 관리 방법, 목표 수익률, 최대 손실폭(Max Drawdown)

### 3.3. 목표 관리 (Goals)
- **기능**: 트레이딩 목표 설정 및 달성 여부 추적
- **세부 항목**: 목표명, 목표 수익 금액, 목표 승률, 달성 기한, 상세 설명

### 3.4. 데이터 동기화 및 인증
- **로컬 모드**: 로그인 없이 브라우저(Local Storage 등)에 데이터 임시 저장
- **클라우드 모드**: Supabase 연동을 통한 클라우드 데이터 동기화 및 계정 관리

## 4. 데이터베이스 스키마 설계 (Supabase)
- **users**: 사용자 정보 및 인증
- **journals**: `id`, `user_id`, `date`, `mood`, `content`, `created_at`
- **strategies**: `id`, `user_id`, `name`, `risk_level`, `timeframe`, `buy_conditions`, `sell_conditions`, `risk_management`, `target_return`, `max_drawdown`
- **goals**: `id`, `user_id`, `title`, `target_amount`, `target_win_rate`, `deadline`, `description`

## 5. 단계별 개발 마일스톤 (Milestones)

### Phase 1: 프로젝트 초기 세팅 및 기획 (완료)
- [x] Vite + React 프로젝트 생성
- [x] Tailwind CSS 세팅 및 글로벌 스타일(`globals.css`) 정의
- [x] Supabase 프로젝트 생성 및 기본 설정 가이드(`SUPABASE-SETUP.md`) 작성
- [x] SEO 최적화 메타 태그 및 구조화된 데이터(`index.html`) 적용

### Phase 2: UI/UX 컴포넌트 개발 (진행 중)
- [x] 공통 모달 컴포넌트(`ConfirmModal`, `AlertModal`) 구현
- [x] 매매 일지 관리 UI (`JournalList`, `JournalForm`) 구현
- [x] 매매 전략 관리 UI (`StrategyList`, `StrategyForm`) 구현
- [x] 목표 관리 UI (`GoalForm` 등) 구현
- [ ] 대시보드(Dashboard) 메인 화면 UI 구현
- [ ] 반응형 웹(Mobile/Tablet/PC) 레이아웃 최적화

### Phase 3: 비즈니스 로직 및 상태 관리 적용
- [ ] Context API 또는 Zustand 등을 활용한 전역 상태 관리 도입
- [ ] 로컬 스토리지 기반의 CRUD 로직 구현 (로컬 모드)
- [ ] 입력 폼 유효성 검사 고도화

### Phase 4: Supabase 백엔드 연동
- [ ] Supabase Client 설정 (`.env` 환경변수 적용)
- [ ] Auth(이메일/소셜 로그인) 기능 구현
- [ ] Supabase Database(PostgreSQL) CRUD API 연동 (클라우드 모드)
- [ ] RLS (Row Level Security) 정책 적용하여 사용자별 데이터 격리

### Phase 5: 고급 기능 및 차트 연동
- [ ] 승률, 누적 수익금, 자산 추이 시각화 (Recharts 또는 Chart.js 도입)
- [ ] 거래 내역 CSV Export/Import 기능

### Phase 6: QA 및 프로덕션 배포
- [ ] Vercel을 통한 프로덕션 자동 배포 파이프라인(CI/CD) 구축
- [ ] 크로스 브라우징 및 버그 테스트

## 6. 향후 개선 사항 (Future Works)
- 암호화폐 거래소 API (Upbit, Binance 등) 연동을 통한 자동 거래 내역 수집 기능
- 매매 패턴을 분석해주는 AI 리포트 기능 도입 제안
# Convex 데이터베이스 설정 가이드

이 프로젝트는 Convex 실시간 데이터베이스를 사용하여 사용자 인증과 데이터 저장을 구현합니다.

## 1. Convex 설정

### 1-1. Convex 계정 생성 및 프로젝트 생성
1. https://www.convex.dev/ 방문
2. 계정 생성 (GitHub 계정으로 로그인 권장)
3. 새 프로젝트 생성

### 1-2. 로컬 개발 환경 설정 (로그인 없이)
```bash
# 개발 환경 시작 (처음 실행 시 프로젝트 생성)
npx convex dev

# 프롬프트에서:
# 1. 프로젝트 이름: trading-diary 입력
# 2. 새 프로젝트 생성 선택
# 3. 팀은 기본값 사용
```

### 1-3. 환경 변수 설정
`npx convex dev` 실행 후 생성되는 URL을 `.env.local` 파일에 추가:
```
REACT_APP_CONVEX_URL=https://your-deployment-url.convex.cloud
```

## 2. 프로젝트 구조

```
/Users/gimdaeseong/claude coin/
├── convex/                 # Convex 백엔드 함수들
│   ├── _generated/         # 자동 생성된 타입 정의
│   ├── schema.ts          # 데이터베이스 스키마
│   ├── auth.ts            # 사용자 인증
│   ├── trades.ts          # 거래 관리
│   ├── journals.ts        # 매매일지
│   ├── strategies.ts      # 전략 관리
│   └── goals.ts          # 목표 설정
├── src/                   # React 프론트엔드
│   ├── App.jsx           # 메인 애플리케이션
│   ├── AuthContext.jsx   # 인증 컨텍스트
│   ├── AuthForms.jsx     # 로그인/회원가입 폼
│   ├── index.jsx         # 앱 진입점
│   └── index.css         # 스타일
├── convex.json           # Convex 설정
├── tsconfig.json         # TypeScript 설정
└── package.json          # 의존성 및 스크립트
```

## 3. 데이터베이스 스키마

### Users 테이블
- email: 사용자 이메일 (고유)
- name: 사용자 이름
- passwordHash: 암호화된 비밀번호
- createdAt, updatedAt: 생성/수정 시간

### Trades 테이블
- userId: 사용자 ID (외래키)
- coin: 코인 종류
- type: 거래 유형 (buy/sell)
- amount, price, total: 거래 금액 정보
- date: 거래 날짜

### Journals, Strategies, Goals 테이블
- 각각 사용자별 매매일지, 전략, 목표 데이터 저장

## 4. 개발 실행

```bash
# 동시에 Vite 개발 서버와 Convex 개발 환경 실행
npm run dev

# 또는 개별 실행
npm run convex:dev  # Convex 백엔드만
npx vite           # React 프론트엔드만
```

## 5. 배포

```bash
# Convex 프로덕션 배포
npm run convex:deploy

# React 앱 빌드
npm run build
```

## 6. 보안 주의사항

- 현재 비밀번호는 간단한 해싱만 적용됨
- 프로덕션 환경에서는 bcrypt 등 강력한 해싱 사용 권장
- 환경 변수 파일 (.env.local)은 버전 관리에 포함되지 않도록 설정됨

## 7. 다음 단계

1. `npx convex dev` 실행하여 Convex 프로젝트 설정
2. 생성된 URL을 `.env.local`에 추가
3. `npm run dev`로 개발 서버 시작
4. 브라우저에서 http://localhost:3000 접속
5. 회원가입/로그인 테스트
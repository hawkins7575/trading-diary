# 🚀 Trading Diary 배포 가이드

## GitHub Pages 배포하기

### 1단계: GitHub Pages 활성화
1. https://github.com/hawkins7575/trading-diary 접속
2. Settings 탭 클릭
3. 왼쪽 메뉴에서 "Pages" 클릭
4. Source를 "Deploy from a branch" 선택
5. Branch를 "main" 선택
6. 폴더는 "/ (root)" 선택
7. Save 버튼 클릭

### 2단계: 배포 확인
- 배포 URL: https://hawkins7575.github.io/trading-diary/
- 메인 앱: https://hawkins7575.github.io/trading-diary/production-app.html

### 3단계: 도메인 설정 (선택사항)
Settings > Pages에서 Custom domain 설정 가능

---

## 배포된 파일들

### 🎯 메인 앱
- **production-app.html** - GitHub Pages 최종 배포 버전
  - Convex 데이터베이스 자동 연결 시도
  - 실패 시 로컬 저장소 모드로 자동 전환
  - 완전한 회원가입/로그인 시스템

### 🔧 개발 버전들
- **convex-ready.html** - Convex 연결 완료 버전
- **fixed-app.html** - 라이브러리 문제 해결 버전
- **final.html** - 기존 완성 버전

### 📚 백엔드
- **convex/** - 완전한 Convex 데이터베이스 스키마
  - 사용자 인증 (auth.ts)
  - 거래 관리 (trades.ts)
  - 매매일지 (journals.ts)
  - 전략 관리 (strategies.ts)
  - 목표 설정 (goals.ts)

---

## 기능 설명

### ✨ 회원가입/로그인
- 이름, 이메일, 비밀번호로 계정 생성
- 안전한 비밀번호 검증 (6자 이상)
- 세션 유지 및 자동 로그인
- 로그아웃 기능

### 💾 데이터 저장
**두 가지 모드로 동작:**

1. **Convex 모드** (프로덕션)
   - 실시간 데이터베이스 연결
   - 모든 기기에서 동일한 데이터
   - 사용자 간 완전한 데이터 분리

2. **로컬 저장소 모드** (GitHub Pages)
   - 브라우저 로컬 저장소 사용
   - 각 사용자별 개별 데이터
   - 네트워크 연결 불필요

### 🎨 UI/UX
- 완전한 반응형 디자인
- Apple 스타일 클린한 인터페이스
- 모바일 친화적
- 다크/라이트 테마 대응

---

## 사용 방법

1. **접속**: https://hawkins7575.github.io/trading-diary/production-app.html
2. **회원가입**: 이름, 이메일, 비밀번호 입력
3. **로그인**: 등록한 이메일/비밀번호로 로그인
4. **이용**: 개인 매매일지 작성 및 관리

---

## 기술 스택

- **Frontend**: React 18, TailwindCSS
- **Backend**: Convex 실시간 데이터베이스
- **Authentication**: 커스텀 인증 시스템
- **Deployment**: GitHub Pages
- **호환성**: 모든 모던 브라우저

---

## 다음 단계

완성된 기본 시스템에 다음 기능들을 추가할 수 있습니다:

- [ ] 거래 내역 관리 UI
- [ ] 매매일지 캘린더 
- [ ] 통계 및 차트 분석
- [ ] 목표 설정 및 추적
- [ ] 데이터 내보내기
- [ ] 알림 시스템

---

🎉 **축하합니다!** 완전한 멀티유저 Trading Diary가 성공적으로 배포되었습니다!
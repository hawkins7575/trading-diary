# 🤝 기여 가이드

Coin Trading Tracker 프로젝트에 기여해 주셔서 감사합니다! 

## 🚀 빠른 시작

1. **저장소 포크**
   ```bash
   # GitHub에서 Fork 버튼 클릭
   ```

2. **로컬에 클론**
   ```bash
   git clone https://github.com/YOUR_USERNAME/coin-trading-tracker.git
   cd coin-trading-tracker
   ```

3. **새 브랜치 생성**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **변경사항 커밋**
   ```bash
   git commit -m "✨ Add amazing feature"
   ```

5. **브랜치 푸시**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Pull Request 생성**
   - GitHub에서 Pull Request 생성
   - 변경사항에 대한 설명 작성

## 📋 기여 가이드라인

### 🐛 버그 리포트
- **이슈 템플릿** 사용
- **재현 단계** 명확히 기술
- **예상 동작**과 **실제 동작** 구분
- **환경 정보** 포함 (브라우저, OS 등)

### ✨ 기능 제안
- **이슈 템플릿** 사용
- **사용 사례** 설명
- **대안** 고려사항 포함
- **구현 아이디어** 제시 (선택사항)

### 💻 코드 기여

#### 코딩 스타일
- **React Hooks** 패턴 사용
- **Tailwind CSS** 클래스 활용
- **일관된 네이밍** 규칙 준수
- **주석**은 필요한 경우에만 추가

#### 커밋 메시지 규칙
```
<타입>(<범위>): <설명>

[선택사항: 본문]

[선택사항: 푸터]
```

**타입:**
- ✨ `feat`: 새로운 기능
- 🐛 `fix`: 버그 수정
- 📚 `docs`: 문서 변경
- 💎 `style`: 코드 포맷팅
- ♻️ `refactor`: 리팩토링
- ⚡ `perf`: 성능 개선
- ✅ `test`: 테스트 추가/수정
- 🔧 `chore`: 빌드/설정 변경

**예시:**
```
✨ feat(dashboard): add real-time profit chart

- SVG 기반 커스텀 차트 구현
- 동적 Y축 스케일링 추가
- 일/주/월간 토글 기능

Closes #123
```

### 🔍 코드 리뷰

#### 리뷰어 가이드라인
- **건설적인 피드백** 제공
- **구체적인 개선 제안** 포함
- **칭찬**도 잊지 말기

#### 작성자 가이드라인
- **피드백 수용적** 자세
- **질문 환영**
- **변경사항 설명** 충분히 제공

## 📱 개발 환경 설정

### 로컬 서버 실행
```bash
# Python
python -m http.server 8000

# Node.js
npx serve . -p 8000

# Live Server (VS Code)
# Live Server 확장 설치 후 우클릭 → "Open with Live Server"
```

### 테스트
```bash
# HTML 유효성 검사
tidy -q -e index.html

# 접근성 테스트
# Lighthouse 또는 axe-core 사용 권장
```

## 🎨 디자인 가이드라인

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

### 반응형 브레이크포인트
```css
/* Tailwind CSS 기준 */
sm: 640px   /* 모바일 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 대형 화면 */
```

## 📚 문서 기여

### 문서 타입
- **README.md**: 프로젝트 개요
- **API_DOCUMENTATION.md**: 기술 문서
- **DEPLOYMENT_GUIDE.md**: 배포 가이드
- **CONTRIBUTING.md**: 기여 가이드

### 문서 작성 규칙
- **명확하고 간결한** 설명
- **실행 가능한 예제** 포함
- **스크린샷** 활용 (필요시)
- **목차** 구성

## 🏷️ 이슈 라벨

| 라벨 | 설명 |
|------|------|
| `bug` | 버그 수정 |
| `enhancement` | 기능 개선 |
| `feature` | 새 기능 |
| `documentation` | 문서 개선 |
| `good first issue` | 초보자 환영 |
| `help wanted` | 도움 필요 |
| `question` | 질문 |
| `wontfix` | 수정하지 않음 |

## 🎯 우선순위 기여 영역

### 🔥 높은 우선순위
- [ ] **서버 사이드 구현** (Node.js/Express)
- [ ] **데이터베이스 연동** (MongoDB/PostgreSQL)
- [ ] **사용자 인증** 시스템
- [ ] **데이터 백업/복원** 기능

### ⭐ 중간 우선순위
- [ ] **더 많은 차트 타입** 추가
- [ ] **알림 시스템** 구현
- [ ] **다크 모드** 지원
- [ ] **PWA** 기능 추가

### 💡 낮은 우선순위
- [ ] **다국어 지원** (i18n)
- [ ] **테마 커스터마이징**
- [ ] **플러그인 시스템**
- [ ] **API 연동** (실제 거래소)

## 📞 커뮤니티

### 소통 채널
- **GitHub Issues**: 버그 리포트, 기능 제안
- **GitHub Discussions**: 일반적인 질문, 아이디어 공유
- **Pull Requests**: 코드 리뷰, 기술적 논의

### 행동 강령
- **존중**하는 태도 유지
- **건설적인** 피드백 제공
- **포용적인** 환경 조성
- **협력적인** 문제 해결

## 🙏 감사인사

모든 기여자분들께 진심으로 감사드립니다! 

### 기여자 목록
<!-- 자동으로 업데이트됩니다 -->
- [@yourusername](https://github.com/yourusername) - 프로젝트 생성자

---

**문의사항이 있으시면 언제든 이슈를 생성해 주세요!** 🚀
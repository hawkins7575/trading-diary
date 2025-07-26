# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인
4. "New project" 클릭
5. 프로젝트 설정:
   - **이름**: `trading-diary`
   - **데이터베이스 비밀번호**: 안전한 비밀번호 설정
   - **리전**: Asia Pacific (ap-northeast-1) - 서울 근처
   - **요금제**: Free (무료)

## 2. 데이터베이스 스키마 설정

1. Supabase 대시보드에서 **SQL Editor** 클릭
2. `supabase-schema.sql` 파일 내용을 복사
3. SQL 에디터에 붙여넣기
4. **Run** 버튼 클릭해서 실행

## 3. 프로젝트 설정값 확인

Supabase 대시보드에서 **Settings** → **API** 페이지로 이동:

- **Project URL**: `https://your-project-id.supabase.co`
- **anon public key**: `eyJ...` (긴 JWT 토큰)

## 4. 코드에 설정값 적용

`index.html` 파일에서 다음 부분을 찾아서 수정:

```javascript
// TODO: 실제 Supabase 프로젝트 설정값으로 교체 필요
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";
```

실제 값으로 교체:

```javascript
const SUPABASE_URL = "https://abcdefghijk.supabase.co"; // 실제 Project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs..."; // 실제 anon public key
```

## 5. 인증 설정 (선택사항)

**Authentication** → **Settings**에서:

- **Email confirmations**: 비활성화 (개발용)
- **Secure email change**: 비활성화 (개발용)

## 6. 테스트

1. 변경된 코드를 Git에 커밋하고 Vercel에 배포
2. 사이트에서 "클라우드 동기화" 클릭
3. 회원가입 테스트
4. 거래 데이터 입력 후 Supabase 대시보드에서 데이터 확인

## 완료!

이제 다음과 같이 동작합니다:

- **로컬 모드**: 로그인 없이 브라우저에만 저장
- **클라우드 모드**: Supabase 계정으로 어디서든 접근 가능

## 문제 해결

### Supabase 연결 실패 시:
1. 브라우저 콘솔에서 "Supabase loaded: true" 확인
2. Project URL과 API Key가 정확한지 확인
3. RLS 정책이 올바르게 설정되었는지 확인

### 데이터가 보이지 않을 때:
1. Supabase 대시보드 → **Table Editor**에서 데이터 확인
2. 브라우저 콘솔에서 오류 메시지 확인
3. 로그아웃 후 다시 로그인 시도
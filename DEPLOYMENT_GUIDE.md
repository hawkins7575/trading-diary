# 배포 가이드

## 🚀 배포 옵션

### 1. 정적 웹 호스팅 (권장)

#### GitHub Pages
1. GitHub 저장소 생성
2. `final.html`을 `index.html`로 이름 변경
3. 저장소 Settings > Pages에서 배포 설정

```bash
git add .
git commit -m "Deploy coin tracker"
git push origin main
```

#### Netlify
1. [Netlify](https://netlify.com) 계정 생성
2. 프로젝트 폴더를 드래그 앤 드롭
3. 자동으로 배포 완료

#### Vercel
1. [Vercel](https://vercel.com) 계정 생성  
2. GitHub 저장소 연결
3. 자동 배포 설정

### 2. 웹 서버 호스팅

#### Apache
```apache
# .htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^$ final.html [L]
    RewriteRule ^([^/]+)/?$ final.html [L,QSA]
</IfModule>
```

#### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/coin-tracker;
    index final.html;
    
    location / {
        try_files $uri $uri/ /final.html;
    }
}
```

## 🔧 로컬 개발 서버

### Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Node.js 서버
```bash
# serve 패키지 설치
npm install -g serve

# 서버 실행
serve . -p 8000
```

### PHP 내장 서버
```bash
php -S localhost:8000
```

### Live Server (VS Code)
1. Live Server 확장 설치
2. `final.html` 우클릭 → "Open with Live Server"

## 🌐 도메인 설정

### DNS 설정 예시
```
Type    Name    Value                TTL
A       @       192.168.1.100       300
CNAME   www     your-domain.com      300
```

### SSL 인증서 (Let's Encrypt)
```bash
# Certbot 설치
sudo apt install certbot python3-certbot-nginx

# 인증서 생성
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 📦 빌드 최적화

### HTML 압축
```bash
# html-minifier 설치
npm install -g html-minifier

# HTML 압축
html-minifier --collapse-whitespace --remove-comments \
  --remove-optional-tags --remove-redundant-attributes \
  --remove-script-type-attributes --remove-tag-whitespace \
  --use-short-doctype --minify-css true --minify-js true \
  final.html -o final.min.html
```

### Gzip 압축 설정

#### Apache
```apache
# .htaccess
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

#### Nginx
```nginx
gzip on;
gzip_types text/html text/css application/javascript;
gzip_min_length 1000;
```

## 🔐 보안 설정

### HTTPS 강제 리다이렉트

#### Apache
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### 보안 헤더 설정
```apache
# Apache .htaccess
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
```

```nginx
# Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

## 📊 성능 최적화

### 캐시 설정

#### Apache
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

#### Nginx
```nginx
location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, immutable";
}

location ~* \.(css|js)$ {
    expires 1M;
    add_header Cache-Control "public, immutable";
}
```

### CDN 설정 (선택사항)
외부 라이브러리를 CDN으로 변경:

```html
<!-- React -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
```

## 🔍 모니터링 설정

### Google Analytics 추가
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 에러 모니터링 (Sentry)
```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production'
  });
</script>
```

## 🚀 Docker 배포

### Dockerfile
```dockerfile
FROM nginx:alpine

# 앱 파일 복사
COPY final.html /usr/share/nginx/html/index.html
COPY . /usr/share/nginx/html/

# Nginx 설정
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  coin-tracker:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
    environment:
      - NODE_ENV=production
```

### 빌드 및 실행
```bash
# 이미지 빌드
docker build -t coin-tracker .

# 컨테이너 실행
docker run -d -p 80:80 --name coin-tracker coin-tracker

# Docker Compose 사용
docker-compose up -d
```

## 🔄 CI/CD 파이프라인

### GitHub Actions
`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Optimize HTML
      run: |
        npm install -g html-minifier
        html-minifier --collapse-whitespace final.html -o index.html
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 📋 배포 체크리스트

### 배포 전 확인사항
- [ ] 모든 기능 테스트 완료
- [ ] 반응형 디자인 확인
- [ ] 브라우저 호환성 테스트
- [ ] 성능 최적화 적용
- [ ] 보안 설정 확인
- [ ] 에러 핸들링 구현

### 배포 후 확인사항
- [ ] 사이트 접속 확인
- [ ] HTTPS 동작 확인
- [ ] 모바일 접속 테스트
- [ ] 기능별 동작 테스트
- [ ] 성능 모니터링 확인
- [ ] 에러 로그 확인

## 🔧 문제 해결

### 자주 발생하는 문제들

1. **CORS 에러**
   - 로컬에서만 발생, 웹 서버에서는 문제없음
   - 해결: HTTP 서버 사용

2. **localStorage 초기화**
   - 브라우저 설정에서 사이트 데이터 삭제
   - 해결: 데이터 백업/복원 기능 구현

3. **모바일 레이아웃 깨짐**
   - viewport 메타태그 확인
   - 해결: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

4. **차트 렌더링 오류**
   - 브라우저 호환성 문제
   - 해결: 폴백 UI 제공

## 📞 지원

배포 중 문제가 발생하면:

1. 브라우저 개발자 도구 콘솔 확인
2. 네트워크 탭에서 리소스 로딩 확인
3. 웹 서버 로그 확인
4. 이슈 생성 및 문의

---

**참고**: 이 애플리케이션은 클라이언트 사이드 앱으로, 별도의 서버나 데이터베이스가 필요하지 않습니다.
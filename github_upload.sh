#!/bin/bash

# GitHub 업로드 스크립트
# 사용법: ./github_upload.sh [GitHub_Username] [Repository_Name] [GitHub_Token]

set -e

GITHUB_USERNAME=$1
REPO_NAME=$2
GITHUB_TOKEN=$3

if [ -z "$GITHUB_USERNAME" ] || [ -z "$REPO_NAME" ]; then
    echo "사용법: $0 <GitHub_Username> <Repository_Name> [GitHub_Token]"
    echo ""
    echo "예시: $0 john-doe coin-trading-tracker"
    echo ""
    echo "GitHub Token이 없으면 public 저장소로 생성됩니다."
    exit 1
fi

echo "🚀 GitHub 저장소 생성 및 업로드 시작..."
echo "📋 사용자: $GITHUB_USERNAME"
echo "📋 저장소: $REPO_NAME"
echo ""

# 1. 저장소 생성 (GitHub API 사용)
if [ -n "$GITHUB_TOKEN" ]; then
    echo "🔧 GitHub API를 사용하여 저장소 생성 중..."
    
    REPO_DATA='{
        "name": "'$REPO_NAME'",
        "description": "📊 실시간 코인 거래 추적 및 분석을 위한 현대적인 웹 애플리케이션",
        "private": false,
        "has_issues": true,
        "has_projects": true,
        "has_wiki": true,
        "auto_init": false
    }'
    
    curl -s -H "Authorization: token $GITHUB_TOKEN" \
         -H "Accept: application/vnd.github.v3+json" \
         -X POST \
         https://api.github.com/user/repos \
         -d "$REPO_DATA" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ 저장소 생성 완료!"
    else
        echo "⚠️  저장소 생성 실패 (이미 존재하거나 권한 문제)"
    fi
else
    echo "⚠️  GitHub Token이 없습니다. 수동으로 저장소를 생성해주세요:"
    echo "   https://github.com/new"
    echo ""
    read -p "저장소를 생성했으면 Enter를 눌러주세요..."
fi

# 2. Git 원격 저장소 설정
echo "🔗 Git 원격 저장소 연결 중..."

# 기존 origin 제거 (있다면)
git remote remove origin 2>/dev/null || true

# 새로운 origin 추가
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# 3. 업로드
echo "⬆️  파일 업로드 중..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 업로드 완료!"
    echo "🌐 저장소 URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "🚀 GitHub Pages: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
    echo ""
    echo "📋 다음 단계:"
    echo "1. GitHub 저장소의 Settings > Pages에서 GitHub Actions 활성화"
    echo "2. 몇 분 후 GitHub Pages URL에서 사이트 확인"
else
    echo "❌ 업로드 실패"
    echo ""
    echo "🔧 해결 방법:"
    echo "1. GitHub 사용자명과 저장소명을 확인하세요"
    echo "2. 저장소가 실제로 생성되었는지 확인하세요"
    echo "3. 인터넷 연결을 확인하세요"
fi
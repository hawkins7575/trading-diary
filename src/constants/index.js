export const TRADE_TAGS = {
  success: [
    '계획대로_실행',
    '인내심',
    '리스크_관리',
    '적절한_손절',
    '적절한_익절',
    '정보_분석',
    '시장_타이밍'
  ],
  failure: [
    '조급함',
    '감정_거래',
    '손절_늦음',
    '익절_빠름',
    '과매수',
    '과매도',
    '정보_부족',
    '타이밍_실수'
  ]
}

export const TRADE_CHECKLIST = {
  '손절선_설정': '손절선을 미리 설정했나요?',
  '포지션_사이즈': '적절한 포지션 사이즈인가요?',
  '시장_분석': '시장 상황을 충분히 분석했나요?',
  '뉴스_확인': '관련 뉴스나 이벤트를 확인했나요?',
  '기술적_분석': '기술적 분석을 했나요?',
  '자금_관리': '자금 관리 계획이 있나요?',
  '감정_상태': '냉정한 상태에서 거래하나요?',
  '목표_수익률': '목표 수익률을 정했나요?'
}

export const EMOTION_OPTIONS = [
  '매우_확신',
  '확신',
  '보통',
  '불안',
  '매우_불안'
]

export const TABS = {
  DASHBOARD: 'dashboard',
  JOURNAL: 'journal',
  STRATEGIES: 'strategies',
  GOALS: 'goals',
  ANALYTICS: 'analytics',
  HELP: 'help'
}

export const CHART_PERIODS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
}

export const LOCAL_STORAGE_KEYS = {
  TRADES: 'trading-diary-trades',
  JOURNALS: 'trading-diary-journals',
  STRATEGIES: 'trading-diary-strategies',
  GOALS: 'trading-diary-goals',
  AUTH: 'trading-diary-auth'
}
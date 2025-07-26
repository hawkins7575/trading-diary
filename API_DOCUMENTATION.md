# API 문서

## 개요

Coin Trading Tracker는 클라이언트 사이드 애플리케이션으로, localStorage를 사용하여 데이터를 관리합니다. 이 문서는 내부 함수들과 데이터 조작 방법을 설명합니다.

## 🔧 핵심 함수들

### 데이터 관리 함수

#### `formatCurrency(amount)`
통화 형식으로 숫자를 포맷팅합니다.

```javascript
formatCurrency(1000000); // "₩1,000,000"
formatCurrency(-50000);  // "-₩50,000"
```

#### `formatDateForJournal(date)`
Date 객체를 YYYY-MM-DD 형식으로 변환합니다.

```javascript
formatDateForJournal(new Date()); // "2025-01-25"
```

#### `generateId()`
고유한 ID를 생성합니다.

```javascript
generateId(); // "id_1737123456789_random"
```

### 거래 데이터 함수

#### `handleSaveTrade()`
새로운 거래를 저장하거나 기존 거래를 수정합니다.

**동작 과정:**
1. 폼 데이터 검증
2. 거래 객체 생성/수정
3. localStorage에 저장
4. 상태 업데이트
5. 폼 초기화

#### `handleEditTrade(trade)`
거래 수정 모드로 전환합니다.

```javascript
handleEditTrade({
  id: "trade_123",
  date: "2025-01-25",
  entry: 100000,
  withdrawal: 0,
  balance: 100000,
  profit: 0,
  memo: "첫 거래"
});
```

#### `handleDeleteTrade(tradeId)`
거래를 삭제합니다.

```javascript
handleDeleteTrade("trade_123");
```

### 통계 계산 함수

#### `calculateStats()`
전체 거래 통계를 계산합니다.

**반환값:**
```javascript
{
  totalProfit: number,    // 총 수익
  totalTrades: number,    // 총 거래 수
  winRate: number,        // 승률 (%)
  avgReturn: number       // 평균 수익률 (%)
}
```

#### `generateChartData()`
차트용 데이터를 생성합니다.

**반환값:**
```javascript
[
  {
    date: string,         // 날짜
    profitRate: number,   // 수익률 (%)
    profit: number,       // 누적 수익
    investment: number    // 누적 투자금
  }
]
```

### 일지 관리 함수

#### `handleSaveJournalEntry()`
일지 항목을 저장합니다.

#### `hasJournalEntry(date)`
특정 날짜에 일지가 있는지 확인합니다.

```javascript
hasJournalEntry(new Date(2025, 0, 25)); // true/false
```

### 전략 관리 함수

#### `handleSaveStrategy()`
매매 전략을 저장합니다.

#### `handleDeleteStrategy(strategyId)`
전략을 삭제합니다.

### 목표 관리 함수

#### `handleSaveGoal()`
목표를 저장합니다.

#### `handleDeleteGoal(goalId)`
목표를 삭제합니다.

## 💾 데이터 저장소

### localStorage 키

| 키 | 설명 | 형식 |
|---|---|---|
| `coinTracker_trades` | 거래 데이터 | JSON Array |
| `coinTracker_journals` | 일지 데이터 | JSON Array |
| `coinTracker_strategies` | 전략 데이터 | JSON Array |
| `coinTracker_goals` | 목표 데이터 | JSON Array |
| `coinTracker_user` | 사용자 정보 | JSON Object |

### 데이터 초기화

```javascript
// 모든 데이터 삭제
localStorage.removeItem('coinTracker_trades');
localStorage.removeItem('coinTracker_journals');
localStorage.removeItem('coinTracker_strategies');
localStorage.removeItem('coinTracker_goals');
localStorage.removeItem('coinTracker_user');
```

## 📊 차트 API

### `getDaysInMonth(date)`
특정 월의 일수를 반환합니다.

```javascript
getDaysInMonth(new Date(2025, 0)); // [Date objects for January 2025]
```

### 차트 데이터 구조

#### 수익률 차트
```javascript
{
  date: "1월 25일",        // 표시용 날짜
  profitRate: 5.2,         // 수익률 (%)
  profit: 52000,          // 누적 수익 (원)
  investment: 1000000     // 누적 투자금 (원)
}
```

#### 거래 현황 파이 차트
```javascript
[
  { name: "수익", value: 15, color: "#10b981" },
  { name: "손실", value: 5, color: "#ef4444" }
]
```

## 🔄 상태 관리

### React 상태 구조

```javascript
// 메인 상태들
const [activeTab, setActiveTab] = useState('dashboard');
const [trades, setTrades] = useState([]);
const [journals, setJournals] = useState([]);
const [strategies, setStrategies] = useState([]);
const [goals, setGoals] = useState([]);

// UI 상태들
const [showTradeForm, setShowTradeForm] = useState(false);
const [showJournalForm, setShowJournalForm] = useState(false);
const [currentMonth, setCurrentMonth] = useState(new Date());
const [selectedDate, setSelectedDate] = useState('');
const [chartPeriod, setChartPeriod] = useState('daily');

// 편집 상태들
const [editingTrade, setEditingTrade] = useState(null);
const [currentTrade, setCurrentTrade] = useState(initialTradeState);
const [journalEntry, setJournalEntry] = useState('');
```

## 🎯 이벤트 핸들러

### 폼 제출 핸들러

```javascript
// 거래 폼 제출
const handleSaveTrade = () => {
  const tradeData = {
    id: editingTrade?.id || generateId(),
    date: currentTrade.date,
    entry: parseFloat(currentTrade.entry) || 0,
    withdrawal: parseFloat(currentTrade.withdrawal) || 0,
    balance: parseFloat(currentTrade.balance) || 0,
    profit: parseFloat(currentTrade.profit) || 0,
    memo: currentTrade.memo
  };
  
  // 저장 로직...
};
```

### 탭 전환 핸들러

```javascript
const handleTabChange = (tabId) => {
  setActiveTab(tabId);
  // 필요시 추가 상태 초기화
};
```

## 🔍 검색 및 필터링

### 거래 필터링
```javascript
// 수익 거래만 필터링
const profitTrades = trades.filter(trade => trade.profit > 0);

// 특정 기간 거래 필터링
const thisMonthTrades = trades.filter(trade => {
  const tradeDate = new Date(trade.date);
  const now = new Date();
  return tradeDate.getMonth() === now.getMonth() &&
         tradeDate.getFullYear() === now.getFullYear();
});
```

### 일지 검색
```javascript
// 키워드로 일지 검색
const searchJournals = (keyword) => {
  return journals.filter(journal => 
    journal.content.toLowerCase().includes(keyword.toLowerCase())
  );
};
```

## 🔐 데이터 검증

### 거래 데이터 검증
```javascript
const validateTrade = (trade) => {
  const errors = [];
  
  if (!trade.date) errors.push('날짜는 필수입니다');
  if (trade.entry < 0) errors.push('입금액은 0 이상이어야 합니다');
  if (trade.withdrawal < 0) errors.push('출금액은 0 이상이어야 합니다');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

## 📱 반응형 유틸리티

### 모바일 감지
```javascript
const isMobile = () => {
  return window.innerWidth < 768;
};
```

### 화면 크기별 처리
```javascript
const getGridCols = () => {
  const width = window.innerWidth;
  if (width < 640) return 1;      // sm
  if (width < 1024) return 2;     // md
  return 4;                       // lg
};
```

## 🔄 데이터 동기화

### localStorage 동기화
```javascript
const syncToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Storage sync failed:', error);
    return false;
  }
};

const loadFromStorage = (key, defaultValue = []) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Storage load failed:', error);
    return defaultValue;
  }
};
```

## 🚨 에러 처리

### 기본 에러 핸들러
```javascript
const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  // 사용자에게 알림 표시
  alert(`오류가 발생했습니다: ${error.message}`);
};
```

## 🔧 개발자 도구

### 디버깅 함수들
```javascript
// 브라우저 콘솔에서 사용 가능
window.debugTracker = {
  getTrades: () => JSON.parse(localStorage.getItem('coinTracker_trades') || '[]'),
  getJournals: () => JSON.parse(localStorage.getItem('coinTracker_journals') || '[]'),
  clearAll: () => {
    localStorage.removeItem('coinTracker_trades');
    localStorage.removeItem('coinTracker_journals');
    localStorage.removeItem('coinTracker_strategies');
    localStorage.removeItem('coinTracker_goals');
    window.location.reload();
  }
};
```

사용 예:
```javascript
// 콘솔에서
debugTracker.getTrades();    // 모든 거래 조회
debugTracker.clearAll();     // 모든 데이터 삭제
```
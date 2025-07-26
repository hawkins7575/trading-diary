// Number formatting utilities
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
};

export const formatNumber = (number, decimals = 2) => {
  return parseFloat(number).toFixed(decimals);
};

export const formatPercentage = (rate) => {
  return `${parseFloat(rate).toFixed(2)}%`;
};

// Date formatting utilities
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR');
};

export const isThisWeek = (dateString) => {
  const tradeDate = new Date(dateString);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return tradeDate >= weekAgo;
};

// Trade validation utilities
export const validateTrade = (trade) => {
  const errors = {};
  
  if (!trade.date) {
    errors.date = '날짜를 입력해주세요';
  }
  
  if (!trade.balance || parseFloat(trade.balance) < 0) {
    errors.balance = '올바른 잔고를 입력해주세요';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatDate,
  isThisWeek,
  validateTrade
};
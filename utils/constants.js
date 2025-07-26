// Trading constants
export const QUICK_AMOUNTS = [10000, 50000, 100000, 500000, 1000000];

export const MONTHLY_TARGET = 1000000;
export const WEEKLY_TARGET = 250000;

export const FILTER_TYPES = {
  ALL: 'all',
  PROFIT: 'profit',
  LOSS: 'loss',
  THIS_WEEK: 'thisWeek',
  LARGE: 'large'
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const CHART_COLORS = {
  PRIMARY: '#10B981',
  SECONDARY: '#3B82F6',
  SUCCESS: '#22C55E',
  ERROR: '#EF4444',
  WARNING: '#F59E0B'
};

export default {
  QUICK_AMOUNTS,
  MONTHLY_TARGET,
  WEEKLY_TARGET,
  FILTER_TYPES,
  TOAST_TYPES,
  CHART_COLORS
};
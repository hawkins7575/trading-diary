export const calculateProfit = (trade, prevBalance = 0) => {
  const currentBalance = parseFloat(trade.balance || 0)
  const entry = parseFloat(trade.entry || 0)
  const withdrawal = parseFloat(trade.withdrawal || 0)
  const baseBalance = prevBalance || parseFloat(trade.seed || 0)
  
  return currentBalance - (baseBalance + entry - withdrawal)
}

export const recalculateProfits = (trades) => {
  if (!trades || trades.length === 0) return []
  
  // Sort by date
  const sorted = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  return sorted.map((trade, index) => {
    const prevBalance = index > 0 ? parseFloat(sorted[index - 1].balance || 0) : 0
    const profit = calculateProfit(trade, prevBalance)
    return { ...trade, profit }
  })
}

export const calculateWinRate = (trades) => {
  if (!trades.length) return 0
  
  const profitTrades = trades.filter(trade => {
    return (trade.profit || 0) > 0
  })
  
  return Math.round((profitTrades.length / trades.length) * 100)
}

export const calculateTotalProfit = (trades) => {
  return trades.reduce((total, trade) => {
    return total + (trade.profit || 0)
  }, 0)
}

export const calculateAverageProfit = (trades) => {
  if (!trades.length) return 0
  return calculateTotalProfit(trades) / trades.length
}

export const getTradesByPeriod = (trades, period = 'daily') => {
  const now = new Date()
  const periodStart = new Date()
  
  switch (period) {
    case 'weekly':
      periodStart.setDate(now.getDate() - 7)
      break
    case 'monthly':
      periodStart.setMonth(now.getMonth() - 1)
      break
    default: // daily
      periodStart.setDate(now.getDate() - 1)
  }
  
  return trades.filter(trade => new Date(trade.date) >= periodStart)
}

export const formatCurrency = (amount, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return formatter.format(amount)
}

export const formatPercentage = (value, decimals = 1) => {
  if (value === undefined || value === null) return '0%'
  return `${value.toFixed(decimals)}%`
}

// 최고 수익 거래 찾기
export const getMaxProfit = (trades) => {
  if (!trades.length) return 0
  const profits = trades.map(trade => trade.profit || 0).filter(p => p > 0)
  return profits.length > 0 ? Math.max(...profits) : 0
}

// 최고 손실 거래 찾기
export const getMaxLoss = (trades) => {
  if (!trades.length) return 0
  const losses = trades.map(trade => trade.profit || 0).filter(p => p < 0)
  return losses.length > 0 ? Math.min(...losses) : 0
}

// 연승 횟수 계산
export const getMaxWinStreak = (trades) => {
  if (!trades.length) return 0
  
  let maxStreak = 0
  let currentStreak = 0
  
  // 날짜순으로 정렬
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  for (const trade of sortedTrades) {
    const profit = trade.profit || 0
    if (profit > 0) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  }
  
  return maxStreak
}

// 연패 횟수 계산
export const getMaxLossStreak = (trades) => {
  if (!trades.length) return 0
  
  let maxStreak = 0
  let currentStreak = 0
  
  // 날짜순으로 정렬
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  for (const trade of sortedTrades) {
    const profit = trade.profit || 0
    if (profit < 0) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  }
  
  return maxStreak
}

// 월별 수익률 계산
export const getMonthlyReturns = (trades) => {
  if (!trades.length) return []
  
  const monthlyData = {}
  
  trades.forEach(trade => {
    const date = new Date(trade.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        profit: 0,
        trades: 0,
        wins: 0
      }
    }
    
    const profit = trade.profit || 0
    monthlyData[monthKey].profit += profit
    monthlyData[monthKey].trades++
    if (profit > 0) monthlyData[monthKey].wins++
  })
  
  return Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(data => ({
      ...data,
      winRate: data.trades > 0 ? (data.wins / data.trades) * 100 : 0,
      avgProfit: data.trades > 0 ? data.profit / data.trades : 0
    }))
}

// 수익 분포 계산
export const getProfitDistribution = (trades) => {
  if (!trades.length) return { ranges: [], stats: {} }
  
  const profits = trades.map(trade => trade.profit || 0)
  const ranges = [
    { label: '-$500 이하', min: -Infinity, max: -500, count: 0 },
    { label: '-$500 ~ -$100', min: -500, max: -100, count: 0 },
    { label: '-$100 ~ -$10', min: -100, max: -10, count: 0 },
    { label: '-$10 ~ $0', min: -10, max: 0, count: 0 },
    { label: '$0 ~ $10', min: 0, max: 10, count: 0 },
    { label: '$10 ~ $100', min: 10, max: 100, count: 0 },
    { label: '$100 ~ $500', min: 100, max: 500, count: 0 },
    { label: '$500 이상', min: 500, max: Infinity, count: 0 }
  ]
  
  profits.forEach(profit => {
    ranges.forEach(range => {
      if (profit > range.min && profit <= range.max) {
        range.count++
      }
    })
  })
  
  const totalProfitTrades = profits.filter(p => p > 0).length
  const totalLossTrades = profits.filter(p => p < 0).length
  
  return {
    ranges: ranges.filter(range => range.count > 0),
    stats: {
      totalProfitTrades,
      totalLossTrades,
      profitTradeRatio: trades.length > 0 ? (totalProfitTrades / trades.length) * 100 : 0
    }
  }
}

// 목표 달성률 계산 (예: 월 목표 수익 대비)
export const calculateGoalAchievement = (trades, monthlyGoal = 1000) => {
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM 형식
  
  const currentMonthTrades = trades.filter(trade => {
    return trade.date.startsWith(currentMonth)
  })
  
  const currentMonthProfit = calculateTotalProfit(currentMonthTrades)
  const achievementRate = monthlyGoal > 0 ? (currentMonthProfit / monthlyGoal) * 100 : 0
  
  return {
    currentMonthProfit,
    monthlyGoal,
    achievementRate,
    tradesCount: currentMonthTrades.length
  }
}

// 거래 빈도 분석
export const getTradingFrequency = (trades) => {
  if (!trades.length) return { dailyAvg: 0, weeklyAvg: 0, monthlyAvg: 0 }
  
  const dates = trades.map(trade => trade.date).sort()
  const firstDate = new Date(dates[0])
  const lastDate = new Date(dates[dates.length - 1])
  
  const diffTime = Math.abs(lastDate - firstDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
  
  return {
    dailyAvg: trades.length / diffDays,
    weeklyAvg: (trades.length / diffDays) * 7,
    monthlyAvg: (trades.length / diffDays) * 30
  }
}

// 거래 시간대 분석 (시간이 있는 경우)
export const getTradingTimeAnalysis = (trades) => {
  const timeSlots = {
    morning: 0,   // 06:00 - 12:00
    afternoon: 0, // 12:00 - 18:00
    evening: 0,   // 18:00 - 24:00
    night: 0      // 00:00 - 06:00
  }
  
  trades.forEach(trade => {
    if (trade.time) {
      const hour = parseInt(trade.time.split(':')[0])
      if (hour >= 6 && hour < 12) timeSlots.morning++
      else if (hour >= 12 && hour < 18) timeSlots.afternoon++
      else if (hour >= 18 && hour < 24) timeSlots.evening++
      else timeSlots.night++
    }
  })
  
  const total = Object.values(timeSlots).reduce((sum, count) => sum + count, 0)
  
  return {
    slots: timeSlots,
    percentages: {
      morning: total > 0 ? (timeSlots.morning / total) * 100 : 0,
      afternoon: total > 0 ? (timeSlots.afternoon / total) * 100 : 0,
      evening: total > 0 ? (timeSlots.evening / total) * 100 : 0,
      night: total > 0 ? (timeSlots.night / total) * 100 : 0
    }
  }
}
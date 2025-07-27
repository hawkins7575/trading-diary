export const calculateProfit = (entry, withdrawal) => {
  const entryAmount = parseFloat(entry) || 0
  const withdrawalAmount = parseFloat(withdrawal) || 0
  return withdrawalAmount - entryAmount
}

export const calculateWinRate = (trades) => {
  if (!trades.length) return 0
  
  const profitTrades = trades.filter(trade => {
    const profit = calculateProfit(trade.entry, trade.withdrawal)
    return profit > 0
  })
  
  return Math.round((profitTrades.length / trades.length) * 100)
}

export const calculateTotalProfit = (trades) => {
  return trades.reduce((total, trade) => {
    return total + calculateProfit(trade.entry, trade.withdrawal)
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

export const formatCurrency = (amount, currency = 'KRW') => {
  const formatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: currency,
  })
  return formatter.format(amount)
}

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`
}

// 최고 수익 거래 찾기
export const getMaxProfit = (trades) => {
  if (!trades.length) return 0
  
  const profits = trades.map(trade => calculateProfit(trade.entry, trade.withdrawal))
  return Math.max(...profits)
}

// 최고 손실 거래 찾기
export const getMaxLoss = (trades) => {
  if (!trades.length) return 0
  
  const profits = trades.map(trade => calculateProfit(trade.entry, trade.withdrawal))
  return Math.min(...profits)
}

// 연승 횟수 계산
export const getMaxWinStreak = (trades) => {
  if (!trades.length) return 0
  
  let maxStreak = 0
  let currentStreak = 0
  
  // 날짜순으로 정렬
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  for (const trade of sortedTrades) {
    const profit = calculateProfit(trade.entry, trade.withdrawal)
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
    const profit = calculateProfit(trade.entry, trade.withdrawal)
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
    
    const profit = calculateProfit(trade.entry, trade.withdrawal)
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
  
  const profits = trades.map(trade => calculateProfit(trade.entry, trade.withdrawal))
  const ranges = [
    { label: '-50만원 이하', min: -Infinity, max: -500000, count: 0 },
    { label: '-50만원 ~ -10만원', min: -500000, max: -100000, count: 0 },
    { label: '-10만원 ~ -1만원', min: -100000, max: -10000, count: 0 },
    { label: '-1만원 ~ 0원', min: -10000, max: 0, count: 0 },
    { label: '0원 ~ 1만원', min: 0, max: 10000, count: 0 },
    { label: '1만원 ~ 10만원', min: 10000, max: 100000, count: 0 },
    { label: '10만원 ~ 50만원', min: 100000, max: 500000, count: 0 },
    { label: '50만원 이상', min: 500000, max: Infinity, count: 0 }
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
export const calculateGoalAchievement = (trades, monthlyGoal = 1000000) => {
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
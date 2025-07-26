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
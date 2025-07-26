import { useState, useEffect } from 'react'
import { getTrades, setTrades } from '@/utils/storage'
import { calculateProfit } from '@/utils/calculations'

export const useTrades = () => {
  const [trades, setTradesState] = useState([])

  useEffect(() => {
    const savedTrades = getTrades()
    if (savedTrades.length === 0) {
      // 샘플 데이터
      const sampleTrades = [
        {
          id: 1,
          date: '2024-01-15',
          entry: '100000',
          withdrawal: '110000',
          balance: '1110000',
          memo: '비트코인 단기 매매',
          tags: ['계획대로_실행', '적절한_익절'],
          checklist: {
            '손절선_설정': true,
            '포지션_사이즈': true,
            '시장_분석': true,
            '감정_상태': true
          },
          emotion: '확신',
          confidence: 8
        },
        {
          id: 2,
          date: '2024-01-16',
          entry: '50000',
          withdrawal: '45000',
          balance: '1105000',
          memo: '이더리움 손절',
          tags: ['손절_늦음', '감정_거래'],
          checklist: {
            '손절선_설정': false,
            '감정_상태': false
          },
          emotion: '불안',
          confidence: 4
        }
      ]
      setTradesState(sampleTrades)
      setTrades(sampleTrades)
    } else {
      setTradesState(savedTrades)
    }
  }, [])

  const addTrade = (trade) => {
    const newTrade = {
      ...trade,
      id: Date.now(),
      profit: calculateProfit(trade.entry, trade.withdrawal)
    }
    const updatedTrades = [...trades, newTrade]
    setTradesState(updatedTrades)
    setTrades(updatedTrades)
  }

  const updateTrade = (id, updatedTrade) => {
    const updatedTrades = trades.map(trade => 
      trade.id === id 
        ? { ...updatedTrade, profit: calculateProfit(updatedTrade.entry, updatedTrade.withdrawal) }
        : trade
    )
    setTradesState(updatedTrades)
    setTrades(updatedTrades)
  }

  const deleteTrade = (id) => {
    const updatedTrades = trades.filter(trade => trade.id !== id)
    setTradesState(updatedTrades)
    setTrades(updatedTrades)
  }

  const clearAllTrades = () => {
    setTradesState([])
    setTrades([])
  }

  return {
    trades,
    addTrade,
    updateTrade,
    deleteTrade,
    clearAllTrades
  }
}
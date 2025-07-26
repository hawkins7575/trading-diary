import { useState, useEffect } from 'react'
import { getStrategies, setStrategies } from '@/utils/storage'

export const useStrategies = () => {
  const [strategies, setStrategiesState] = useState([])

  useEffect(() => {
    const savedStrategies = getStrategies()
    if (savedStrategies.length === 0) {
      // 샘플 데이터
      const sampleStrategies = [
        {
          id: 1,
          name: '단기 스윙 전략',
          description: '4시간 차트 기준 단기 스윙 매매',
          buyConditions: '• RSI 30 이하\n• 이동평균선 지지\n• 거래량 증가',
          sellConditions: '• RSI 70 이상\n• 저항선 도달\n• 목표 수익률 달성',
          riskManagement: '• 손절: -3%\n• 목표: +6%\n• 포지션 크기: 총 자금의 10%',
          stopLoss: '매수가 기준 -3%',
          technicalIndicators: 'RSI, 이동평균선(20, 50), 볼린저밴드',
          riskLevel: 'medium',
          timeframe: '4시간',
          targetReturn: '월 10-15%',
          maxDrawdown: '최대 5%'
        }
      ]
      setStrategiesState(sampleStrategies)
      setStrategies(sampleStrategies)
    } else {
      setStrategiesState(savedStrategies)
    }
  }, [])

  const addStrategy = (strategy) => {
    const newStrategy = {
      ...strategy,
      id: Date.now()
    }
    const updatedStrategies = [...strategies, newStrategy]
    setStrategiesState(updatedStrategies)
    setStrategies(updatedStrategies)
  }

  const updateStrategy = (id, updatedStrategy) => {
    const updatedStrategies = strategies.map(strategy => 
      strategy.id === id ? { ...strategy, ...updatedStrategy } : strategy
    )
    setStrategiesState(updatedStrategies)
    setStrategies(updatedStrategies)
  }

  const deleteStrategy = (id) => {
    const updatedStrategies = strategies.filter(strategy => strategy.id !== id)
    setStrategiesState(updatedStrategies)
    setStrategies(updatedStrategies)
  }

  const clearAllStrategies = () => {
    setStrategiesState([])
    setStrategies([])
  }

  return {
    strategies,
    addStrategy,
    updateStrategy,
    deleteStrategy,
    clearAllStrategies
  }
}
import { useState, useEffect } from 'react'
import { getTrades, setTrades as setLocalTrades } from '@/utils/storage'
import { calculateProfit } from '@/utils/calculations'
import { getSupabaseClient } from '@/services/supabase'
import { getAuth } from '@/utils/storage'

export const useTrades = () => {
  const [trades, setTradesState] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const isLoggedIn = auth?.isLoggedIn && auth?.authType === 'supabase'

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true)
      
      if (isLoggedIn) {
        try {
          const supabase = getSupabaseClient()
          const { data, error } = await supabase
            .from('trades')
            .select('*')
            .order('date', { ascending: true })
          
          if (error) throw error
          setTradesState(data || [])
        } catch (error) {
          console.error('Error fetching trades from Supabase:', error)
          // Fallback to local if Supabase fails
          setTradesState(getTrades())
        }
      } else {
        const savedTrades = getTrades()
        if (savedTrades.length === 0 && !localStorage.getItem('trading-diary-initialized')) {
          // 샘플 데이터
          const sampleTrades = [
            { id: 1, date: '2024-01-15', entry: 50000, withdrawal: 55000, balance: 105000, profit: 5000, memo: 'Demo Win', tags: ['계획대로_실행'], emotion: '확신' },
            { id: 2, date: '2024-01-16', entry: 20000, withdrawal: 18000, balance: 103000, profit: -2000, memo: 'Demo Loss', tags: ['손절_늦음'], emotion: '불안' }
          ]
          setTradesState(sampleTrades)
          setLocalTrades(sampleTrades)
          localStorage.setItem('trading-diary-initialized', 'true')
        } else {
          setTradesState(savedTrades)
        }
      }
      setLoading(false)
    }

    fetchTrades()
  }, [isLoggedIn])

  const addTrade = async (trade) => {
    const profit = calculateProfit(trade.entry, trade.withdrawal)
    const newTrade = {
      ...trade,
      profit
    }

    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from('trades')
          .insert([{ ...newTrade, user_id: auth.user.id }])
          .select()
        
        if (error) throw error
        setTradesState([...trades, data[0]])
      } catch (error) {
        console.error('Error adding trade to Supabase:', error)
      }
    } else {
      const updatedTrades = [...trades, { ...newTrade, id: Date.now() }]
      setTradesState(updatedTrades)
      setLocalTrades(updatedTrades)
    }
  }

  const updateTrade = async (id, updatedTrade) => {
    const profit = calculateProfit(updatedTrade.entry, updatedTrade.withdrawal)
    const finalUpdate = { ...updatedTrade, profit }

    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        const { error } = await supabase
          .from('trades')
          .update(finalUpdate)
          .eq('id', id)
        
        if (error) throw error
        setTradesState(trades.map(t => t.id === id ? { ...t, ...finalUpdate } : t))
      } catch (error) {
        console.error('Error updating trade in Supabase:', error)
      }
    } else {
      const updatedTrades = trades.map(t => t.id === id ? { ...t, ...finalUpdate } : t)
      setTradesState(updatedTrades)
      setLocalTrades(updatedTrades)
    }
  }

  const deleteTrade = async (id) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        const { error } = await supabase
          .from('trades')
          .delete()
          .eq('id', id)
        
        if (error) throw error
        setTradesState(trades.filter(t => t.id !== id))
      } catch (error) {
        console.error('Error deleting trade from Supabase:', error)
      }
    } else {
      const updatedTrades = trades.filter(t => t.id !== id)
      setTradesState(updatedTrades)
      setLocalTrades(updatedTrades)
    }
  }

  return {
    trades,
    loading,
    addTrade,
    updateTrade,
    deleteTrade
  }
}
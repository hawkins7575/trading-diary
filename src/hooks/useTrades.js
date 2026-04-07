import { useState, useEffect } from 'react'
import { getTrades, setTrades as setLocalTrades } from '@/utils/storage'
import { recalculateProfits } from '@/utils/calculations'
import { getSupabaseClient } from '@/services/supabase'
import { getAuth } from '@/utils/storage'

export const useTrades = () => {
  const [trades, setTradesState] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const isLoggedIn = auth?.isLoggedIn && auth?.authType === 'supabase'
  
  const updateTradesAndState = (newTrades) => {
    const updated = recalculateProfits(newTrades)
    setTradesState(updated)
    return updated
  }

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true)
      
      if (isLoggedIn) {
        try {
          const supabase = getSupabaseClient()
          if (!supabase) {
            console.error('Supabase client not available')
            setTradesState([])
            setLoading(false)
            return
          }

          const { data, error } = await supabase
            .from('trades')
            .select('*')
            .order('date', { ascending: true })
          
          if (error) throw error
          const updated = recalculateProfits(data || [])
          setTradesState(updated)
        } catch (error) {
          console.error('Error fetching trades from Supabase:', error)
          setTradesState([])
        }
      } else {
        // 더 이상 로컬 데이터를 불러오지 않음
        setTradesState([])
      }
      setLoading(false)
    }

    fetchTrades()
  }, [isLoggedIn])

  const addTrade = async (trade) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const sanitizedTrade = {
        ...trade,
        user_id: auth.user.id,
        seed: parseFloat(trade.seed) || 0,
        entry: parseFloat(trade.entry) || 0,
        withdrawal: parseFloat(trade.withdrawal) || 0,
        balance: parseFloat(trade.balance) || 0,
      }
      
      if (sanitizedTrade.id && typeof sanitizedTrade.id === 'number') {
        delete sanitizedTrade.id
      }

      const { data, error } = await supabase
        .from('trades')
        .insert([sanitizedTrade])
        .select()
      
      if (error) throw error
      updateTradesAndState([...trades, data[0]])
    } catch (error) {
      console.error('Error adding trade to Supabase:', error)
    }
  }

  const updateTrade = async (id, updatedTrade) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const sanitized = { ...updatedTrade }
      if (sanitized.seed !== undefined) sanitized.seed = parseFloat(sanitized.seed) || 0
      if (sanitized.entry !== undefined) sanitized.entry = parseFloat(sanitized.entry) || 0
      if (sanitized.withdrawal !== undefined) sanitized.withdrawal = parseFloat(sanitized.withdrawal) || 0
      if (sanitized.balance !== undefined) sanitized.balance = parseFloat(sanitized.balance) || 0

      const { error } = await supabase
        .from('trades')
        .update(sanitized)
        .eq('id', id)
      
      if (error) throw error
      updateTradesAndState(trades.map(t => t.id === id ? { ...t, ...updatedTrade } : t))
    } catch (error) {
      console.error('Error updating trade in Supabase:', error)
    }
  }

  const deleteTrade = async (id) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const { error } = await supabase
        .from('trades')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      updateTradesAndState(trades.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting trade from Supabase:', error)
    }
  }

  const clearAllTrades = () => {
    if (isLoggedIn) {
      // Supabase에는 전체 삭제를 신중하게 적용해야 하므로 로직 보류하거나 별도 구현 권장
      console.warn('Clear all trades not implemented for Supabase mode for safety')
    }
    updateTradesAndState([])
  }

  return {
    trades,
    loading,
    addTrade,
    updateTrade,
    deleteTrade,
    clearAllTrades
  }
}
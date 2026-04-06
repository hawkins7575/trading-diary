import { useState, useEffect } from 'react'
import { getStrategies, setStrategies as setLocalStrategies } from '@/utils/storage'
import { getSupabaseClient } from '@/services/supabase'
import { getAuth } from '@/utils/storage'

export const useStrategies = () => {
  const [strategies, setStrategiesState] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const isLoggedIn = auth?.isLoggedIn && auth?.authType === 'supabase'

  useEffect(() => {
    const fetchStrategies = async () => {
      setLoading(true)
      if (isLoggedIn) {
        try {
          const supabase = getSupabaseClient()
          if (!supabase) {
            setStrategiesState(getStrategies())
            setLoading(false)
            return
          }
          const { data, error } = await supabase
            .from('strategies')
            .select('*')
          if (error) throw error
          setStrategiesState(data || [])
        } catch (error) {
          console.error('Error fetching strategies from Supabase:', error)
          setStrategiesState(getStrategies())
        }
      } else {
        setStrategiesState(getStrategies())
      }
      setLoading(false)
    }

    fetchStrategies()
  }, [isLoggedIn])

  const addStrategy = async (strategy) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        if (!supabase) {
          console.warn('Supabase client not initialized, performing local operation')
          const updatedStrategies = [...strategies, { ...strategy, id: Date.now() }]
          setStrategiesState(updatedStrategies)
          setLocalStrategies(updatedStrategies)
          return
        }
        
        const sanitizedStrategy = {
          ...strategy,
          user_id: auth.user.id
        }

        // 로컬 ID 제거
        if (sanitizedStrategy.id && typeof sanitizedStrategy.id === 'number') {
          delete sanitizedStrategy.id
        }

        const { data, error } = await supabase
          .from('strategies')
          .insert([sanitizedStrategy])
          .select()
        if (error) throw error
        setStrategiesState([...strategies, data[0]])
      } catch (error) {
        console.error('Error adding strategy to Supabase:', error)
      }
    } else {
      const updatedStrategies = [...strategies, { ...strategy, id: Date.now() }]
      setStrategiesState(updatedStrategies)
      setLocalStrategies(updatedStrategies)
    }
  }

  const updateStrategy = async (id, updatedStrategy) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        if (!supabase) {
          console.warn('Supabase client not initialized, performing local operation')
          const updatedStrategies = strategies.map(s => s.id === id ? { ...s, ...updatedStrategy } : s)
          setStrategiesState(updatedStrategies)
          setLocalStrategies(updatedStrategies)
          return
        }
        const { error } = await supabase
          .from('strategies')
          .update(updatedStrategy)
          .eq('id', id)
        if (error) throw error
        setStrategiesState(strategies.map(s => s.id === id ? { ...s, ...updatedStrategy } : s))
      } catch (error) {
        console.error('Error updating strategy in Supabase:', error)
      }
    } else {
      const updatedStrategies = strategies.map(s => s.id === id ? { ...s, ...updatedStrategy } : s)
      setStrategiesState(updatedStrategies)
      setLocalStrategies(updatedStrategies)
    }
  }

  const deleteStrategy = async (id) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        if (!supabase) {
          console.warn('Supabase client not initialized, performing local operation')
          const updatedStrategies = strategies.filter(s => s.id !== id)
          setStrategiesState(updatedStrategies)
          setLocalStrategies(updatedStrategies)
          return
        }
        const { error } = await supabase
          .from('strategies')
          .delete()
          .eq('id', id)
        if (error) throw error
        setStrategiesState(strategies.filter(s => s.id !== id))
      } catch (error) {
        console.error('Error deleting strategy from Supabase:', error)
      }
    } else {
      const updatedStrategies = strategies.filter(s => s.id !== id)
      setStrategiesState(updatedStrategies)
      setLocalStrategies(updatedStrategies)
    }
  }

  return {
    strategies,
    loading,
    addStrategy,
    updateStrategy,
    deleteStrategy
  }
}
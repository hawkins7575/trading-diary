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
            setStrategiesState([])
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
          setStrategiesState([])
        }
      } else {
        setStrategiesState([])
      }
      setLoading(false)
    }

    fetchStrategies()
  }, [isLoggedIn])

  const addStrategy = async (strategy) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const sanitizedStrategy = {
        ...strategy,
        user_id: auth.user.id
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
  }

  const updateStrategy = async (id, updatedStrategy) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const { error } = await supabase
        .from('strategies')
        .update(updatedStrategy)
        .eq('id', id)
      if (error) throw error
      setStrategiesState(strategies.map(s => s.id === id ? { ...s, ...updatedStrategy } : s))
    } catch (error) {
      console.error('Error updating strategy in Supabase:', error)
    }
  }

  const deleteStrategy = async (id) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const { error } = await supabase
        .from('strategies')
        .delete()
        .eq('id', id)
      if (error) throw error
      setStrategiesState(strategies.filter(s => s.id !== id))
    } catch (error) {
      console.error('Error deleting strategy from Supabase:', error)
    }
  }

  return {
    strategies,
    loading,
    addStrategy,
    updateStrategy,
    deleteStrategy
  }
  return {
    strategies,
    loading,
    addStrategy,
    updateStrategy,
    deleteStrategy
  }
}
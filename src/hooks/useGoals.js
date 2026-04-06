import { useState, useEffect } from 'react'
import { getGoals, setGoals as setLocalGoals } from '@/utils/storage'
import { getSupabaseClient } from '@/services/supabase'
import { getAuth } from '@/utils/storage'

export const useGoals = () => {
  const [goals, setGoalsState] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const isLoggedIn = auth?.isLoggedIn && auth?.authType === 'supabase'

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true)
      if (isLoggedIn) {
        try {
          const supabase = getSupabaseClient()
          if (!supabase) {
            setGoalsState(getGoals())
            setLoading(false)
            return
          }
          const { data, error } = await supabase
            .from('goals')
            .select('*')
          if (error) throw error
          setGoalsState(data || [])
        } catch (error) {
          console.error('Error fetching goals from Supabase:', error)
          setGoalsState(getGoals())
        }
      } else {
        setGoalsState(getGoals())
      }
      setLoading(false)
    }

    fetchGoals()
  }, [isLoggedIn])

  const addGoal = async (goal) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        
        // 데이터 정제
        const sanitizedGoal = {
          ...goal,
          user_id: auth.user.id,
          targetAmount: parseFloat(goal.targetAmount) || 0,
          targetWinRate: parseFloat(goal.targetWinRate) || 0
        }

        // 로컬 ID 제거
        if (sanitizedGoal.id && typeof sanitizedGoal.id === 'number') {
          delete sanitizedGoal.id
        }

        const { data, error } = await supabase
          .from('goals')
          .insert([sanitizedGoal])
          .select()
        if (error) throw error
        setGoalsState([...goals, data[0]])
      } catch (error) {
        console.error('Error adding goal to Supabase:', error)
      }
    } else {
      const updatedGoals = [...goals, { ...goal, id: Date.now() }]
      setGoalsState(updatedGoals)
      setLocalGoals(updatedGoals)
    }
  }

  const updateGoal = async (id, updatedGoal) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        const { error } = await supabase
          .from('goals')
          .update(updatedGoal)
          .eq('id', id)
        if (error) throw error
        setGoalsState(goals.map(g => g.id === id ? { ...g, ...updatedGoal } : g))
      } catch (error) {
        console.error('Error updating goal in Supabase:', error)
      }
    } else {
      const updatedGoals = goals.map(g => g.id === id ? { ...g, ...updatedGoal } : g)
      setGoalsState(updatedGoals)
      setLocalGoals(updatedGoals)
    }
  }

  const deleteGoal = async (id) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        const { error } = await supabase
          .from('goals')
          .delete()
          .eq('id', id)
        if (error) throw error
        setGoalsState(goals.filter(g => g.id !== id))
      } catch (error) {
        console.error('Error deleting goal from Supabase:', error)
      }
    } else {
      const updatedGoals = goals.filter(g => g.id !== id)
      setGoalsState(updatedGoals)
      setLocalGoals(updatedGoals)
    }
  }

  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    deleteGoal
  }
}
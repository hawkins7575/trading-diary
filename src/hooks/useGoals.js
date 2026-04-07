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
            setGoalsState([])
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
          setGoalsState([])
        }
      } else {
        setGoalsState([])
      }
      setLoading(false)
    }

    fetchGoals()
  }, [isLoggedIn])

  const addGoal = async (goal) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const sanitizedGoal = {
        ...goal,
        user_id: auth.user.id,
        targetAmount: parseFloat(goal.targetAmount) || 0,
        targetWinRate: parseFloat(goal.targetWinRate) || 0
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
  }

  const updateGoal = async (id, updatedGoal) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const { error } = await supabase
        .from('goals')
        .update(updatedGoal)
        .eq('id', id)
      if (error) throw error
      setGoalsState(goals.map(g => g.id === id ? { ...g, ...updatedGoal } : g))
    } catch (error) {
      console.error('Error updating goal in Supabase:', error)
    }
  }

  const deleteGoal = async (id) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)
      if (error) throw error
      setGoalsState(goals.filter(g => g.id !== id))
    } catch (error) {
      console.error('Error deleting goal from Supabase:', error)
    }
  }

  const toggleGoalComplete = async (id) => {
    const goal = goals.find(g => g.id === id)
    if (!goal) return
    await updateGoal(id, { completed: !goal.completed })
  }

  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleGoalComplete
  }
}
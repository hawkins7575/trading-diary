import { useState, useEffect } from 'react'
import { getGoals, setGoals } from '@/utils/storage'

export const useGoals = () => {
  const [goals, setGoalsState] = useState([])

  useEffect(() => {
    const savedGoals = getGoals()
    if (savedGoals.length === 0) {
      // 샘플 데이터
      const sampleGoals = [
        {
          id: 1,
          title: '월 수익률 5% 달성',
          targetAmount: 50000,
          targetWinRate: 70,
          deadline: '2024-02-29',
          description: '안정적인 월 5% 수익률을 목표로 합니다.',
          isCompleted: false,
          progress: 0
        }
      ]
      setGoalsState(sampleGoals)
      setGoals(sampleGoals)
    } else {
      setGoalsState(savedGoals)
    }
  }, [])

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now(),
      isCompleted: false,
      progress: 0,
      createdAt: new Date().toISOString()
    }
    const updatedGoals = [...goals, newGoal]
    setGoalsState(updatedGoals)
    setGoals(updatedGoals)
  }

  const updateGoal = (id, updatedGoal) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, ...updatedGoal } : goal
    )
    setGoalsState(updatedGoals)
    setGoals(updatedGoals)
  }

  const deleteGoal = (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id)
    setGoalsState(updatedGoals)
    setGoals(updatedGoals)
  }

  const toggleGoalComplete = (id) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id 
        ? { ...goal, isCompleted: !goal.isCompleted, progress: goal.isCompleted ? 0 : 100 }
        : goal
    )
    setGoalsState(updatedGoals)
    setGoals(updatedGoals)
  }

  const clearAllGoals = () => {
    setGoalsState([])
    setGoals([])
  }

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleGoalComplete,
    clearAllGoals
  }
}
import { useState, useEffect } from 'react'

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const savedFeedbacks = localStorage.getItem('trading-diary-feedbacks')
    if (savedFeedbacks) {
      try {
        setFeedbacks(JSON.parse(savedFeedbacks))
      } catch (error) {
        console.error('Error loading feedbacks:', error)
        setFeedbacks([])
      }
    }
  }, [])

  const saveFeedbacks = (newFeedbacks) => {
    setFeedbacks(newFeedbacks)
    localStorage.setItem('trading-diary-feedbacks', JSON.stringify(newFeedbacks))
  }

  const addFeedback = (feedbackData) => {
    const newFeedback = {
      id: Date.now().toString(),
      ...feedbackData,
      createdAt: new Date().toISOString(),
      status: 'submitted' // submitted, reviewing, completed, closed
    }
    
    const updatedFeedbacks = [newFeedback, ...feedbacks]
    saveFeedbacks(updatedFeedbacks)
    return newFeedback
  }

  const updateFeedback = (id, updates) => {
    const updatedFeedbacks = feedbacks.map(feedback =>
      feedback.id === id ? { ...feedback, ...updates } : feedback
    )
    saveFeedbacks(updatedFeedbacks)
  }

  const deleteFeedback = (id) => {
    const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id)
    saveFeedbacks(updatedFeedbacks)
  }

  return {
    feedbacks,
    addFeedback,
    updateFeedback,
    deleteFeedback
  }
}
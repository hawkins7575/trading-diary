import { useState, useEffect } from 'react'
import { getJournals, setJournals } from '@/utils/storage'

export const useJournals = () => {
  const [journals, setJournalsState] = useState([])

  useEffect(() => {
    const savedJournals = getJournals()
    if (savedJournals.length === 0) {
      // 샘플 데이터
      const sampleJournals = [
        {
          id: 1,
          date: '2024-01-15',
          content: '오늘 비트코인 매매에서 좋은 결과를 얻었다. 사전에 계획한 대로 손절선을 설정하고 인내심을 가지고 기다린 결과였다.',
          mood: 'good'
        },
        {
          id: 2,
          date: '2024-01-16',
          content: '감정적으로 거래해서 손실을 봤다. 다음에는 반드시 계획을 세우고 거래해야겠다.',
          mood: 'bad'
        }
      ]
      setJournalsState(sampleJournals)
      setJournals(sampleJournals)
    } else {
      setJournalsState(savedJournals)
    }
  }, [])

  const addJournal = (journal) => {
    const newJournal = {
      ...journal,
      id: Date.now()
    }
    const updatedJournals = [...journals, newJournal]
    setJournalsState(updatedJournals)
    setJournals(updatedJournals)
  }

  const updateJournal = (id, updatedJournal) => {
    const updatedJournals = journals.map(journal => 
      journal.id === id ? { ...journal, ...updatedJournal } : journal
    )
    setJournalsState(updatedJournals)
    setJournals(updatedJournals)
  }

  const deleteJournal = (id) => {
    const updatedJournals = journals.filter(journal => journal.id !== id)
    setJournalsState(updatedJournals)
    setJournals(updatedJournals)
  }

  const clearAllJournals = () => {
    setJournalsState([])
    setJournals([])
  }

  return {
    journals,
    addJournal,
    updateJournal,
    deleteJournal,
    clearAllJournals
  }
}
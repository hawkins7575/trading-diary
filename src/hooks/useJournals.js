import { useState, useEffect } from 'react'
import { getJournals, setJournals as setLocalJournals } from '@/utils/storage'
import { getSupabaseClient } from '@/services/supabase'
import { getAuth } from '@/utils/storage'

export const useJournals = () => {
  const [journals, setJournalsState] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const isLoggedIn = auth?.isLoggedIn && auth?.authType === 'supabase'

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true)
      if (isLoggedIn) {
        try {
          const supabase = getSupabaseClient()
          const { data, error } = await supabase
            .from('journals')
            .select('*')
            .order('date', { ascending: false })
          if (error) throw error
          setJournalsState(data || [])
        } catch (error) {
          console.error('Error fetching journals from Supabase:', error)
          setJournalsState(getJournals())
        }
      } else {
        setJournalsState(getJournals())
      }
      setLoading(false)
    }

    fetchJournals()
  }, [isLoggedIn])

  const addJournal = async (journal) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from('journals')
          .insert([{ ...journal, user_id: auth.user.id }])
          .select()
        if (error) throw error
        setJournalsState([data[0], ...journals])
      } catch (error) {
        console.error('Error adding journal to Supabase:', error)
      }
    } else {
      const updatedJournals = [{ ...journal, id: Date.now() }, ...journals]
      setJournalsState(updatedJournals)
      setLocalJournals(updatedJournals)
    }
  }

  const updateJournal = async (id, updatedJournal) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        const { error } = await supabase
          .from('journals')
          .update(updatedJournal)
          .eq('id', id)
        if (error) throw error
        setJournalsState(journals.map(j => j.id === id ? { ...j, ...updatedJournal } : j))
      } catch (error) {
        console.error('Error updating journal in Supabase:', error)
      }
    } else {
      const updatedJournals = journals.map(j => j.id === id ? { ...j, ...updatedJournal } : j)
      setJournalsState(updatedJournals)
      setLocalJournals(updatedJournals)
    }
  }

  const deleteJournal = async (id) => {
    if (isLoggedIn) {
      try {
        const supabase = getSupabaseClient()
        const { error } = await supabase
          .from('journals')
          .delete()
          .eq('id', id)
        if (error) throw error
        setJournalsState(journals.filter(j => j.id !== id))
      } catch (error) {
        console.error('Error deleting journal from Supabase:', error)
      }
    } else {
      const updatedJournals = journals.filter(j => j.id !== id)
      setJournalsState(updatedJournals)
      setLocalJournals(updatedJournals)
    }
  }

  return {
    journals,
    loading,
    addJournal,
    updateJournal,
    deleteJournal
  }
}
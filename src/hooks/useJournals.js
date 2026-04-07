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
          if (!supabase) {
            setJournalsState([])
            setLoading(false)
            return
          }
          const { data, error } = await supabase
            .from('journals')
            .select('*')
            .order('date', { ascending: false })
          if (error) throw error
          setJournalsState(data || [])
        } catch (error) {
          console.error('Error fetching journals from Supabase:', error)
          setJournalsState([])
        }
      } else {
        setJournalsState([])
      }
      setLoading(false)
    }

    fetchJournals()
  }, [isLoggedIn])

  const addJournal = async (journal) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const { data, error } = await supabase
        .from('journals')
        .insert([{ ...journal, user_id: auth.user.id }])
        .select()
      if (error) throw error
      setJournalsState([data[0], ...journals])
    } catch (error) {
      console.error('Error adding journal to Supabase:', error)
    }
  }

  const updateJournal = async (id, updatedJournal) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const { error } = await supabase
        .from('journals')
        .update(updatedJournal)
        .eq('id', id)
      if (error) throw error
      setJournalsState(journals.map(j => j.id === id ? { ...j, ...updatedJournal } : j))
    } catch (error) {
      console.error('Error updating journal in Supabase:', error)
    }
  }

  const deleteJournal = async (id) => {
    if (!isLoggedIn) return
    
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      
      const { error } = await supabase
        .from('journals')
        .delete()
        .eq('id', id)
      if (error) throw error
      setJournalsState(journals.filter(j => j.id !== id))
    } catch (error) {
      console.error('Error deleting journal from Supabase:', error)
    }
  }

  return {
    journals,
    loading,
    addJournal,
    updateJournal,
    deleteJournal
  }
  return {
    journals,
    loading,
    addJournal,
    updateJournal,
    deleteJournal
  }
}
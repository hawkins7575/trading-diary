import { createClient } from '@supabase/supabase-js'

let supabaseClient = null

export const initializeSupabase = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found, using localStorage only')
    return null
  }
  
  if (supabaseUrl.includes('your-project')) {
    console.warn('Supabase URL not configured, using localStorage only')
    return null
  }
  
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client initialized successfully')
    return supabaseClient
  } catch (error) {
    console.error('Error initializing Supabase client:', error)
    return null
  }
}

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = initializeSupabase()
  }
  return supabaseClient
}

export const testSupabaseConnection = async () => {
  const client = getSupabaseClient()
  if (!client) return false
  
  try {
    const { data, error } = await client.from('trades').select('count', { count: 'exact', head: true })
    if (error && error.code !== 'PGRST116') {
      console.log('Supabase connection test - table might not exist yet:', error.message)
      return false
    }
    console.log('Supabase connection test successful')
    return true
  } catch (error) {
    console.log('Supabase connection test failed:', error.message)
    return false
  }
}
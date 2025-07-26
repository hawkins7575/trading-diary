import { LOCAL_STORAGE_KEYS } from '@/constants'

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error)
      return null
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error setting ${key} to localStorage:`, error)
      return false
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
      return false
    }
  },

  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

export const getTrades = () => storage.get(LOCAL_STORAGE_KEYS.TRADES) || []
export const setTrades = (trades) => storage.set(LOCAL_STORAGE_KEYS.TRADES, trades)

export const getJournals = () => storage.get(LOCAL_STORAGE_KEYS.JOURNALS) || []
export const setJournals = (journals) => storage.set(LOCAL_STORAGE_KEYS.JOURNALS, journals)

export const getStrategies = () => storage.get(LOCAL_STORAGE_KEYS.STRATEGIES) || []
export const setStrategies = (strategies) => storage.set(LOCAL_STORAGE_KEYS.STRATEGIES, strategies)

export const getGoals = () => storage.get(LOCAL_STORAGE_KEYS.GOALS) || []
export const setGoals = (goals) => storage.set(LOCAL_STORAGE_KEYS.GOALS, goals)

export const getAuth = () => storage.get(LOCAL_STORAGE_KEYS.AUTH)
export const setAuth = (auth) => storage.set(LOCAL_STORAGE_KEYS.AUTH, auth)
export const removeAuth = () => storage.remove(LOCAL_STORAGE_KEYS.AUTH)
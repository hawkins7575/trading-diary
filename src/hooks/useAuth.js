import { useState, useEffect } from 'react'
import { getAuth, setAuth, removeAuth } from '@/utils/storage'
import { getSupabaseClient } from '@/services/supabase'

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 저장된 인증 정보 확인
    const savedAuth = getAuth()
    if (savedAuth?.isLoggedIn) {
      setIsLoggedIn(true)
      setUser(savedAuth.user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      setLoading(false)
      return
    }

    try {
      const supabase = getSupabaseClient()
      
      if (!supabase) {
        // 로컬 모드 로그인
        console.warn('Supabase not available, using local authentication mode')
        
        const localUsers = JSON.parse(localStorage.getItem('trading-diary-local-users') || '{}')
        
        if (localUsers[email] && localUsers[email].password === password) {
          const userData = {
            id: email,
            name: localUsers[email].name,
            email: email,
            avatar: '👤'
          }
          
          setUser(userData)
          setIsLoggedIn(true)
          
          setAuth({
            isLoggedIn: true,
            user: userData,
            authType: 'local'
          })
          
          return { success: true }
        } else {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.')
          return { success: false }
        }
      }

      // Supabase 로그인
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      if (authError) {
        setError(authError.message || '로그인에 실패했습니다.')
        return { success: false }
      }

      if (data.user) {
        const userData = {
          id: data.user.id,
          name: data.user.user_metadata?.name || email.split('@')[0],
          email: email,
          avatar: '👤'
        }

        setUser(userData)
        setIsLoggedIn(true)
        
        setAuth({
          isLoggedIn: true,
          user: userData,
          authType: 'supabase'
        })

        return { success: true }
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('로그인 중 오류가 발생했습니다.')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (!email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      setLoading(false)
      return
    }

    try {
      const supabase = getSupabaseClient()
      
      if (!supabase) {
        // 로컬 모드 회원가입
        console.warn('Supabase not available, using local registration mode')
        
        const localUsers = JSON.parse(localStorage.getItem('trading-diary-local-users') || '{}')
        
        if (localUsers[email]) {
          setError('이미 존재하는 이메일입니다.')
          return { success: false }
        }

        // 새 사용자 등록
        localUsers[email] = {
          name: email.split('@')[0],
          password: password,
          createdAt: Date.now()
        }

        localStorage.setItem('trading-diary-local-users', JSON.stringify(localUsers))

        const userData = {
          id: email,
          name: email.split('@')[0],
          email: email,
          avatar: '👤'
        }

        setUser(userData)
        setIsLoggedIn(true)
        
        setAuth({
          isLoggedIn: true,
          user: userData,
          authType: 'local'
        })

        return { success: true, message: '회원가입이 완료되었습니다! (로컬 모드)' }
      }

      // Supabase 회원가입
      const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: email.split('@')[0]
          }
        }
      })

      if (authError) {
        setError(authError.message || '회원가입에 실패했습니다.')
        return { success: false }
      }

      if (data.user) {
        const userData = {
          id: data.user.id,
          name: email.split('@')[0],
          email: email,
          avatar: '👤'
        }

        setUser(userData)
        setIsLoggedIn(true)
        
        setAuth({
          isLoggedIn: true,
          user: userData,
          authType: 'supabase'
        })

        return { success: true, message: '회원가입이 완료되었습니다! 이메일 확인을 해주세요.' }
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError('회원가입 중 오류가 발생했습니다.')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    removeAuth()
    return { success: true }
  }

  return {
    isLoggedIn,
    user,
    error,
    loading,
    handleLogin,
    handleSignUp,
    handleLogout,
    setError
  }
}
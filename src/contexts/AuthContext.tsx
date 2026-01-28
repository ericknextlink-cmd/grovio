"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { apiService, type ApiResponse } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: string
  profilePicture?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  role: string
  preferences?: {
    language: string
    currency: string
  }
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<ApiResponse>
  logout: () => void
  refreshUser: () => Promise<void>
  refreshToken: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { initializeAuth: syncStoreAuth } = useAuthStore()

  const isAuthenticated = !!user

  const refreshUser = useCallback(async () => {
    try {
      // getProfile will use HttpOnly cookies if present, or Authorization header
      const response = await apiService.getProfile()

      if (response.success && response.user) {
        setUser(response.user)
        
        // Check onboarding status
        try {
          const onboardingRes = await apiService.getOnboardingStatus()
          const hasCompletedOnboarding = onboardingRes.data?.onboardingCompleted
          
          // If onboarding is NOT complete, and we are not already on the onboarding page, redirect
          if (hasCompletedOnboarding === false && pathname !== '/onboarding') {
            console.log('Onboarding incomplete, redirecting...')
            router.push('/onboarding')
          } else if (hasCompletedOnboarding === true && (pathname === '/login' || pathname === '/signup')) {
             // If onboarding IS complete, and we are on login/signup, redirect to intended page
             // This handles the "auth complete" scenario
             const redirect = searchParams.get('redirect')
             if (redirect) {
               router.push(redirect)
             } else {
               router.push('/')
             }
          }
        } catch (error) {
          console.warn('Failed to check onboarding status:', error)
        }
      } else {
        // Token/Cookie might be invalid, clear auth state
        setUser(null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    } catch (error) {
      console.error('Refresh user error:', error)
      setUser(null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }, [pathname, router, searchParams])


  // Check for tokens in URL params (fallback for cross-domain auth)
  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')

    if (accessToken && refreshToken) {
      console.log('Received tokens from URL, saving...')
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      
      // Clean URL
      const newUrl = window.location.pathname + (searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : '')
      window.history.replaceState({}, '', newUrl)
      
      // Refresh user with new tokens
      refreshUser()
      // Sync with global store for other components (like Header)
      syncStoreAuth()
    }
  }, [searchParams, refreshUser, syncStoreAuth])

  // Check for existing session on mount (cookies or localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        // Attempt to fetch profile. This works if:
        // 1. HttpOnly cookies are set (server-side flow)
        // 2. localStorage has accessToken (client-side flow fallback)
        await refreshUser()
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [refreshUser])

  // Post-auth redirection logic handled in refreshUser now

  const login = async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const response = await apiService.signin({ email, password })

      if (response.success && response.accessToken && response.refreshToken) {
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)

        if (response.user) {
          setUser(response.user)
          // Trigger onboarding check manually after login
          await refreshUser()
        }
      }

      return response
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Login failed',
        errors: ['Something went wrong during login']
      }
    }
  }

  const logout = async () => {
    try {
      // Call signout endpoint to clear cookies
      await apiService.signout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setUser(null)
      router.push('/login')
    }
  }


  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken')
      
      if (!refreshTokenValue) {
        // If no token, maybe we have cookies? Try getting profile
        try {
            await refreshUser()
            return !!user
        } catch {
            return false
        }
      }

      const response = await apiService.refreshToken(refreshTokenValue)

      if (response.success && response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken)
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken)
        }
        return true
      } else {
        await logout()
        return false
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      await logout()
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

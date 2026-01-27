"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { apiService, type ApiResponse } from '@/lib/api'

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

  const isAuthenticated = !!user

  const refreshUser = useCallback(async () => {
    try {
      // getProfile will use HttpOnly cookies if present, or Authorization header
      const response = await apiService.getProfile()

      if (response.success && response.user) {
        setUser(response.user)
        
        // Check onboarding status
        try {
          // You might need to adjust this endpoint call based on your API structure
          // Assuming onboardingStatus endpoint exists or using profile data
          // For now, let's assume we check if profile is complete
          const isProfileComplete = response.user.firstName && response.user.lastName
          
          // If you have a specific endpoint for onboarding status:
          // const onboardingRes = await apiService.preferences.onboardingStatus()
          // const hasCompletedOnboarding = onboardingRes.data?.data?.onboardingCompleted
          
          // Redirect logic can be placed here or in a separate effect
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
  }, [])


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

  // Post-auth redirection logic
  useEffect(() => {
    if (!isLoading && user) {
      // If user is authenticated but on auth pages, redirect to dashboard
      if (pathname === '/login' || pathname === '/signup') {
        router.push('/dashboard')
      }
      
      // Add onboarding redirect check here if needed
      // if (!user.onboardingCompleted && pathname !== '/onboarding') {
      //   router.push('/onboarding')
      // }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const response = await apiService.signin({ email, password })

      if (response.success && response.accessToken && response.refreshToken) {
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)

        if (response.user) {
          setUser(response.user)
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
      // If no refresh token in storage, maybe we have it in cookies?
      // apiService.refreshToken handles logic, but usually requires sending the token.
      // If using cookies, the backend handles refresh automatically via middleware or explicit call.
      
      if (!refreshTokenValue) {
        return false
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

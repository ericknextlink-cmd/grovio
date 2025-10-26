"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
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

  const isAuthenticated = !!user

  const refreshUser = useCallback(async () => {
    try {
      const response = await apiService.getProfile()

      if (response.success && response.user) {
        setUser(response.user)
      } else {
        // Token might be invalid, clear auth state
        logout()
      }
    } catch (error) {
      console.error('Refresh user error:', error)
      logout()
    }
  }, [])


  // Check for existing tokens on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          await refreshUser()
        } catch (error) {
          console.error('Auth check failed:', error)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [refreshUser])

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

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }


  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken')
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
        logout()
        return false
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      logout()
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api, tokenManager } from '@/lib/api-client'

export interface User {
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
    familySize: number
    dietaryRestrictions?: string[]
    preferredCategories?: string[]
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  signup: (data: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
  }) => Promise<{ success: boolean; message: string }>

  signin: (data: { email: string; password: string }) => Promise<{ success: boolean; message: string }>

  signinWithGoogle: (idToken: string, nonce?: string) => Promise<{ success: boolean; message: string }>

  signout: () => Promise<void>

  refreshUser: () => Promise<void>

  initializeAuth: () => Promise<void>

  clearError: () => void

  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      signup: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.auth.signup(data)
          const { success, message, user } = response.data

          if (success) {
            // Don't set user as authenticated yet - email verification is required
            // User will be authenticated after they verify their email via the callback page
            set({ isLoading: false })
            return { success: true, message }
          } else {
            set({ error: message, isLoading: false })
            return { success: false, message }
          }
        } catch (error: any) {
          const responseData = error.response?.data
          let errorMessage = responseData?.message || 'Signup failed'
          
          // Combine message with first error from errors array if available
          if (responseData?.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
            errorMessage = `${errorMessage}: ${responseData.errors[0]}`
          }
          
          set({ error: errorMessage, isLoading: false })
          return { success: false, message: errorMessage }
        }
      },

      signin: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.auth.signin(data)
          const { success, message, user, accessToken, refreshToken } = response.data as any

          if (success && user && accessToken && refreshToken) {
            tokenManager.setTokens(accessToken, refreshToken)
            set({ user, isAuthenticated: true, isLoading: false })
            return { success: true, message }
          } else {
            set({ error: message, isLoading: false })
            return { success: false, message }
          }
        } catch (error: any) {
          const responseData = error.response?.data
          let errorMessage = responseData?.message || 'Signin failed'
          
          // Combine message with first error from errors array if available
          if (responseData?.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
            errorMessage = `${errorMessage}: ${responseData.errors[0]}`
          }
          
          set({ error: errorMessage, isLoading: false })
          return { success: false, message: errorMessage }
        }
      },

      signinWithGoogle: async (idToken, nonce) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.auth.google({ idToken, nonce })
          const { success, message, user, accessToken, refreshToken } = response.data as any

          if (success && user && accessToken && refreshToken) {
            tokenManager.setTokens(accessToken, refreshToken)
            set({ user, isAuthenticated: true, isLoading: false })
            return { success: true, message }
          } else {
            set({ error: message, isLoading: false })
            return { success: false, message }
          }
        } catch (error: any) {
          const responseData = error.response?.data
          let errorMessage = responseData?.message || 'Google signin failed'
          
          // Combine message with first error from errors array if available
          if (responseData?.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
            errorMessage = `${errorMessage}: ${responseData.errors[0]}`
          }
          
          set({ error: errorMessage, isLoading: false })
          return { success: false, message: errorMessage }
        }
      },

      signout: async () => {
        set({ isLoading: true })
        try {
          await api.auth.signout()
        } catch (error) {
          console.error('Signout error:', error)
        } finally {
          tokenManager.clearTokens()
          set({ user: null, isAuthenticated: false, isLoading: false, error: null })
        }
      },

      refreshUser: async () => {
        // Check if we have tokens
        const hasToken = tokenManager.isAuthenticated()
        if (!hasToken) {
          set({ user: null, isAuthenticated: false, isLoading: false })
          return
        }

        set({ isLoading: true })
        try {
          const response = await api.auth.me()
          const { success, user } = response.data

          if (success && user) {
            set({ user, isAuthenticated: true, isLoading: false })
          } else {
            // Token might be invalid, clear it
            tokenManager.clearTokens()
            set({ user: null, isAuthenticated: false, isLoading: false })
          }
        } catch (error: any) {
          // Check if it's "User not found" - this is expected for newly verified users
          const errorMessage = error?.response?.data?.message || ''
          const isUserNotFound = errorMessage.includes('User not found') || 
                                errorMessage.includes('User profile not found')
          const is401 = error?.response?.status === 401
          
          // For "User not found" - this is expected for new users, keep tokens
          if (isUserNotFound) {
            console.log('User profile not found (expected for new users)')
            set({ user: null, isAuthenticated: false, isLoading: false })
            // Don't throw - this is expected and not an error
            return
          }
          
          // For other 401 errors, check if token might be invalid
          if (is401) {
            // Don't clear tokens automatically - let the caller decide
            // Token might be valid but profile doesn't exist yet
            console.warn('401 error fetching user profile (non-critical)')
            set({ user: null, isAuthenticated: false, isLoading: false })
            // Don't throw - allow caller to handle gracefully
            return
          }
          
          // For other errors, log and set state but don't throw
          console.warn('Failed to refresh user (non-critical):', errorMessage || error.message)
          set({ user: null, isAuthenticated: false, isLoading: false })
          // Don't throw - allow flow to continue
        }
      },

      // Initialize auth state from tokens on mount
      initializeAuth: async () => {
        const hasToken = tokenManager.isAuthenticated()
        if (hasToken && !get().user) {
          // User has token but profile not loaded, fetch it
          await get().refreshUser()
        } else if (!hasToken) {
          // No token, clear auth state
          set({ user: null, isAuthenticated: false })
        }
      },

      clearError: () => set({ error: null }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

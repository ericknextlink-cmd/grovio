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
      isLoading: true, // Start as true to prevent premature redirects
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

        // Only set loading if not already loading (to avoid overriding initialization state)
        const currentState = get()
        if (!currentState.isLoading) {
          set({ isLoading: true })
        }
        
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
          // But still mark as authenticated if we have tokens (they're valid)
          if (isUserNotFound) {
            // Expected for new Google users before profile is synced; no need to log
            // Keep tokens but mark as not authenticated (will need onboarding)
            set({ user: null, isAuthenticated: false, isLoading: false })
            return
          }
          
          // For 401 errors, try to refresh token first
          if (is401) {
            const refreshToken = tokenManager.getRefreshToken()
            if (refreshToken) {
              try {
                // Try to refresh the token
                const refreshResponse = await api.auth.refresh({ refreshToken })
                if (refreshResponse.data.success && refreshResponse.data.accessToken) {
                  const newAccessToken = refreshResponse.data.accessToken
                  const newRefreshToken = refreshResponse.data.refreshToken || refreshToken
                  tokenManager.setTokens(newAccessToken, newRefreshToken)
                  
                  // Retry getting user profile with new token
                  try {
                    const retryResponse = await api.auth.me()
                    if (retryResponse.data.success && retryResponse.data.user) {
                      set({ user: retryResponse.data.user, isAuthenticated: true, isLoading: false })
                      return
                    }
                  } catch (retryError) {
                    console.warn('Failed to fetch user after token refresh')
                  }
                }
              } catch (refreshError) {
                console.warn('Token refresh failed during user refresh')
                // Fall through to clear tokens
              }
            }
            
            // If refresh failed or no refresh token, clear tokens
            tokenManager.clearTokens()
            set({ user: null, isAuthenticated: false, isLoading: false })
            return
          }
          
          // For other errors, log and set state but don't throw
          console.warn('Failed to refresh user (non-critical):', errorMessage || error.message)
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },

      // Initialize auth state from tokens on mount
      initializeAuth: async () => {
        // Set loading state during initialization
        set({ isLoading: true })
        
        try {
          const hasToken = tokenManager.isAuthenticated()
          
          if (hasToken) {
            // User has token, try to fetch profile
            // This will set isAuthenticated based on whether we get a valid user
            await get().refreshUser()
          } else {
            // No token, clear auth state
            set({ user: null, isAuthenticated: false, isLoading: false })
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
          // If initialization fails, clear state
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },

      clearError: () => set({ error: null }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Only persist user data, not auth status
        // isAuthenticated should always be derived from tokens and user existence
        user: state.user,
      }),
    }
  )
)

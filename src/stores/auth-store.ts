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

          if (success && user) {
            set({ user, isAuthenticated: true, isLoading: false })
            return { success: true, message }
          } else {
            set({ error: message, isLoading: false })
            return { success: false, message }
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Signup failed'
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
          const errorMessage = error.response?.data?.message || 'Signin failed'
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
          const errorMessage = error.response?.data?.message || 'Google signin failed'
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
        if (!tokenManager.isAuthenticated()) return

        set({ isLoading: true })
        try {
          const response = await api.auth.me()
          const { success, user } = response.data

          if (success && user) {
            set({ user, isAuthenticated: true, isLoading: false })
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false })
          }
        } catch (error) {
          console.error('Refresh user error:', error)
          set({ user: null, isAuthenticated: false, isLoading: false })
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

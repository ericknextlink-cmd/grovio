"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { api, tokenManager } from '@/lib/api-client'
import { apiService } from '@/lib/api'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { initializeAuth } = useAuthStore()
  const { refreshUser: refreshContextUser } = useAuth()
  const [status, setStatus] = useState('Completing sign-in...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Processing authentication callback...')
        
        // 1. Handle Supabase Session Exchange
        // Check if we already have a session (Supabase client might have handled it)
        let { data: { session }, error } = await supabase.auth.getSession()
        
        if (!session) {
          // If no session, try exchanging code from URL
          const code = new URLSearchParams(window.location.search).get('code')
          if (code) {
            console.log('Exchanging auth code for session...')
            const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
            if (exchangeError) throw exchangeError
            session = data.session
          } else {
            // Check for hash fragments (implicit flow fallback)
            const hash = window.location.hash
            if (hash && hash.includes('access_token')) {
               // Supabase client usually handles this automatically, but just in case
               const { data, error: hashError } = await supabase.auth.getSession()
               if (hashError) throw hashError
               session = data.session
            }
          }
        }

        if (error) throw error
        
        if (!session) {
          // Check if this is an email verification flow (handled differently by backend logic usually, but let's check)
          const type = new URLSearchParams(window.location.search).get('type')
          if (type === 'signup') {
             // Let the backend/email verification logic handle this if it redirects here
             // But for Google Auth, session is required
             console.log('Email verification detected')
          } else {
             throw new Error('No session found. Please try logging in again.')
          }
          return // Stop if no session
        }

        console.log('Supabase session verified')
        setStatus('Verifying with server...')

        // 2. Exchange Supabase Session for Backend Tokens
        // We send the session to our backend to create/update user and get OUR app's tokens
        const response = await apiService.googleSession(session)
        
        if (!response.success || !response.accessToken) {
          throw new Error(response.message || 'Failed to verify session with backend')
        }

        const { accessToken, refreshToken, user } = response

        // 3. Store Tokens
        console.log('Backend verification successful')
        tokenManager.setTokens(accessToken, refreshToken || '')
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken)
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken)
          }
        }

        // 4. Update State & Redirect
        await initializeAuth() // Sync zustand store
        await refreshContextUser() // Sync context state
        
        // Check onboarding status
        let hasCompletedOnboarding = false
        try {
          const onboardingRes = await apiService.getOnboardingStatus()
          hasCompletedOnboarding = onboardingRes.data?.onboardingCompleted || false
        } catch (e) {
          console.warn('Failed to check onboarding:', e)
        }

        // Get redirect path
        const storedRedirect = localStorage.getItem('authRedirect')
        localStorage.removeItem('authRedirect')
        
        setStatus('Redirecting...')
        
        if (!hasCompletedOnboarding) {
          toast.success('Welcome! Let\'s set up your profile.')
          router.push('/onboarding')
        } else {
          toast.success(`Welcome back${user?.firstName ? ', ' + user.firstName : ''}!`)
          router.push(storedRedirect || '/')
        }

      } catch (error: any) {
        console.error('Auth callback error:', error)
        toast.error(error.message || 'Authentication failed')
        router.push('/login')
      }
    }

    handleCallback()
  }, [router, initializeAuth])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-sm w-full mx-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D35F0E] mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Authenticating</h2>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  )
}

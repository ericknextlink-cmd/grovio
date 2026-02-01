import { useCallback, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { apiService } from '@/lib/api'
import { tokenManager } from '@/lib/api-client'
import { env } from '@/lib/env'
import { useAuthStore } from '@/stores/auth-store'
import { useAuth } from '@/contexts/AuthContext'

// GSI shape we use (global.d.ts merges this with Maps; here we only need .accounts)
interface GoogleGSI {
  accounts?: {
    id: {
      initialize: (config: unknown) => void
      renderButton: (parent: HTMLElement, options: unknown) => void
      prompt: (callback?: (notification: unknown) => void) => void
    }
  }
}

function getGoogleGSI(): GoogleGSI | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as { google?: GoogleGSI }).google
}

export const useGoogleAuth = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const { initializeAuth } = useAuthStore()
  const { refreshUser } = useAuth()

  // Load Google Script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
        initializeGoogleOneTap()
    }
    document.body.appendChild(script)
    
    return () => {
        // Cleanup if needed
        if (document.body.contains(script)) {
            document.body.removeChild(script)
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGoogleCredential = useCallback(async (response: any) => {
    try {
      setIsLoading(true)
      const idToken = response.credential
      
      console.log('Received Google ID Token, authenticating with backend...')
      
      // Send to backend
      const result = await apiService.googleAuth({ idToken })
      
      if (result.success && result.accessToken) {
        // Store tokens
        tokenManager.setTokens(result.accessToken, result.refreshToken || '')
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', result.accessToken)
            if (result.refreshToken) {
                localStorage.setItem('refreshToken', result.refreshToken)
            }
        }

        // Sync state
        await initializeAuth()
        await refreshUser()

        // Check onboarding
        let hasCompletedOnboarding = false
        try {
            const onboardingRes = await apiService.getOnboardingStatus()
            hasCompletedOnboarding = onboardingRes.data?.onboardingCompleted || false
        } catch (e) {
            console.warn('Failed to check onboarding:', e)
        }

        // Redirect logic
        const redirectParam = searchParams?.get('redirect')
        if (!hasCompletedOnboarding) {
            toast.success('Welcome! Let\'s set up your profile.')
            router.push('/onboarding')
        } else {
            toast.success(`Welcome back${result.user?.firstName ? ', ' + result.user.firstName : ''}!`)
            if (redirectParam) {
                router.push(redirectParam)
            } else {
                router.push('/')
            }
        }
      } else {
        throw new Error(result.message || 'Authentication failed')
      }
    } catch (error: any) {
      console.error('Google auth error:', error)
      toast.error(error.message || 'Failed to sign in with Google')
    } finally {
      setIsLoading(false)
    }
  }, [router, searchParams, initializeAuth, refreshUser])

  const initializeGoogleOneTap = useCallback(() => {
    const clientId = env.GOOGLE_CLIENT_ID?.trim()
    if (!clientId) return

    const g = getGoogleGSI()
    if (!g?.accounts?.id) return

    g.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredential,
      auto_select: false, // Enable this for even faster sign-in if you want
      cancel_on_tap_outside: true,
    })

    // Display One Tap if not signed in
    // You might want to check if user is already logged in before showing
    if (!tokenManager.isAuthenticated()) {
        g.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed()) {
                console.log('One Tap not displayed:', notification.getNotDisplayedReason())
            } else if (notification.isSkippedMoment()) {
                console.log('One Tap skipped:', notification.getSkippedReason())
            } else if (notification.isDismissedMoment()) {
                console.log('One Tap dismissed:', notification.getDismissedReason())
            }
        })
    }
  }, [handleGoogleCredential])

  const signInWithGoogle = useCallback(() => {
    const clientId = env.GOOGLE_CLIENT_ID?.trim()
    if (!clientId) {
      toast.error('Google Sign-In is not configured. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env file.')
      return
    }

    const g = getGoogleGSI()
    if (!g?.accounts?.id) {
        toast.error('Google Sign-In is initializing, please try again in a moment.')
        return
    }

    setIsLoading(true)

    // Re-initialize to ensure callback is fresh (and context is correct)
    g.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredential,
      ux_mode: 'popup',
    })

    // Create a temporary container
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.top = '-9999px'
    div.style.left = '-9999px'
    document.body.appendChild(div)

    g.accounts.id.renderButton(div, {
        type: 'standard',
        size: 'large',
    })

    // Click the button inside the container
    // We need to wait a tiny bit for render
    setTimeout(() => {
        const button = div.querySelector('div[role="button"]') as HTMLElement
        if (button) {
            button.click()
        } else {
            console.error('Could not find Google button to click')
            setIsLoading(false)
        }
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(div)
        }, 1000)
    }, 100)

  }, [handleGoogleCredential])

  return {
    signInWithGoogle,
    isLoading,
  }
}

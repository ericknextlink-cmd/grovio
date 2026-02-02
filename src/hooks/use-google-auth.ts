import { useCallback, useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { apiService } from '@/lib/api'
import { tokenManager } from '@/lib/api-client'
import { env } from '@/lib/env'
import { useAuthStore } from '@/stores/auth-store'
import { useAuth } from '@/contexts/AuthContext'

// GSI shape for popup-only flow (no One Tap)
interface GoogleGSI {
  accounts?: {
    id: {
      initialize: (config: unknown) => void
      renderButton: (parent: HTMLElement, options: unknown) => void
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
  const [isGoogleReady, setIsGoogleReady] = useState(false)
  const [buttonContainer, setButtonContainer] = useState<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const renderedRef = useRef(false)
  const { initializeAuth } = useAuthStore()
  const { refreshUser } = useAuth()

  // Load Google script; no One Tap, no prompt() – popup only (like Vercel)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => setIsGoogleReady(true)
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  const handleGoogleCredential = useCallback(async (response: any) => {
    try {
      setIsLoading(true)
      const idToken = response.credential

      const result = await apiService.googleAuth({ idToken })

      // Backend may return tokens top-level or under .data; support both (same as email/password flow)
      const accessToken =
        (result as { accessToken?: string }).accessToken ??
        (result as { data?: { accessToken?: string } }).data?.accessToken
      const refreshToken =
        (result as { refreshToken?: string }).refreshToken ??
        (result as { data?: { refreshToken?: string } }).data?.refreshToken

      if (result.success && accessToken) {
        // Store tokens immediately (same as email/password) so onboarding and all API calls have them
        tokenManager.setTokens(accessToken, refreshToken || '')
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken)
          if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
        }

        await initializeAuth()
        await refreshUser()

        // Check onboarding
        let hasCompletedOnboarding = false
        try {
          const onboardingRes = await apiService.getOnboardingStatus()
          const data = onboardingRes.data as { data?: { onboardingCompleted?: boolean }; onboardingCompleted?: boolean } | undefined
          hasCompletedOnboarding = data?.data?.onboardingCompleted ?? data?.onboardingCompleted ?? false
        } catch (e) {
            console.warn('Failed to check onboarding:', e)
        }

        // Redirect logic
        const redirectParam = searchParams?.get('redirect')
        const user = (result as { user?: { firstName?: string } }).user ?? (result as { data?: { user?: { firstName?: string } } }).data?.user
        if (!hasCompletedOnboarding) {
          toast.success('Welcome! Let\'s set up your profile.')
          router.push('/onboarding')
        } else {
          toast.success(`Welcome back${user?.firstName ? ', ' + user.firstName : ''}!`)
          if (redirectParam) router.push(redirectParam)
          else router.push('/')
        }
      } else {
        throw new Error((result as { message?: string }).message || 'Authentication failed')
      }
    } catch (error: any) {
      console.error('Google auth error:', error)
      toast.error(error.message || 'Failed to sign in with Google')
    } finally {
      setIsLoading(false)
    }
  }, [router, searchParams, initializeAuth, refreshUser])

  // When script is ready and we have a container, initialize with popup and render the official Google button
  // (like Vercel: clicking it opens the account-selection popup)
  useEffect(() => {
    const clientId = env.GOOGLE_CLIENT_ID?.trim()
    if (!isGoogleReady || !buttonContainer || !clientId) return

    const g = getGoogleGSI()
    if (!g?.accounts?.id) return

    if (renderedRef.current) return
    renderedRef.current = true

    g.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredential,
      ux_mode: 'popup', // always open account-selection popup when user clicks the button
      auto_select: false,
    })

    g.accounts.id.renderButton(buttonContainer, {
      type: 'standard',
      size: 'large',
      theme: 'outline',
      text: 'continue_with',
      shape: 'rectangular',
      width: 320,
    })

    return () => {
      renderedRef.current = false
      buttonContainer.innerHTML = ''
    }
  }, [isGoogleReady, buttonContainer, handleGoogleCredential])

  const setGoogleButtonRef = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el
    setButtonContainer(el)
  }, [])

  // Click the hidden Google button so the account-selection popup opens (generic button stays normal)
  const openGoogleSignIn = useCallback(() => {
    if (!containerRef.current) {
      toast.error('Google Sign-In is still loading. Please try again in a moment.')
      return
    }
    const btn = containerRef.current.querySelector('div[role="button"]') as HTMLElement | null
    if (btn) {
      btn.click()
    } else {
      toast.error('Google Sign-In is still loading. Please try again in a moment.')
    }
  }, [])

  return {
    setGoogleButtonRef,
    openGoogleSignIn,
    isLoading,
    isGoogleReady,
  }
}

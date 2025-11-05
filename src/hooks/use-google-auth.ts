import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const useGoogleAuth = () => {
  const router = useRouter()

  const openCenteredPopup = (url: string, title: string, w: number, h: number) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY
    const width = window.innerWidth || document.documentElement.clientWidth || screen.width
    const height = window.innerHeight || document.documentElement.clientHeight || screen.height
    const systemZoom = width / window.screen.availWidth
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const features = `scrollbars=yes, width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`
    return window.open(url, title, features)
  }

  const signInWithGoogle = useCallback(async () => {
    try {
      // Backend URL - this is the Express server, not Next.js frontend
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      
      console.log('Requesting Google OAuth URL from backend:', backendUrl)

      // Step 1: Request OAuth URL from backend
      const response = await fetch(`${backendUrl}/api/auth/google`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Backend response:', data)
      
      if (!data.success || !data.url) {
        throw new Error(data.message || 'Failed to get Google OAuth URL')
      }

      // Step 2: Set up message listener BEFORE opening popup
      let messageReceived = false
      let popup: Window | null = null
      let checkInterval: NodeJS.Timeout | null = null
      let timeoutId: NodeJS.Timeout | null = null

      const handleMessage = async (event: MessageEvent) => {
        // Security: Only accept messages from same origin (callback page)
        if (event.origin !== window.location.origin) {
          console.warn('🟡 MAIN: Rejected message from different origin:', event.origin)
          return
        }

        console.log('🟢 MAIN: Received message:', event.data)

        if (event.data?.type === 'google-auth-success') {
          if (messageReceived) {
            console.log('🟢 MAIN: Message already processed, ignoring duplicate')
            return
          }
          messageReceived = true

          const { accessToken, refreshToken } = event.data
          
          console.log('🟢 MAIN: Processing auth success message')
          
          // Clean up listener immediately
          window.removeEventListener('message', handleMessage)
          if (checkInterval) clearInterval(checkInterval)
          if (timeoutId) clearTimeout(timeoutId)
          
          // Close popup if still open
          if (popup && !popup.closed) {
            console.log('🟢 MAIN: Closing popup window')
            try {
              popup.close()
            } catch (e) {
              console.error('🟢 MAIN: Error closing popup:', e)
            }
          }
          
          // Store tokens in both tokenManager and localStorage
          if (accessToken) {
            const { tokenManager } = await import('@/lib/api-client')
            tokenManager.setTokens(accessToken, refreshToken || '')
            localStorage.setItem('accessToken', accessToken)
            console.log('🟢 MAIN: Tokens stored in tokenManager and localStorage')
          }
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken)
          }
          
          // Refresh user profile to update auth state
          try {
            const { useAuthStore } = await import('@/stores/auth-store')
            const { refreshUser } = useAuthStore.getState()
            console.log('🟢 MAIN: Refreshing user profile...')
            await refreshUser()
            console.log('🟢 MAIN: User profile refreshed successfully')
          } catch (error) {
            console.error('🟢 MAIN: Failed to refresh user after Google sign-in:', error)
          }
          
          // Check onboarding status and redirect
          try {
            const { api } = await import('@/lib/api-client')
            const onboardingResponse = await api.preferences.onboardingStatus()
            const hasCompletedOnboarding = onboardingResponse.data?.data?.onboardingCompleted || false
            
            console.log('🟢 MAIN: Onboarding completed:', hasCompletedOnboarding)
            
            if (!hasCompletedOnboarding) {
              router.push('/onboarding')
            } else {
              router.push('/')
            }
          } catch (error) {
            console.warn('🟢 MAIN: Onboarding check failed, redirecting to home:', error)
            router.push('/')
          }
          
          // Small delay before reload to allow navigation
          setTimeout(() => {
            console.log('🟢 MAIN: Reloading page to update state')
            window.location.reload()
          }, 100)
          
        } else if (event.data?.type === 'google-auth-error') {
          const { error, errorDescription } = event.data
          
          console.error('🔴 MAIN: Auth error received:', error, errorDescription)
          
          // Clean up listener
          window.removeEventListener('message', handleMessage)
          if (checkInterval) clearInterval(checkInterval)
          if (timeoutId) clearTimeout(timeoutId)
          
          // Close popup if still open
          if (popup && !popup.closed) {
            popup.close()
          }
          
          // Show error toast
          const { toast } = await import('sonner')
          toast.error('Google sign-in failed', {
            description: errorDescription || error || 'Unknown error'
          })
        }
      }

      // Set up listener BEFORE opening popup
      console.log('🟡 MAIN: Setting up message listener')
      window.addEventListener('message', handleMessage)

      // Step 3: Open Google OAuth in popup
      console.log('🟡 MAIN: Opening popup window')
      popup = openCenteredPopup(data.url, 'Sign in with Google', 500, 600)

      if (!popup) {
        window.removeEventListener('message', handleMessage)
        alert('Popup blocked. Please allow popups for Google sign-in.')
        return
      }

      // Backup method: Poll localStorage for tokens
      // Since localStorage is shared between popup and main window,
      // we can detect when popup stores tokens even if postMessage fails
      const initialToken = localStorage.getItem('accessToken')
      
      checkInterval = setInterval(() => {
        if (messageReceived) {
          if (checkInterval) {
            clearInterval(checkInterval)
            checkInterval = null
          }
          return
        }

        // Check if popup was closed manually
        if (popup && popup.closed && !messageReceived) {
          console.log('🟡 MAIN: Popup was closed manually before completion')
          if (checkInterval) {
            clearInterval(checkInterval)
            checkInterval = null
          }
          window.removeEventListener('message', handleMessage)
          return
        }

        // Check if new tokens appeared in localStorage (popup stored them)
        const currentToken = localStorage.getItem('accessToken')
        if (currentToken && currentToken !== initialToken) {
          console.log('🟡 MAIN: Detected new tokens in localStorage (popup stored them)')
          
          // Get refresh token
          const refreshToken = localStorage.getItem('refreshToken') || ''
          
          // Trigger handler manually
          const fakeEvent = {
            origin: window.location.origin,
            data: {
              type: 'google-auth-success',
              accessToken: currentToken,
              refreshToken
            }
          } as MessageEvent

          handleMessage(fakeEvent)
          
          // Clean up
          if (checkInterval) {
            clearInterval(checkInterval)
            checkInterval = null
          }
        }
      }, 300) // Check every 300ms

      // Cleanup after 5 minutes (timeout)
      timeoutId = setTimeout(() => {
        console.warn('🟡 MAIN: Auth timeout after 5 minutes')
        if (checkInterval) {
          clearInterval(checkInterval)
          checkInterval = null
        }
        window.removeEventListener('message', handleMessage)
        if (popup && !popup.closed) {
          popup.close()
        }
      }, 300000) // 5 minutes

    } catch (error) {
      console.error('Google sign-in error:', error)
      alert('Failed to initiate Google sign-in. Please make sure the backend is running.')
    }
  }, [router])

  return {
    signInWithGoogle,
    isLoading: false,
  }
}

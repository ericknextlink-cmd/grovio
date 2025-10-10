import { useCallback } from 'react'
import { useAuthStore } from '@/stores/auth-store'

declare global {
  interface Window {
    google: any
  }
}

export const useGoogleAuth = () => {
  const { signinWithGoogle, isLoading } = useAuthStore()

  const initializeGoogle = useCallback(() => {
    if (typeof window === 'undefined' || window.google) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return new Promise<void>((resolve) => {
      script.onload = () => {
        if (window.google) {
          // Initialize Google Identity Services
          window.google.accounts.id.initialize({
            // We don't need client_id here since the backend handles the OAuth flow
            callback: handleGoogleResponse,
          })
          resolve()
        }
      }
    })
  }, [])

  const handleGoogleResponse = useCallback(async (response: any) => {
    try {
      const { credential } = response
      // Send the Google ID token to our backend
      await signinWithGoogle(credential)
    } catch (error) {
      console.error('Google signin error:', error)
    }
  }, [signinWithGoogle])

  const signInWithGoogle = useCallback(async () => {
    try {
      await initializeGoogle()
      
      if (window.google) {
        // Trigger Google Sign-In popup
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('Google signin popup was not displayed')
          }
        })
      }
    } catch (error) {
      console.error('Failed to initialize Google signin:', error)
    }
  }, [initializeGoogle])

  return {
    signInWithGoogle,
    isLoading,
  }
}

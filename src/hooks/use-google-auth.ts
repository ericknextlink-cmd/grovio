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

      // Step 2: Open Google OAuth in popup
      // The backend will handle the callback and redirect back to frontend
      const popup = openCenteredPopup(data.url, 'Sign in with Google', 500, 600)

      if (!popup) {
        alert('Popup blocked. Please allow popups for Google sign-in.')
        return
      }

      // Step 3: Listen for the OAuth callback
      // Backend redirects to: FRONTEND_URL/auth/callback?access_token=...&refresh_token=...
      const handleMessage = (event: MessageEvent) => {
        // Security: Only accept messages from our backend origin
        const backendOrigin = new URL(backendUrl).origin
        if (event.origin !== backendOrigin && event.origin !== window.location.origin) {
          return
        }

        if (event.data?.type === 'google-auth-success') {
          popup.close()
          window.removeEventListener('message', handleMessage)
          
          // Store tokens if provided
          if (event.data.accessToken) {
            localStorage.setItem('accessToken', event.data.accessToken)
          }
          if (event.data.refreshToken) {
            localStorage.setItem('refreshToken', event.data.refreshToken)
          }
          
          // Redirect to home or dashboard
          router.push('/')
          window.location.reload() // Refresh to update auth state
        } else if (event.data?.type === 'google-auth-error') {
          popup.close()
          window.removeEventListener('message', handleMessage)
          alert('Google sign-in failed: ' + (event.data.error || 'Unknown error'))
        }
      }

      window.addEventListener('message', handleMessage)

      // Cleanup if popup is closed manually
      const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopupClosed)
          window.removeEventListener('message', handleMessage)
        }
      }, 1000)

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

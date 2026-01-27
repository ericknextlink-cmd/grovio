import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useGoogleAuth = () => {
  const router = useRouter()

  const signInWithGoogle = useCallback(async () => {
    try {
      // Backend URL - this is the Express server
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      
      console.log('Redirecting to Google OAuth via backend:', backendUrl)

      // Determine where to redirect after auth (current page or dashboard)
      const currentPath = window.location.pathname
      const redirectTo = currentPath === '/login' || currentPath === '/signup' 
        ? '/dashboard' 
        : currentPath

      // Construct the backend auth URL with redirect param
      // The backend will handle the redirection to Google
      const authUrl = `${backendUrl}/api/auth/google?redirectTo=${encodeURIComponent(redirectTo)}`
      
      // Redirect the browser
      window.location.href = authUrl
      
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Failed to initiate Google sign-in. Please try again.')
    }
  }, [router])

  return {
    signInWithGoogle,
    isLoading: false,
  }
}



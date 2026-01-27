import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const useGoogleAuth = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const signInWithGoogle = useCallback(async () => {
    try {
      // Backend URL - this is the Express server
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      
      console.log('Redirecting to Google OAuth via backend:', backendUrl)

      // Determine where to redirect after auth
      // 1. Check for 'redirect' query param (e.g. from protected route redirect)
      const redirectParam = searchParams?.get('redirect')
      
      // 2. Fallback logic
      const currentPath = window.location.pathname
      
      let redirectTo = '/' // Default
      
      if (redirectParam) {
        redirectTo = redirectParam
      } else if (currentPath !== '/login' && currentPath !== '/signup') {
        // If user is on a specific page (not auth pages), return them there
        redirectTo = currentPath
      }

      // Construct the backend auth URL with redirect param
      // The backend will handle the redirection to Google
      const authUrl = `${backendUrl}/api/auth/google?redirectTo=${encodeURIComponent(redirectTo)}`
      
      // Redirect the browser
      window.location.href = authUrl
      
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Failed to initiate Google sign-in. Please try again.')
    }
  }, [router, searchParams])

  return {
    signInWithGoogle,
    isLoading: false,
  }
}

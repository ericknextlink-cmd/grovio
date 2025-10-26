"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get tokens from URL params (sent by backend after Google OAuth)
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const error = searchParams.get('error')

    if (error) {
      // Handle error from backend
      console.error('Auth error:', error)
      alert(`Authentication failed: ${error}`)
      router.push('/login')
      return
    }

    if (accessToken && refreshToken) {
      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      // Notify parent window if opened in popup
      if (window.opener) {
        window.opener.postMessage({
          type: 'google-auth-success',
          accessToken,
          refreshToken
        }, window.location.origin)
        window.close()
      } else {
        // Not in popup, redirect normally
        router.push('/')
        window.location.reload() // Refresh to update auth state
      }
    } else {
      // No tokens received
      console.error('No tokens received from backend')
      alert('Authentication failed: No tokens received')
      router.push('/login')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D35F0E] mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign-in...</p>
      </div>
    </div>
  )
}


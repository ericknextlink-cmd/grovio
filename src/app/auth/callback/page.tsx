"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { toast } from 'sonner'
import { api, tokenManager } from '@/lib/api-client'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { refreshUser } = useAuthStore()
  const [status, setStatus] = useState('Completing sign-in...')

  // Parse hash fragment (Supabase/backend returns tokens in hash, not query params)
  const parseHashParams = () => {
    const hash = window.location.hash.substring(1) // Remove the '#'
    const params = new URLSearchParams(hash)
    return {
      accessToken: params.get('access_token'),
      refreshToken: params.get('refresh_token') || params.get('provider_refresh_token'),
      expiresIn: params.get('expires_in'),
      tokenType: params.get('token_type'),
      error: params.get('error'),
      errorDescription: params.get('error_description')
    }
  }

  // Parse query params (fallback)
  const parseQueryParams = () => {
    const params = new URLSearchParams(window.location.search)
    return {
      accessToken: params.get('access_token'),
      refreshToken: params.get('refresh_token'),
      error: params.get('error'),
      errorDescription: params.get('error_description'),
      type: params.get('type'), // For email verification: type=signup
      token: params.get('token') // Email verification token (before Supabase processes it)
    }
  }

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Try hash first (Supabase style), then query params (custom backend)
        const hashParams = parseHashParams()
        const queryParams = parseQueryParams()
        
        const accessToken = hashParams.accessToken || queryParams.accessToken
        const refreshToken = hashParams.refreshToken || queryParams.refreshToken
        const error = hashParams.error || queryParams.error
        const errorDescription = hashParams.errorDescription || queryParams.errorDescription
        const verificationType = queryParams.type // 'signup' for email verification
        
        // Check if this is an email verification flow
        // Note: When Supabase processes email verification, it redirects with tokens in hash
        // So if we have type=signup in query but tokens in hash, it means verification was successful
        const isEmailVerification = verificationType === 'signup' || (hashParams.accessToken && window.location.search.includes('type=signup'))

        // Handle errors
        if (error) {
          console.error('Auth error:', error, errorDescription)
          
          // Notify parent window if in popup
          if (window.opener) {
            window.opener.postMessage({
              type: 'google-auth-error',
              error,
              errorDescription
            }, window.location.origin)
            window.close()
            return
          }
          
          toast.error(`Authentication failed: ${errorDescription || error}`)
          router.push('/login')
          return
        }

        if (accessToken) {
          // Store tokens FIRST - this is critical for subsequent API calls
          tokenManager.setTokens(accessToken, refreshToken || '')
          
          // Also store in localStorage directly (tokenManager should do this, but ensure it's there)
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', accessToken)
            if (refreshToken) {
              localStorage.setItem('refreshToken', refreshToken)
            }
          }

          console.log('Tokens stored successfully', { 
            hasAccessToken: !!accessToken, 
            hasRefreshToken: !!refreshToken 
          })
          
          // Small delay to ensure tokens are fully synced
          await new Promise(resolve => setTimeout(resolve, 100))

          // If in popup, notify parent and close
          if (window.opener && !window.opener.closed) {
            setStatus('Completing sign-in...')
            console.log('POPUP: Detected window.opener, sending message to parent')
            
            // Store tokens in localStorage first (so parent can access them)
            localStorage.setItem('accessToken', accessToken)
            if (refreshToken) {
              localStorage.setItem('refreshToken', refreshToken)
            }
            console.log('POPUP: Tokens stored in localStorage')

            // Try to fetch user profile (optional, don't block on this)
            try {
              await refreshUser()
              console.log('POPUP: User profile refreshed')
            } catch (error) {
              console.error('POPUP: Failed to refresh user (non-blocking):', error)
            }

            // Send success message to opener multiple times (in case first is missed)
            const message = {
              type: 'google-auth-success',
              accessToken,
              refreshToken: refreshToken || '',
              timestamp: Date.now()
            }

            console.log('POPUP: Sending message to parent:', message)
            
            // Send immediately
            window.opener.postMessage(message, window.location.origin)
            
            // Send again after short delay (in case parent wasn't ready)
            setTimeout(() => {
              console.log('POPUP: Sending message again (retry 1)')
              window.opener.postMessage(message, window.location.origin)
            }, 100)

            setTimeout(() => {
              console.log('POPUP: Sending message again (retry 2)')
              window.opener.postMessage(message, window.location.origin)
            }, 300)

            // Clear hash from URL
            window.history.replaceState(null, '', window.location.pathname)

            // Wait a bit longer before closing to ensure message is received
            setTimeout(() => {
              console.log('POPUP: Closing window')
              try {
                window.close()
              } catch (e) {
                console.error('POPUP: Could not close window:', e)
                // If close fails, try redirecting to a close confirmation page
                window.location.href = 'about:blank'
              }
            }, 1000)
            return
          }

            // Not in popup, fetch user profile and check onboarding status
          setStatus('Loading your profile...')
          
          // Verify token is accessible before making API calls
          const storedToken = tokenManager.getAccessToken()
          if (!storedToken) {
            console.error('Token not available after storage')
            toast.error('Authentication failed: Token not found')
            router.push('/login')
            return
          }
          
          // Double-check token is in localStorage (tokenManager should have synced it)
          const localStorageToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
          if (!localStorageToken) {
            console.warn('Token not in localStorage, re-syncing...')
            tokenManager.setTokens(accessToken, refreshToken || '')
          }
          
          console.log('Token verified, proceeding with API calls', {
            hasToken: !!storedToken,
            hasLocalStorageToken: !!localStorageToken,
            tokenLength: storedToken?.length || 0
          })
          
          let userProfileLoaded = false
          let hasCompletedOnboarding = false
          
          try {
            // For newly email-verified users, skip profile fetch - profile doesn't exist yet
            // For OAuth/returning users, try to fetch profile
            if (!isEmailVerification) {
              setStatus('Loading your profile...')
              try {
                await refreshUser()
                console.log('User profile loaded')
                userProfileLoaded = true
              } catch (profileError: any) {
                // Silently handle errors for profile fetch - not critical
                const errorMessage = profileError?.response?.data?.message || ''
                const isUserNotFound = errorMessage.includes('User not found') || 
                                      errorMessage.includes('User profile not found')
                
                if (!isUserNotFound) {
                  // Only log non-"not found" errors
                  console.warn('Failed to load user profile (non-critical):', errorMessage || profileError.message)
                }
                userProfileLoaded = false
              }
            } else {
              // For email verification, skip profile fetch - it won't exist yet
              console.log('Skipping profile fetch for newly email-verified user')
              userProfileLoaded = false
            }
            
            // Check onboarding status - but handle 401 gracefully
            if (tokenManager.isAuthenticated()) {
              setStatus('Checking your preferences...')
              try {
                const onboardingResponse = await api.preferences.onboardingStatus()
                hasCompletedOnboarding = onboardingResponse.data?.data?.onboardingCompleted || false
                console.log('Onboarding status:', hasCompletedOnboarding)
              } catch (onboardingError: any) {
                const errorStatus = onboardingError?.response?.status
                const errorMessage = onboardingError?.response?.data?.message || ''
                
                // For 401 errors, try token refresh once
                if (errorStatus === 401 && !isEmailVerification) {
                  console.warn('Onboarding check failed with 401, attempting token refresh...')
                  const refreshToken = tokenManager.getRefreshToken()
                  if (refreshToken) {
                    try {
                      const refreshResponse = await api.auth.refresh({ refreshToken })
                      if (refreshResponse.data.success && refreshResponse.data.accessToken) {
                        const newAccessToken = refreshResponse.data.accessToken
                        const newRefreshToken = refreshResponse.data.refreshToken || refreshToken
                        tokenManager.setTokens(newAccessToken, newRefreshToken)
                        // Small delay to ensure token is synced
                        await new Promise(resolve => setTimeout(resolve, 200))
                        
                        // Retry onboarding check with new token
                        try {
                          const retryResponse = await api.preferences.onboardingStatus()
                          hasCompletedOnboarding = retryResponse.data?.data?.onboardingCompleted || false
                          console.log('Onboarding status after token refresh:', hasCompletedOnboarding)
                        } catch (retryError: any) {
                          // If retry still fails, assume onboarding not completed
                          console.warn('Onboarding check still failed after token refresh, assuming not completed')
                          hasCompletedOnboarding = false
                        }
                      } else {
                        hasCompletedOnboarding = false
                      }
                    } catch (refreshError) {
                      console.warn('Token refresh failed, assuming onboarding not completed:', refreshError)
                      hasCompletedOnboarding = false
                    }
                  } else {
                    hasCompletedOnboarding = false
                  }
                } else {
                  // For email verification or other errors, assume onboarding not completed
                  if (isEmailVerification) {
                    console.log('Email-verified user - assuming onboarding not completed')
                  } else {
                    console.warn('Onboarding check failed (non-critical):', errorMessage || onboardingError.message)
                  }
                  hasCompletedOnboarding = false
                }
              }
            } else {
              // No token, assume onboarding not completed
              hasCompletedOnboarding = false
            }
            
            // Clear hash and query params from URL
            window.history.replaceState(null, '', window.location.pathname)
            
            // Show appropriate message based on verification type
            if (isEmailVerification) {
              toast.success('Email verified successfully!', {
                description: 'Your account has been confirmed.'
              })
            }
            
            // For new email-verified users, always go to onboarding
            // For returning users, check onboarding status
            if (!hasCompletedOnboarding) {
              // First time user - redirect to onboarding
              setStatus('Setting up your account...')
              if (!isEmailVerification) {
                toast.success('Welcome! Let\'s personalize your experience')
              }
              router.push('/onboarding')
            } else {
              // Returning user - redirect to home
              if (!isEmailVerification) {
                toast.success('Welcome back!')
              }
              router.push('/')
            }
          } catch (error: any) {
            console.error('Unexpected error in callback:', error)
            // Still allow navigation to onboarding for new users
            window.history.replaceState(null, '', window.location.pathname)
            if (isEmailVerification) {
              toast.success('Email verified successfully!')
              router.push('/onboarding')
            } else {
              toast.success('Welcome!')
              router.push('/')
            }
          }
        } else {
          // No tokens received
          console.error('No tokens received from backend')
          
          // Notify parent if in popup
          if (window.opener) {
            window.opener.postMessage({
              type: 'google-auth-error',
              error: 'no_tokens',
              errorDescription: 'No tokens received from authentication provider'
            }, window.location.origin)
            window.close()
            return
          }
          
          toast.error('Authentication failed: No tokens received')
          router.push('/login')
        }
      } catch (error) {
        console.error('Callback error:', error)
        
        // Notify parent if in popup
        if (window.opener) {
          window.opener.postMessage({
            type: 'google-auth-error',
            error: 'callback_error',
            errorDescription: error instanceof Error ? error.message : 'Unknown error'
          }, window.location.origin)
          window.close()
          return
        }
        
        toast.error('Something went wrong during sign-in')
        router.push('/login')
      }
    }

    handleCallback()
  }, [router, refreshUser])

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#232F3E] to-[#B7DFF5]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D35F0E] mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">{status}</p>
      </div>
    </div>
  )
}


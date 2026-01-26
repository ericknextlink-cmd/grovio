/**
 * Onboarding Guard Hook
 * 
 * Ensures users complete onboarding before accessing the app.
 * Runs on every page load to check if onboarding is completed.
 */

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { api } from '@/lib/api-client'

// Pages that don't require onboarding
const PUBLIC_ROUTES = [
  '/login',
  '/signup',
  '/auth/callback',
  '/onboarding',
  '/forgot-password',
  '/reset-password',
  '/', // Allow home page without onboarding for browsing
  '/products',
  '/shop',
  '/about',
  '/contact'
]

// Pages that require onboarding to be completed
const PROTECTED_ROUTES = [
  '/cart',
  '/checkout',
  '/orders',
  '/profile',
  '/ai-chat',
  '/favorites',
  '/payment'
]

export function useOnboardingGuard() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading: authLoading, user } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)
  const [onboardingCompleted, setOnboardingCompleted] = useState(false)

  useEffect(() => {
    if (authLoading) {
      return
    }

    // Don't check if not authenticated
    if (!isAuthenticated) {
      setIsChecking(false)
      return
    }

    // Don't check on public routes or onboarding page itself
    if (PUBLIC_ROUTES.includes(pathname) || pathname === '/onboarding') {
      setIsChecking(false)
      return
    }

    // Check if current route requires onboarding
    const requiresOnboarding = PROTECTED_ROUTES.some(route => 
      pathname.startsWith(route)
    )

    if (!requiresOnboarding) {
      setIsChecking(false)
      return
    }

    // Check onboarding status
    checkOnboardingStatus()
  }, [pathname, isAuthenticated, authLoading])

  const checkOnboardingStatus = async () => {
    setIsChecking(true)
    
    try {
      // First, try to get from backend
      const response = await api.preferences.onboardingStatus()
      const completed = response.data?.data?.onboardingCompleted || false
      
      setOnboardingCompleted(completed)
      
      // If not completed and on protected route, redirect to onboarding
      if (!completed) {
        console.log('Onboarding not completed, redirecting...')
        router.push('/onboarding')
      }
    } catch (error) {
      // Fallback to localStorage if backend fails
      console.warn('Failed to check backend onboarding status:', error)
      
      const localCompleted = localStorage.getItem('onboarding_completed') === 'true'
      setOnboardingCompleted(localCompleted)
      
      if (!localCompleted) {
        console.log('Onboarding not completed (localStorage), redirecting...')
        router.push('/onboarding')
      }
    } finally {
      setIsChecking(false)
    }
  }

  return {
    isChecking,
    onboardingCompleted,
    requiresOnboarding: PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  }
}


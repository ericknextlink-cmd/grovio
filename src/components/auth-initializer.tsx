"use client"

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'

/**
 * Client component that initializes auth state from localStorage tokens
 * on app mount. Should be rendered at the root level.
 */
export function AuthInitializer() {
  const { initializeAuth } = useAuthStore()

  useEffect(() => {
    // Initialize auth state from tokens on mount
    initializeAuth()
  }, [initializeAuth])

  return null // This component doesn't render anything
}


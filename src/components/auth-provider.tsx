"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { refreshUser, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Refresh user data on app load if authenticated
    if (isAuthenticated) {
      refreshUser()
    }
  }, [isAuthenticated, refreshUser])

  return <>{children}</>
}

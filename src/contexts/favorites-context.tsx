"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/lib/types"
import { api } from "@/lib/api-client"
import { tokenManager } from "@/lib/api-client"
import { useAuthStore } from "@/stores/auth-store"

interface FavoritesContextType {
  favorites: Product[]
  isLoading: boolean
  addToFavorites: (product: Product) => Promise<void>
  removeFromFavorites: (productId: string) => Promise<void>
  toggleFavorite: (product: Product) => Promise<void>
  isFavorite: (productId: string) => boolean
  clearFavorites: () => Promise<void>
  getFavoritesCount: () => number
  syncFavorites: () => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuthStore()

  // Load favorites from backend or localStorage
  const loadFavorites = async () => {
    setIsLoading(true)
    try {
      const hasToken = tokenManager.isAuthenticated()
      
      if (hasToken && isAuthenticated) {
        // Load from backend
        try {
          const response = await api.favorites.get()
          if (response.data.success && response.data.data) {
            const backendFavorites = Array.isArray(response.data.data) 
              ? response.data.data 
              : [response.data.data]
            // Extract product from each favorite item
            const products = backendFavorites.map((fav: any) => fav.product || fav)
            setFavorites(products)
            // Also save to localStorage as backup
            localStorage.setItem('grovio-favorites', JSON.stringify(products))
            return
          }
        } catch (error: any) {
          console.warn('Failed to load favorites from backend, using localStorage:', error)
          // Fall through to localStorage
        }
      }
      
      // Fallback to localStorage
      const savedFavorites = localStorage.getItem('grovio-favorites')
      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites)
          setFavorites(parsedFavorites)
        } catch (error) {
          console.error('Error loading favorites from localStorage:', error)
        }
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load favorites on mount and when auth state changes
  useEffect(() => {
    loadFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  // Sync favorites to backend when authenticated
  const syncFavorites = async () => {
    if (!tokenManager.isAuthenticated() || !isAuthenticated) {
      return
    }

    try {
      // Get current localStorage favorites
      const savedFavorites = localStorage.getItem('grovio-favorites')
      if (savedFavorites) {
        const localFavorites = JSON.parse(savedFavorites)
        
        // Sync each favorite to backend
        for (const product of localFavorites) {
          try {
            await api.favorites.addOrRemove({
              product_id: product.id,
              action: 'add',
            })
          } catch (error) {
            console.warn(`Failed to sync favorite ${product.id} to backend:`, error)
          }
        }
        
        // Reload favorites from backend to get full product data
        await loadFavorites()
      }
    } catch (error) {
      console.error('Error syncing favorites to backend:', error)
    }
  }

  // Sync localStorage favorites to backend when user logs in
  useEffect(() => {
    if (isAuthenticated && tokenManager.isAuthenticated()) {
      syncFavorites()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const addToFavorites = async (product: Product) => {
    // Check if already in favorites
    if (favorites.some(fav => fav.id === product.id)) {
      return
    }

    const hasToken = tokenManager.isAuthenticated()
    
    // Optimistically update UI
    setFavorites(prevFavorites => [...prevFavorites, product])

    // Sync to backend if authenticated
    if (hasToken && isAuthenticated) {
      try {
        await api.favorites.addOrRemove({
          product_id: product.id,
          action: 'add',
        })
        // Reload from backend to get updated data
        await loadFavorites()
      } catch (error: any) {
        console.error('Failed to add to favorites on backend:', error)
        // Revert optimistic update on error
        await loadFavorites()
      }
    } else {
      // Save to localStorage
      setFavorites(currentFavorites => {
        localStorage.setItem('grovio-favorites', JSON.stringify(currentFavorites))
        return currentFavorites
      })
    }
  }

  const removeFromFavorites = async (productId: string) => {
    const hasToken = tokenManager.isAuthenticated()
    
    // Optimistically update UI
    setFavorites(prevFavorites => 
      prevFavorites.filter(fav => fav.id !== productId)
    )

    // Sync to backend if authenticated
    if (hasToken && isAuthenticated) {
      try {
        await api.favorites.addOrRemove({
          product_id: productId,
          action: 'remove',
        })
        // Reload from backend to confirm
        await loadFavorites()
      } catch (error: any) {
        console.error('Failed to remove from favorites on backend:', error)
        // Revert optimistic update on error
        await loadFavorites()
      }
    } else {
      // Save to localStorage
      setFavorites(currentFavorites => {
        localStorage.setItem('grovio-favorites', JSON.stringify(currentFavorites))
        return currentFavorites
      })
    }
  }

  const toggleFavorite = async (product: Product) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === product.id)
    if (isAlreadyFavorite) {
      await removeFromFavorites(product.id)
    } else {
      await addToFavorites(product)
    }
  }

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId)
  }

  const clearFavorites = async () => {
    const hasToken = tokenManager.isAuthenticated()
    
    // Optimistically update UI
    setFavorites([])

    // Sync to backend if authenticated (remove each item)
    if (hasToken && isAuthenticated) {
      try {
        // Remove all favorites from backend
        const currentFavorites = [...favorites]
        for (const product of currentFavorites) {
          try {
            await api.favorites.addOrRemove({
              product_id: product.id,
              action: 'remove',
            })
          } catch (error) {
            console.warn(`Failed to remove favorite ${product.id} from backend:`, error)
          }
        }
        // Reload from backend to confirm
        await loadFavorites()
      } catch (error: any) {
        console.error('Failed to clear favorites on backend:', error)
        // Revert optimistic update on error
        await loadFavorites()
      }
    } else {
      // Clear localStorage
      localStorage.removeItem('grovio-favorites')
    }
  }

  const getFavoritesCount = () => {
    return favorites.length
  }

  const value: FavoritesContextType = {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesCount,
    syncFavorites,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

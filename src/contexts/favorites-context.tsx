"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/lib/types"

interface FavoritesContextType {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: string) => boolean
  clearFavorites: () => void
  getFavoritesCount: () => number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('grovio-favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('grovio-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.find(fav => fav.id === product.id)) {
        return prevFavorites // Already in favorites
      }
      return [...prevFavorites, product]
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(fav => fav.id !== productId)
    )
  }

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.find(fav => fav.id === product.id)
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id)
      } else {
        return [...prevFavorites, product]
      }
    })
  }

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const getFavoritesCount = () => {
    return favorites.length
  }

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesCount
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

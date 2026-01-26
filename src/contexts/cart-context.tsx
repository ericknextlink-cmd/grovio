"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/lib/types"
import { api } from "@/lib/api-client"
import { tokenManager } from "@/lib/api-client"
import { useAuthStore } from "@/stores/auth-store"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  slug: string
  description?: string
  size?: string
}

interface CartContextType {
  items: CartItem[]
  isLoading: boolean
  addToCart: (product: Product, quantity?: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getTotalPrice: () => number
  getTotalItems: () => number
  getUniqueItemCount: () => number
  syncCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuthStore()

  // Convert backend cart item to frontend cart item
  const convertBackendCartItem = (backendItem: any): CartItem => {
    const product = backendItem.product || {}
    return {
      id: backendItem.product_id || product.id,
      name: product.name || '',
      price: product.price || 0,
      quantity: backendItem.quantity || 1,
      image: product.images?.[0] || product.image || '/grocery.png',
      slug: product.slug || '',
      description: product.description,
      size: product.specifications?.size || product.specifications?.weight || '1 unit',
    }
  }

  // Load cart from backend or localStorage
  const loadCart = async () => {
    setIsLoading(true)
    try {
      const hasToken = tokenManager.isAuthenticated()
      
      if (hasToken && isAuthenticated) {
        // Load from backend
        try {
          const response = await api.cart.get()
          if (response.data.success && response.data.data) {
            const backendItems = Array.isArray(response.data.data) 
              ? response.data.data 
              : [response.data.data]
            const convertedItems = backendItems.map(convertBackendCartItem)
            setItems(convertedItems)
            // Also save to localStorage as backup
            localStorage.setItem('grovio-cart', JSON.stringify(convertedItems))
            return
          }
        } catch (error: any) {
          console.warn('Failed to load cart from backend, using localStorage:', error)
          // Fall through to localStorage
        }
      }
      
      // Fallback to localStorage
      const savedCart = localStorage.getItem('grovio-cart')
      if (savedCart) {
        try {
          const parsedItems = JSON.parse(savedCart)
          setItems(parsedItems)
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load cart on mount and when auth state changes
  useEffect(() => {
    loadCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  // Sync localStorage cart to backend when user logs in
  useEffect(() => {
    if (isAuthenticated && tokenManager.isAuthenticated()) {
      syncCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  // Sync cart to backend when authenticated
  const syncCart = async () => {
    if (!tokenManager.isAuthenticated() || !isAuthenticated) {
      return
    }

    try {
      // Get current localStorage cart
      const savedCart = localStorage.getItem('grovio-cart')
      if (savedCart) {
        const localItems = JSON.parse(savedCart)
        
        // Sync each item to backend
        for (const item of localItems) {
          try {
            await api.cart.addOrRemove({
              product_id: item.id,
              action: 'add',
              quantity: item.quantity,
            })
          } catch (error) {
            console.warn(`Failed to sync item ${item.id} to backend:`, error)
          }
        }
        
        // Reload cart from backend to get full product data
        await loadCart()
      }
    } catch (error) {
      console.error('Error syncing cart to backend:', error)
    }
  }

  const addToCart = async (product: Product, quantity: number = 1) => {
    const hasToken = tokenManager.isAuthenticated()
    
    // Optimistically update UI
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // If product already exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // If product doesn't exist, add new item
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images?.[0] || "/grocery.png",
          slug: product.slug || "",
          description: product.description,
          size: product.specifications?.size || product.specifications?.weight || "1 unit"
        }
        return [...prevItems, newItem]
      }
    })

    // Sync to backend if authenticated
    if (hasToken && isAuthenticated) {
      try {
        await api.cart.addOrRemove({
          product_id: product.id,
          action: 'add',
          quantity,
        })
        // Reload from backend to get updated data
        await loadCart()
      } catch (error: any) {
        console.error('Failed to add to cart on backend:', error)
        // Revert optimistic update on error
        await loadCart()
      }
    } else {
      // Save to localStorage
      setItems(currentItems => {
        localStorage.setItem('grovio-cart', JSON.stringify(currentItems))
        return currentItems
      })
    }
  }

  const removeFromCart = async (productId: string) => {
    const hasToken = tokenManager.isAuthenticated()
    
    // Optimistically update UI
    setItems(prevItems => prevItems.filter(item => item.id !== productId))

    // Sync to backend if authenticated
    if (hasToken && isAuthenticated) {
      try {
        await api.cart.addOrRemove({
          product_id: productId,
          action: 'remove',
        })
        // Reload from backend to confirm
        await loadCart()
      } catch (error: any) {
        console.error('Failed to remove from cart on backend:', error)
        // Revert optimistic update on error
        await loadCart()
      }
    } else {
      // Save to localStorage
      setItems(currentItems => {
        localStorage.setItem('grovio-cart', JSON.stringify(currentItems))
        return currentItems
      })
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId)
      return
    }
    
    const hasToken = tokenManager.isAuthenticated()
    const currentItem = items.find(item => item.id === productId)
    
    if (!currentItem) {
      // If item doesn't exist and we want to add it, we can't update quantity
      // This shouldn't happen in normal flow
      return
    }

    // Optimistically update UI
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )

    // Sync to backend if authenticated
    if (hasToken && isAuthenticated) {
      try {
        // Calculate the difference
        const quantityDiff = quantity - currentItem.quantity
        
        if (quantityDiff > 0) {
          // Increase quantity - backend will increment
          await api.cart.addOrRemove({
            product_id: productId,
            action: 'add',
            quantity: quantityDiff,
          })
        } else if (quantityDiff < 0) {
          // For decreasing, remove the item and re-add with the new quantity
          // This is the simplest approach given the API structure
          await api.cart.addOrRemove({
            product_id: productId,
            action: 'remove',
          })
          if (quantity > 0) {
            await api.cart.addOrRemove({
              product_id: productId,
              action: 'add',
              quantity: quantity,
            })
          }
        }
        // Reload from backend to confirm and get accurate data
        await loadCart()
      } catch (error: any) {
        console.error('Failed to update quantity on backend:', error)
        // Revert optimistic update on error
        await loadCart()
      }
    } else {
      // Save to localStorage
      setItems(currentItems => {
        localStorage.setItem('grovio-cart', JSON.stringify(currentItems))
        return currentItems
      })
    }
  }

  const clearCart = async () => {
    const hasToken = tokenManager.isAuthenticated()
    
    // Optimistically update UI
    setItems([])

    // Sync to backend if authenticated
    if (hasToken && isAuthenticated) {
      try {
        await api.cart.clear()
        // Reload from backend to confirm
        await loadCart()
      } catch (error: any) {
        console.error('Failed to clear cart on backend:', error)
        // Revert optimistic update on error
        await loadCart()
      }
    } else {
      // Clear localStorage
      localStorage.removeItem('grovio-cart')
    }
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getUniqueItemCount = () => {
    return items.length
  }

  const value: CartContextType = {
    items,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getUniqueItemCount,
    syncCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, X, ExternalLink } from "lucide-react"
import { products } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"

interface CartItem {
  id: string
  name: string
  description: string
  size: string
  price: number
  quantity: number
  image: string
  reason?: string
  slug?: string
}

interface CartData {
  products: Array<{
    id: string
    name: string
    price: number
    quantity: number
    reason: string
  }>
  totalSavings?: number
  budget?: number
  rationale?: string
}

interface AIShoppingAssistantProps {
  onClose: () => void
  aiResponse?: string
  cartData?: CartData | null
}

// Convert structured cart data to cart items with full product details
const convertCartDataToItems = (cartData: CartData | null): CartItem[] => {
  if (!cartData?.products) return []
  
  console.log("=== CONVERTING CART DATA ===")
  console.log("Cart data:", cartData)
  
  const items: CartItem[] = []
  
  for (const item of cartData.products) {
    // Find the full product details
    const product = products.find(p => p.id === item.id)
    
    if (product) {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        description: product.description || product.category,
        size: product.specifications?.size || product.specifications?.weight || "1 unit",
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0] || "/grocery.png",
        reason: item.reason,
        slug: product.slug
      }
      items.push(cartItem)
      console.log("Added cart item:", cartItem)
    } else {
      console.log("Product not found for ID:", item.id)
    }
  }
  
  console.log("=== FINAL CART ITEMS ===")
  console.log("Total items:", items.length)
  console.log("Items:", items)
  return items
}

export function AIShoppingAssistant({ onClose, aiResponse, cartData }: AIShoppingAssistantProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { addToCart } = useCart()

  // Convert structured cart data to cart items
  useEffect(() => {
    console.log("=== CART DATA EFFECT TRIGGERED ===")
    console.log("Cart data received:", cartData)
    if (cartData) {
      console.log("Converting cart data...")
      const items = convertCartDataToItems(cartData)
      console.log("Setting cart items:", items)
      setCartItems(items)
    } else {
      console.log("No cart data provided")
      setCartItems([])
    }
  }, [cartData])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const addAllToCart = () => {
    // Add all AI suggested items to the main cart
    cartItems.forEach(item => {
      const product = products.find(p => p.id === item.id)
      if (product) {
        // Add the product multiple times based on quantity
        for (let i = 0; i < item.quantity; i++) {
          addToCart(product)
        }
      }
    })
    console.log("Added all AI items to cart:", cartItems)
    onClose() // Close the AI assistant after adding items
  }

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full -ml-52 mt-20 max-w-xl h-[80vh] flex flex-col relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            AI Shopping Assistant Suggestions
          </h2>
          {cartData?.rationale && (
            <p className="text-sm text-gray-600 mt-1">{cartData.rationale}</p>
          )}
        </div>
        
        {/* Scrollable Items List */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 object-cover rounded"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-gray-500 mb-2">{item.size}</p>
                      {item.reason && (
                        <p className="text-xs text-[#D35F0E] font-medium mb-2">{item.reason}</p>
                      )}
                    </div>
                    
                    {/* Product Link Button */}
                    {item.slug && (
                      <Link href={`/product/${item.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-[#D35F0E]"
                          title="View Product Details"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  {/* Counter and trash under the weight */}
                  <div className="flex items-center space-x-2">
                    <div className="border-2 border-[#D35F0E] rounded-full space-x-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 ml-4"
                      onClick={() => removeItem(item.id)}
                    >
                      <Image src="/Trash.svg" alt="Trash" width={20} height={20} />
                    </Button>
                  </div>
                </div>

                {/* Price on the right */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#D35F0E]">GH₵ {item.price}</p>
                </div>
              </div>
            ))}
            
            {cartItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No items in your AI suggestions yet.</p>
                <p className="text-sm text-gray-400 mt-1">Ask the AI for product recommendations!</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Bottom Section - Static */}
        {cartItems.length > 0 && (
          <div className="border-t rounded-b-lg border-gray-200 p-4 space-y-4 bg-white">
            {cartData?.totalSavings && cartData.totalSavings > 0 && (
              <div className="text-center">
                <p className="text-sm text-green-600 font-medium">
                  💰 You save GH₵ {cartData.totalSavings.toFixed(2)} with this bundle!
                </p>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <Button 
                className="w-[30%] bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-3 text-lg rounded-full"
                onClick={addAllToCart}
              >
                Add All to Cart
              </Button>
                <span className="text-lg font-semibold text-gray-800">
                  Subtotal ({totalItems} items): GH₵ {subtotal.toFixed(2)}
                </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIShoppingAssistant
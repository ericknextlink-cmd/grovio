"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, X } from "lucide-react"
import { products } from "@/lib/products"

interface CartItem {
  id: string
  name: string
  description: string
  size: string
  price: number
  quantity: number
  image: string
}


interface AIShoppingAssistantProps {
  onClose: () => void
  aiResponse?: string
}

// Parse AI response to extract product information
const parseAIResponse = (response: string): CartItem[] => {
  const items: CartItem[] = []
  
  // Remove HTML tags and clean up the response
  const cleanResponse = response.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')
  
  console.log("=== PARSING AI RESPONSE ===")
  console.log("Clean response:", cleanResponse)
  
  // Look for patterns like "• Product Name - ₵price"
  const lines = cleanResponse.split('\n').filter(line => line.trim())
  console.log("Split lines:", lines)
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    console.log(`Processing line ${i + 1}:`, line)
    
    // Match pattern: "• Product Name - ₵price" (flexible bullet character)
    let match = line.match(/[•·▪▫]\s*([^-]+?)\s*-\s*₵?(\d+(?:\.\d+)?)/)
    
    // Fallback: try without bullet character
    if (!match) {
      match = line.match(/^\s*([^-]+?)\s*-\s*₵?(\d+(?:\.\d+)?)/)
    }
    
    // Another fallback: try with different dash patterns
    if (!match) {
      match = line.match(/[•·▪▫]?\s*([^-]+?)\s*[-–—]\s*₵?(\d+(?:\.\d+)?)/)
    }
    
    console.log("Match result:", match)
    
    if (match) {
      const productName = match[1].trim()
      const price = parseFloat(match[2])
      
      console.log("Matched product:", { productName, price })
      
      // Find matching product in our database
      const product = products.find(p => {
        const pName = p.name.toLowerCase()
        const aName = productName.toLowerCase()
        
        console.log(`Comparing "${pName}" with "${aName}"`)
        
        // Try exact match first
        if (pName === aName) {
          console.log("Exact match found!")
          return true
        }
        
        // Try contains match
        if (pName.includes(aName) || aName.includes(pName)) {
          console.log("Contains match found!")
          return true
        }
        
        // Try word-by-word matching
        const pWords = pName.split(/\s+/)
        const aWords = aName.split(/\s+/)
        const commonWords = pWords.filter(word => aWords.includes(word))
        const similarity = commonWords.length / Math.min(pWords.length, aWords.length)
        
        console.log(`Word similarity: ${similarity} (${commonWords.length}/${Math.min(pWords.length, aWords.length)})`)
        
        if (similarity >= 0.6) {
          console.log("Word similarity match found!")
          return true
        }
        
        return false
      })
      
      console.log("Found product:", product)
      
      if (product) {
        const newItem = {
          id: product.id,
          name: product.name,
          description: product.description || product.category,
          size: product.specifications?.size || product.specifications?.weight || "1 unit",
          price: product.price,
          quantity: 1,
          image: product.images?.[0] || "/products/default.png"
        }
        items.push(newItem)
        console.log("Added item to cart:", newItem)
      } else {
        console.log("No matching product found for:", productName)
      }
    } else {
      console.log("No match found for line:", line)
    }
  }
  
  console.log("=== FINAL PARSED ITEMS ===")
  console.log("Total items found:", items.length)
  console.log("Items:", items)
  return items
}

export function AIShoppingAssistant({ onClose, aiResponse }: AIShoppingAssistantProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Parse AI response and populate cart
  useEffect(() => {
    console.log("=== AI RESPONSE EFFECT TRIGGERED ===")
    console.log("AI Response received:", aiResponse)
    if (aiResponse) {
      console.log("Parsing AI response...")
      const parsedItems = parseAIResponse(aiResponse)
      console.log("Setting cart items:", parsedItems)
      setCartItems(parsedItems)
    } else {
      console.log("No AI response provided")
      setCartItems([])
    }
  }, [aiResponse])


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
    // TODO: Add all items to main cart
    console.log("Adding all items to cart:", cartItems)
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
        </div>
        
        {/* Scrollable Items List */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 object-cover rounded"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-xs text-gray-500 mb-2">{item.size}</p>
                  
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
                      <Image src="/trash.svg" alt="Trash" width={20} height={20} />
                    </Button>
                  </div>
                </div>

                {/* Price on the right */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#D35F0E]">GH₵ {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Bottom Section - Static */}
        <div className="border-t rounded-b-lg border-gray-200 p-4 space-y-4 bg-white">
          <div className="flex justify-between items-center">
            <Button 
              className="w-[30%] bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-3 text-lg rounded-full"
              onClick={addAllToCart}
            >
              Add All to Cart
            </Button>
              <span className="text-lg font-semibold text-gray-800">
                Subtotal ({totalItems} items): GH₵ {subtotal}
              </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIShoppingAssistant

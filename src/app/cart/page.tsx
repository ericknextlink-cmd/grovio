"use client"

import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Minus, Plus, Trash2, Heart, Star } from "lucide-react"
import { sampleProducts } from "@/lib/data"

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    getTotalItems, 
    getUniqueItemCount 
  } = useCart()

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const uniqueItems = getUniqueItemCount()

  // Get some recommended products (excluding those already in cart)
  const cartProductIds = items.map(item => item.id)
  const recommendedProducts = sampleProducts
    .filter(product => !cartProductIds.includes(product.id))
    .slice(0, 2)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <Image 
              src="/grocery.png" 
              alt="Empty Cart" 
              width={200} 
              height={200} 
              className="mx-auto opacity-50"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">{`Looks like you haven't added any items to your cart yet.`}</p>
          <Link href="/products">
            <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white px-8 py-3 text-lg rounded-full">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel - Shopping Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Image src="/cart.png" alt="Cart" width={24} height={24} />
                  Shopping cart
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Qty</span>
                  <span>Price</span>
                </div>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-[#D35F0E]">
                          <Heart className="h-4 w-4" />
                          Save for later
                        </button>
                        <button 
                          className="flex items-center gap-1 text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Image src="/trash-orange.png" alt="Trash" width={20} height={20} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#D35F0E]">
                          GH₵ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-lg font-semibold text-gray-800">
                  Subtotal ({totalItems} items): GH₵ {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Order Summary & Recommendations */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              
              {/* Order Summary */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Item({uniqueItems})</span>
                    <span>GH₵ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>GH₵ {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <Button className="w-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white py-3 text-lg rounded-full mt-6">
                    Proceed to Check out
                  </Button>
                </Link>
              </Card>

              {/* Recommendations */}
              {recommendedProducts.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Make your order complete with these items
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {recommendedProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="w-15 h-15 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                          <p className="text-xs text-gray-600 mb-1">{product.description}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">4.6(124)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#D35F0E]">
                              GH₵ {product.price.toFixed(2)}
                            </span>
                            <Button 
                              size="sm" 
                              className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white text-xs px-3 py-1"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useFavorites } from "@/contexts/favorites-context"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react"
import { sampleProducts } from "@/lib/data"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()

  // Get some recommended products (excluding those already in favorites)
  const favoriteProductIds = favorites.map(fav => fav.id)
  const recommendedProducts = sampleProducts
    .filter(product => !favoriteProductIds.includes(product.id))
    .slice(0, 4)

  const handleMoveToCart = (product: any) => {
    addToCart(product)
  }

  const handleRemoveFromFavorites = (productId: string) => {
    removeFromFavorites(productId)
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <Heart className="h-24 w-24 text-gray-300 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist for later.</p>
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
          
          {/* Left Column - Wishlist */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Heart className="h-6 w-6 text-[#D35F0E]" />
                  Wishlist
                </h1>
                <div className="text-sm text-gray-600">
                  <span>Price</span>
                </div>
              </div>

              <div className="space-y-4">
                {favorites.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <Image
                      src={product.images[0] || "/grocery.png"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-[#D35F0E] border-[#D35F0E] hover:bg-[#D35F0E] hover:text-white"
                          onClick={() => handleMoveToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Move to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => handleRemoveFromFavorites(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#D35F0E]">
                        GH₵ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Other Relevant Items */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Other Relevant Items</h2>
              <div className="grid grid-cols-1 gap-4">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <Image
                      src={product.images[0] || "/grocery.png"}
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
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

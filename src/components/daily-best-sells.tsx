/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { sampleProducts } from "@/lib/data"
import { useCart } from "@/contexts/cart-context"
import { useFavorites } from "@/contexts/favorites-context"

export default function DailyBestSells() {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleToggleFavorite = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
  }

  return (
    <section className="mb-8 md:mb-16 bg-white p-4 md:p-8 md:px-4 lg:px-6 mt-[80px] md:mt-[280px] lg:mt-20 scale-[1.05] sm:scale-[0.9] md:scale-[1.2] lg:scale-[1.05]">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-grovio-navy scale-[0.8] sm:scale-[0.9] md:scale-[0.8] lg:scale-[0.85] -ml-2 md:-ml-20 lg:-ml-24 -mt-2 md:-mt-4 lg:-mt-4">Daily Best Sells</h2>
      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {sampleProducts.slice(0, 10).map((product) => (
          <Link key={product.id} href={`/product/${product.slug ?? product.id}`}>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex flex-col h-full">
              {/* Product Image */}
              <div className="relative bg-gray-100 flex items-center justify-center aspect-square">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={309}
                  height={309}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 left-1 md:top-2 md:left-2 h-6 w-6 md:h-8 md:w-8 bg-white/80 hover:bg-white"
                  onClick={(e) => handleToggleFavorite(e, product)}
                >
                  <Heart 
                    className={`h-3 w-3 md:h-4 md:w-4 ${
                      isFavorite(product.id) 
                        ? 'fill-[#D35F0E] text-[#D35F0E]' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
              </div>
              
              {/* Product Details */}
              <div className="p-2 md:p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-grovio-navy text-[7px] md:text-[10px] lg:text-lg mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-[7px] md:text-[8px] lg:text-lg text-gray-600 mb-1 md:mb-2 line-clamp-1">Premium Quality Product</p>
                  <div className="flex items-center gap-1 mb-1 md:mb-2">
                    <Star className="h-2 w-2 md:h-3 md:w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs md:text-base text-grovio-navy">4.6(124)</span>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button 
                  className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white px-2 md:px-3 py-4 md:py-4 h-8 md:h-10 text-xs md:text-lg rounded-md flex items-center gap-1 mt-auto w-full"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <Image src="/cart.png" alt="cart" width={16} height={16} className="w-4 h-4 md:w-4 md:h-4" />
                  <span className="hidden sm:inline text-[8px] md:text-[14px] lg:text-lg">Add to Cart</span>
                  {/* <span className="sm:hidden">Add</span> */}
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

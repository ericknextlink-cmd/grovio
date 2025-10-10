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
    <section className="mb-16 bg-white p-8 px-16 scale-[1.04]">
      <h2 className="text-2xl font-bold -mb-10 text-grovio-navy">Daily Best Sells</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 -ml-14 -space-y-28">
        {sampleProducts.slice(0, 10).map((product) => (
          <Link key={product.id} href={`/product/${product.slug ?? product.id}`}>
            <div className="bg-white border scale-[0.7] border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex flex-col" style={{ width: '326px', height: '480px' }}>
              {/* Product Image */}
              <div className="relative bg-gray-100 flex items-center justify-center" style={{ width: '100%', height: '270px' }}>
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
                  className="absolute top-2 left-2 h-8 w-8 bg-white/80 hover:bg-white"
                  onClick={(e) => handleToggleFavorite(e, product)}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      isFavorite(product.id) 
                        ? 'fill-[#D35F0E] text-[#D35F0E]' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
              </div>
              
              {/* Product Details */}
              <div className="p-4 flex flex-col justify-between flex-1" style={{ height: '120px' }}>
                <div>
                  <h3 className="font-bold text-grovio-navy text-lg mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-lg text-gray-600 mb-2">Premium Quality Product</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-base text-grovio-navy">4.6(124)</span>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button 
                  className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white px-3 py-6 h-10 text-lg rounded-md flex items-center gap-1 mt-auto"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <Image src="/cart.png" alt="cart" width={16} height={16} className="w-8 h-8" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

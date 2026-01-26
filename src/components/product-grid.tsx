"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { useFavorites } from "@/contexts/favorites-context"

interface ProductGridProps {
  products: Product[]
  title?: string
}

export default function ProductGrid({ products, title = "Featured Products" }: ProductGridProps) {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleToggleFavorite = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
  }

  return (
    <div className="-mb-[580px] md:mb-12 bg-white p-4 md:p-8 md:px-4 scale-[1.05] sm:scale-[0.9] md:scale-[1.2] lg:scale-[1.05] mt-[140px] md:mt-[720px] lg:mt-45">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-grovio-navy scale-[0.8] sm:scale-[0.9] md:scale-[0.8] lg:scale-[0.85] -ml-10 md:-ml-18 lg:-ml-24 -mt-2 md:-mt-4 lg:-mt-4">{title}</h2>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow h-full flex flex-col rounded-none">
            <Link href={`/product/${product.slug}`}>
              <CardContent className="p-2 md:p-4 flex-1 flex flex-col">
                <div className="relative mb-2 md:mb-4">
                  <Image
                    src={product.images[0] || "/logo.png"}
                    alt={product.name}
                    width={250}
                    height={200}
                    className="w-full h-32 md:h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  {!product.inStock && (
                    <Badge variant="destructive" className="absolute top-1 right-1 md:top-2 md:right-2 text-xs">
                      Out of Stock
                    </Badge>
                  )}
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
                <h3 className="font-semibold text-grovio-navy text-xs md:text-base mb-1 md:mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center mb-1 md:mb-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs md:text-sm ml-1">{product.rating}</span>
                    <span className="text-xs md:text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm md:text-lg font-bold text-grovio-orange">{formatPrice(product.price)}</span>
                  {product.specifications.weight && (
                    <Badge variant="secondary" className="text-[10px] md:text-xs">
                      {product.specifications.weight}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Link>
            <CardFooter className="p-2 md:p-4 pt-0 mt-auto">
              <Button 
                className="w-full bg-grovio-orange hover:bg-grovio-orange/90 h-8 md:h-10 text-xs md:text-sm" 
                disabled={!product.inStock}
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

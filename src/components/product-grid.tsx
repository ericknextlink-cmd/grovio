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
    <div className="mb-12 bg-white p-8 px-16 scale-[1.0]">
      <h2 className="text-2xl font-bold mb-6 text-grovio-navy">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow h-full flex flex-col">
            <Link href={`/product/${product.slug}`}>
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="relative mb-4">
                  <Image
                    src={product.images[0] || "/logo.png"}
                    alt={product.name}
                    width={250}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  {!product.inStock && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      Out of Stock
                    </Badge>
                  )}
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
                <h3 className="font-semibold text-grovio-navy mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-grovio-orange">{formatPrice(product.price)}</span>
                  {product.specifications.weight && (
                    <Badge variant="secondary" className="text-xs">
                      {product.specifications.weight}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Link>
            <CardFooter className="p-4 pt-0 mt-auto">
              <Button 
                className="w-full bg-grovio-orange hover:bg-grovio-orange/90" 
                disabled={!product.inStock}
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

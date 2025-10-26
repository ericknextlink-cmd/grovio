"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Minus, Plus, ChevronRight } from "lucide-react"
import { sampleProducts, categories } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import Header from "@/components/header"
import { useFavorites } from "@/contexts/favorites-context"
import { useCart } from "@/contexts/cart-context"

interface ProductPageClientProps {
  slug: string
}

export default function ProductPageClient({ slug }: ProductPageClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()

  // Find product by slug
  const product = sampleProducts.find((p) => p.slug === slug) || sampleProducts[0]
  const category = categories.find(c => c.id === product.category)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    // Add product multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
  }

  const savings = product.originalPrice ? product.originalPrice - product.price : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header user={{ fullName: "", username: "" }} /> */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#D35F0E]">Home</Link>
          <ChevronRight className="h-4 w-4" />
          {category ? (
            <Link href={`/category/${category.slug ?? category.id}`} className="hover:text-[#D35F0E] capitalize">{category.name}</Link>
          ) : (
            <span className="capitalize">{product.category}</span>
          )}
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {!product.inStock && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-[#D35F0E]" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating}({product.reviews})
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-[#D35F0E]">Now GHC {product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">GHC {product.originalPrice}</span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-green-600 font-medium">You save GHC {savings}</p>
                )}
              </div>

              {/* Size and Price Boxes */}
              <div className="flex gap-4 mb-6">
                <div className="border-2 border-gray-200 rounded-lg p-4 min-w-[100px] text-center">
                  <p className="text-sm text-gray-600 mb-1">Size</p>
                  <p className="font-semibold text-gray-900">{product.specifications?.size || product.specifications?.weight || "1 unit"}</p>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-4 min-w-[100px] text-center">
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="font-semibold text-gray-900">{product.price}</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Qty:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleQuantityChange(-1)} 
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[60px] text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <Button 
                  className="flex-1 bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-4 text-lg rounded-full"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleToggleFavorite}
                  className={`h-12 w-12 rounded-full ${
                    isFavorite(product.id) ? "bg-[#D35F0E] border-[#D35F0E] text-white" : "border-gray-200"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-red-600 text-sm mb-6">This item is currently out of stock. Check back later!</p>
              )}
            </div>

            {/* Product Description */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Product Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                      <p className="font-medium text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ask AI Section */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white fill-current" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Ask Isidra AI</h3>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3 px-4 bg-white hover:bg-gray-50"
                  >
                    How do I cook this rice?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3 px-4 bg-white hover:bg-gray-50"
                  >
                    Ask anything related to this Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sampleProducts.slice(0, 4).map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                <Link href={`/product/${relatedProduct.slug}`}>
                  <CardContent className="p-4">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-[#D35F0E] font-bold">{formatPrice(relatedProduct.price)}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

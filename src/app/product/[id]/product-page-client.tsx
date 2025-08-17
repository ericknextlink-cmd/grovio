"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react"
import { sampleProducts } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import Header from "@/components/header"

interface ProductPageClientProps {
  id: string
}

export default function ProductPageClient({ id }: ProductPageClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // In a real app, you'd fetch the product by ID
  const product = sampleProducts.find((p) => p.id === id) || sampleProducts[0]

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-grovio-navy hover:text-grovio-orange mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-lg overflow-hidden">
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
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-grovio-orange" : "border-gray-200"
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
              <div className="flex items-center gap-2 mb-2">
                {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
                <Badge variant="outline">{product.category}</Badge>
              </div>

              <h1 className="text-3xl font-bold text-grovio-navy mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
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
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="text-3xl font-bold text-grovio-orange mb-6">{formatPrice(product.price)}</div>
            </div>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-grovio-navy mb-4">Product Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Variant Selection (for products like rice, milk, etc.) */}
                {product.id === "3" && ( // Milk example
                  <Select defaultValue="400g">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="400g">400g Tin</SelectItem>
                      <SelectItem value="900g">900g Tin</SelectItem>
                      <SelectItem value="1.8kg">1.8kg Tin</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {product.id === "5" && ( // Eggs example
                  <Select defaultValue="half">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarter">Quarter Crate</SelectItem>
                      <SelectItem value="half">Half Crate</SelectItem>
                      <SelectItem value="full">Full Crate</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-grovio-orange hover:bg-grovio-orange/90" disabled={!product.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-red-600 text-sm">This item is currently out of stock. Check back later!</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-grovio-navy mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sampleProducts.slice(0, 4).map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                <Link href={`/product/${relatedProduct.id}`}>
                  <CardContent className="p-4">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-grovio-orange font-bold">{formatPrice(relatedProduct.price)}</p>
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

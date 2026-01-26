"use client"

import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ShoppingCart, Star, Users, Clock } from "lucide-react"
import { shopBundles } from "@/lib/shop-data"



export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header user={{ fullName: "", username: "" }} /> */}
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-grovio-navy mb-4">
            Curated Shopping Bundles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked product combinations designed by our AI to save you time, money, and decision fatigue
          </p>
        </section>

        {/* Bundles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {shopBundles.map((bundle) => (
            <Card key={bundle.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden rounded-none">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={bundle.image}
                  alt={bundle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-grovio-orange text-white">
                  {bundle.badge}
                </Badge>
                <Badge variant="secondary" className="absolute top-4 right-4">
                  {bundle.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-grovio-navy">{bundle.title}</CardTitle>
                <p className="text-gray-600 text-sm">{bundle.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Products included */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Includes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {bundle.products.map((product, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{bundle.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({bundle.reviews} reviews)</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-grovio-orange">GHC {bundle.currentPrice}</span>
                      <span className="text-lg text-gray-500 line-through">GHC {bundle.originalPrice}</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">Save GHC {bundle.savings}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-grovio-orange hover:bg-grovio-orange/90 text-white font-medium py-3 rounded-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add Bundle to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-grovio-navy mb-6 text-center">Why Choose Our Bundles?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-grovio-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-grovio-orange" />
              </div>
              <h3 className="font-semibold text-grovio-navy mb-2">AI-Curated</h3>
              <p className="text-sm text-gray-600">Our AI analyzes thousands of successful shopping patterns to create the perfect combinations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-grovio-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-grovio-orange" />
              </div>
              <h3 className="font-semibold text-grovio-navy mb-2">Time Saving</h3>
              <p className="text-sm text-gray-600">No more browsing through hundreds of products - get everything you need in one click</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-grovio-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-grovio-orange" />
              </div>
              <h3 className="font-semibold text-grovio-navy mb-2">Best Value</h3>
              <p className="text-sm text-gray-600">Save money with our bundle discounts while getting exactly what you need</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Star, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import { sampleProducts } from "@/lib/data"

export default function PopularProducts() {
  return (
    <section className="mb-8 sm:mb-12 lg:mb-16">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-grovio-navy">Popular Products</h2>
          <Button variant="outline" className="text-grovio-orange border-grovio-orange hover:bg-grovio-orange hover:text-white text-xs sm:text-sm px-3 sm:px-4 py-2">
            View All Products
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex w-full overflow-x-auto scrollbar-hide bg-gray-100 p-1 rounded-lg gap-1 lg:grid lg:grid-cols-7">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap shrink-0">All</TabsTrigger>
          <TabsTrigger value="dairy" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap shrink-0">Dairy</TabsTrigger>
          <TabsTrigger value="beverages" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap shrink-0">Beverages</TabsTrigger>
          <TabsTrigger value="seasonings" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap shrink-0">Seasonings</TabsTrigger>
          <TabsTrigger value="vegetables" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap shrink-0">Vegetables</TabsTrigger>
          <TabsTrigger value="grains" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap shrink-0">Grains</TabsTrigger>
          <TabsTrigger value="meat" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap shrink-0">Meat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {sampleProducts.slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-2 sm:p-3 lg:p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-grovio-navy mb-2 line-clamp-2 text-sm">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-grovio-orange">₵{product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-grovio-orange hover:bg-grovio-orange/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="dairy" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleProducts.filter(p => p.category === "dairy").slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-2 sm:p-3 lg:p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-grovio-navy mb-2 line-clamp-2 text-sm">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-grovio-orange">₵{product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-grovio-orange hover:bg-grovio-orange/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="beverages" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleProducts.filter(p => p.category === "beverages").slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-2 sm:p-3 lg:p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-grovio-navy mb-2 line-clamp-2 text-sm">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-grovio-orange">₵{product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-grovio-orange hover:bg-grovio-orange/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="seasonings" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleProducts.filter(p => p.category === "seasonings").slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-2 sm:p-3 lg:p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-grovio-navy mb-2 line-clamp-2 text-sm">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-grovio-orange">₵{product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-grovio-orange hover:bg-grovio-orange/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="vegetables" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleProducts.filter(p => p.category === "vegetables").slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-2 sm:p-3 lg:p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-grovio-navy mb-2 line-clamp-2 text-sm">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-grovio-orange">₵{product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-grovio-orange hover:bg-grovio-orange/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="grains" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleProducts.filter(p => p.category === "grains").slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-2 sm:p-3 lg:p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-grovio-navy mb-2 line-clamp-2 text-sm">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-grovio-orange">₵{product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-grovio-orange hover:bg-grovio-orange/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="meat" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleProducts.filter(p => p.category === "meat").slice(0, 8).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-2 sm:p-3 lg:p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-grovio-navy mb-2 line-clamp-2 text-sm">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-grovio-orange">₵{product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-grovio-orange hover:bg-grovio-orange/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

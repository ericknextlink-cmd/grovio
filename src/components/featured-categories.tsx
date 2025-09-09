"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"
import { sampleProducts } from "@/lib/data"
import ProductCard from "./product-card"

export default function FeaturedCategories() {
  return (
    <section className="mb-8 sm:mb-12 lg:mb-16">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-grovio-navy">Featured Categories</h2>
          <Button variant="outline" className="text-grovio-orange border-grovio-orange hover:bg-grovio-orange hover:text-white text-xs sm:text-sm px-3 sm:px-4 py-2">
            View All Categories
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="vegetables" className="w-full">
        <TabsList className="flex w-full overflow-x-auto scrollbar-hide bg-gray-100 p-1 rounded-lg gap-1 sm:grid sm:grid-cols-4">
          <TabsTrigger value="vegetables" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap flex-shrink-0">Vegetables</TabsTrigger>
          <TabsTrigger value="dairy" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap flex-shrink-0">Dairy & Eggs</TabsTrigger>
          <TabsTrigger value="grains" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap flex-shrink-0">Rice & Grains</TabsTrigger>
          <TabsTrigger value="beverages" className="data-[state=active]:bg-white data-[state=active]:text-grovio-navy text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap flex-shrink-0">Beverages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vegetables" className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 xl:gap-8">
            {sampleProducts.filter(p => p.category === "vegetables").slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="dairy" className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 xl:gap-8">
            {sampleProducts.filter(p => p.category === "dairy").slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="grains" className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 xl:gap-8">
            {sampleProducts.filter(p => p.category === "grains").slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="beverages" className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 xl:gap-8">
            {sampleProducts.filter(p => p.category === "beverages").slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

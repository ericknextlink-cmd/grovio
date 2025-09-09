"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { sampleProducts } from "@/lib/data"

export default function DailyBestSells() {
  return (
    <section className="mb-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-grovio-navy">Daily Best Sells</h2>
          <p className="text-xl text-gray-600">Bring nature into your home with our fresh, organic products</p>
          <Button className="bg-grovio-orange hover:bg-grovio-orange/90 px-8 py-3">
            Shop Now
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sampleProducts.slice(0, 8).map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border border-gray-200">
              <CardContent className="p-3">
                <div className="relative mb-3">
                  <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="font-medium text-grovio-navy mb-2 line-clamp-2 text-xs leading-tight text-center">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-grovio-orange">₵{product.price.toFixed(2)}</span>
                  <Button size="sm" className="bg-grovio-orange hover:bg-grovio-orange/90 text-xs px-2 py-1 h-7">
                    Add To
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

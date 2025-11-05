/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { sampleProducts } from "@/lib/data"

export default function RightSidebar() {
  return (
    <div className="lg:col-span-1">
      {/* Daily Best Sells Sidebar */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-grovio-navy mb-4">Daily Best Sells</h3>
        <div className="space-y-3">
          {sampleProducts.slice(0, 4).map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs text-grovio-navy line-clamp-2 leading-tight">{product.name}</h4>
                    <p className="text-grovio-orange font-bold text-sm mt-1">₵{product.price.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Deals Of The Day */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-grovio-navy mb-4">Deals Of The Day</h3>
        <div className="space-y-3">
          {sampleProducts.slice(4, 8).map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs text-grovio-navy line-clamp-2 leading-tight">{product.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-red-600 font-bold text-xs">-20%</span>
                      <span className="text-grovio-orange font-bold text-sm">₵{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Delivery Promotion */}
      {/* <Card className="bg-gradient-to-br from-grovio-navy to-grovio-navy/80 text-white p-6 text-center">
        <div className="mb-4">
          <div className="bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
            <Image
              src="/car.png"
              alt="Delivery"
              width={32}
              height={32}
              className="w-[400px] h-[400px] object-contain"
            />
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2">Stay Home. We'll Bring the Groceries to You.</h3>
        <Button className="bg-grovio-orange hover:bg-grovio-orange/90 w-full mt-4">
          Start Shopping
        </Button>
      </Card> */}
    </div>
  )
}

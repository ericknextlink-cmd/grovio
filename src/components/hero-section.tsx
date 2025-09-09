"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
      <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-grovio-navy leading-tight">
          {`Don't miss amazing grocery deals`}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
          Join our daily newsletter and get exclusive grocery discounts, fresh finds, and tasty inspirations straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grovio-orange focus:border-transparent text-sm sm:text-base"
          />
          <Button className="bg-grovio-orange hover:bg-grovio-orange/90 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base whitespace-nowrap">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="relative order-1 lg:order-2">
        <div className="aspect-square bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Image
                src="/grocery.png"
                alt="Fresh Groceries"
                width={120}
                height={120}
                className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] xl:w-[300px] xl:h-[300px] mb-2 sm:mb-4 object-contain"
              />
              <p className="text-grovio-navy font-medium text-sm sm:text-base">Fresh Groceries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

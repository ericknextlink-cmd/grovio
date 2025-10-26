/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatbotWidget from "@/components/chatbot-widget"
import CategoryGrid from "@/components/category-grid"
import DailyBestSells from "@/components/daily-best-sells"
import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import { sampleProducts } from "@/lib/data"
export default function HomePage() {
  // In a real app, you'd get user data from authentication
  const user = null // or actual user data

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #232F3E 0%, #B7DFF5 100%)" }}>
      {/* <Header user={user} /> */}
      <Header />

      <main className="w-full px-2 sm:px-4 md:container md:mx-auto md:px-6 py-4 sm:py-8 md:py-12">
        {/* Bulk Supplies Button */}
        <div className="flex justify-end mb-4 md:mb-0">
          <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full">
            Bulk Supplies
          </Button>
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white -mb-4 md:-mb-8 lg:-mb-12">
            {`Don't miss amazing grocery deals`}
          </h1>
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mx-auto text-center font-bold text-white">...</span>
        </div>
        
        {/* Categories gallery */}
        <div className="scale-[1.1] sm:scale-[0.9] md:scale-[1.2] lg:scale-[1.06]">
          <CategoryGrid />
        </div>
        
        {/* Daily Best section */}
        <DailyBestSells />
        
        {/* Product Grid */}
        <ProductGrid products={sampleProducts} />
      </main>
      
      {/* Add extra margin to ensure footer is not covered */}
      <div className="h-[690px] md:h-[650px] lg:h-[80px]"></div>
      
      <Footer />
      <ChatbotWidget />
    </div>
  )
}

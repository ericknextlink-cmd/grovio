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
      <Header user={user} />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
              {/* Bulk Supplies Button */}
        <div className="container mx-auto px-4 flex justify-end">
          <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white px-6 py-2 rounded-full">
            Bulk Supplies
          </Button>
        </div>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white -mb-12">
            {`Don't miss amazing grocery deals`}
          </h1>
          <span className="text-8xl mx-auto text-center font-bold text-white">...</span>
        </div>
        
        {/* Categories gallery */}
        <CategoryGrid />
        {/* Daily Best section */}
        <DailyBestSells />
        {/* Product Grid */}
        <ProductGrid products={sampleProducts} />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  )
}

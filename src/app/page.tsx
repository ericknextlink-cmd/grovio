"use client"

import Header from "@/components/header"
import ChatbotWidget from "@/components/chatbot-widget"
import SearchBar from "@/components/search-bar"
import HeroSection from "@/components/hero-section"
import FeaturedCategories from "@/components/featured-categories"
import PromotionalBlocks from "@/components/promotional-blocks"
import PopularProducts from "@/components/popular-products"
import DailyBestSells from "@/components/daily-best-sells"
import RightSidebar from "@/components/right-sidebar"

export default function HomePage() {
  // In a real app, you'd get user data from authentication
  const user = null // or actual user data

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <HeroSection />
            <FeaturedCategories />
            <PromotionalBlocks />
            <PopularProducts />
            <DailyBestSells />
          </div>

          <div className="hidden lg:block">
            <RightSidebar />
          </div>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  )
}

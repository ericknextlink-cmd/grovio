/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatbotWidget from "@/components/chatbot-widget"
import CategoryGrid from "@/components/category-grid"
import DailyBestSells from "@/components/daily-best-sells"
import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import { sampleProducts } from "@/lib/data"

// Hero slides data
const heroSlides = [
  {
    title: "Don't miss amazing grocery deals",
    subtitle: "Turn grocery shopping into a rewarding experience",
    gradientStart: "#232F3E"
  },
  {
    title: "Curated Shopping Bundles",
    subtitle: "Exclusive bundles with premium savings, just for you",
    gradientStart: "#145C68"
  },
  {
    title: "Smarter Shopping, Better Living",
    subtitle: "Personalized recommendations, Curated Grocery Package, and loyalty rewards",
    gradientStart: "#403052"
  }
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 300) // Half of transition duration
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const currentGradient = heroSlides[currentSlide].gradientStart

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out" 
      style={{ background: `linear-gradient(180deg, ${currentGradient} 0%, #B7DFF5 100%)` }}
    >
      <Header />

      <main className="w-full px-2 sm:px-4 md:container md:mx-auto md:px-6 py-4 sm:py-8 md:py-12">
        {/* Bulk Supplies Button */}
        <div className="flex justify-end mb-4 md:mb-0 relative top-0 lg:top-0 md:-top-6">
          <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full">
            Bulk Supplies
          </Button>
        </div>
        
        {/* Hero Section with Carousel */}
        <div className="text-center mb-6 md:mb-12 relative">
          {/* Text Content with Fade Transition */}
          <div 
            className={`transition-opacity duration-600 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-4xl font-bold text-white -mb-4 md:-mb-8 lg:-mb-12">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-white text-xs sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] mt-4 md:mt-8 lg:mt-12 px-4">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-3 mt-8 md:mt-12">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`
                  rounded-full bg-white transition-all duration-300 cursor-pointer
                  hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                  ${currentSlide === index 
                    ? 'w-4 h-4 md:w-5 md:h-5 opacity-100 scale-125' 
                    : 'w-3 h-3 md:w-4 md:h-4 opacity-60 hover:opacity-80'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index}
              />
            ))}
          </div>
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

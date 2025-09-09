"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import PromotionalCard from "./promotional-card"

// Promotional data - easily scalable
const promotionalData = [
  {
    id: 1,
    title: "Onions You'll Love at First Slice",
    image: "https://imgur.com/LGUDj3d.png",
    alt: "Fresh Onions",
    buttonText: "Shop Now"
  },
  {
    id: 2,
    title: "Quick, Fresh, and Good for You",
    image: "https://imgur.com/9a3E1pe.png",
    alt: "Fresh Fruits",
    buttonText: "Shop Now"
  },
  {
    id: 3,
    title: "The Best Organic Products Online",
    image: "https://imgur.com/pJjlGcQ.png",
    alt: "Organic Vegetables",
    buttonText: "Shop Now"
  }
]

export default function PromotionalBlocks() {
  return (
    <section className="mb-8 sm:mb-12 lg:mb-16">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-grovio-navy">Promotional Products</h2>
          <Button variant="outline" className="text-grovio-orange border-grovio-orange hover:bg-grovio-orange hover:text-white text-xs sm:text-sm px-3 sm:px-4 py-2">
            View All Promotions
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {promotionalData.map((item) => (
          <PromotionalCard
            key={item.id}
            title={item.title}
            image={item.image}
            alt={item.alt}
            buttonText={item.buttonText}
          />
        ))}
      </div>
    </section>
  )
}
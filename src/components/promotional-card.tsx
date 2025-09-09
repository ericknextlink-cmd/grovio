"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface PromotionalCardProps {
  title: string
  image: string
  alt: string
  buttonText?: string
}

export default function PromotionalCard({ 
  title, 
  image, 
  alt, 
  buttonText = "Shop Now" 
}: PromotionalCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full h-32 sm:h-40 lg:h-48">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
            <div className="text-center text-white">
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2 sm:mb-3 leading-tight">{title}</h3>
              <Button className="bg-grovio-orange hover:bg-grovio-orange/90 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-semibold">
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

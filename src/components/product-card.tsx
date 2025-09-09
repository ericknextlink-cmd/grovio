"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface ProductCardProps {
  product: {
    id: string
    name: string
    images: string[]
    specifications: {
      weight?: string
      quantity?: string
    }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer w-[200px]">
      <CardContent className="p-6 text-center">
        <div className="w-[100px] h-[100px] mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={820}
            height={820}
            className="w-[130px] h-[130px] object-cover rounded-lg"
          />
        </div>
        <h3 className="text-sm font-medium text-grovio-navy mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.specifications.weight || product.specifications.quantity}</p>
      </CardContent>
    </Card>
  )
}

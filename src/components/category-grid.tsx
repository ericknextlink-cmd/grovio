import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"
import Image from "next/image"

export default function CategoryGrid() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-grovio-navy">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group scale-[0.8]">
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 group-hover:scale-110 transition-transform">
                      <div className="w-20 h-20 mx-auto overflow-hidden rounded-lg scale-[1.2]">
                        <Image
                          src={category.icon}
                          alt={category.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover object-center"
                          priority
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm text-grovio-navy group-hover:text-grovio-orange transition-colors">
                      {category.name}
                    </h3>
                </CardContent>
              </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

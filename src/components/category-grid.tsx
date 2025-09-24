import Link from "next/link"
import { categories } from "@/lib/data"
import Image from "next/image"

export default function CategoryGrid() {
  return (
    <div className="mb-4 -ml-14">
      <h2 className="text-2xl font-bold ml-8 -mb-6 text-white">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 -space-y-16">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <div className="bg-white border scale-[0.8] border-gray-200 hover:border-[#D35F0E] transition-colors cursor-pointer group" style={{ width: '326px', height: '408px' }}>
              <div className="p-4 text-center h-full flex flex-col justify-center">
                <div className="mb-3">
                  <div className="w-20 h-20 mx-auto overflow-hidden" style={{ width: '309px', height: '309px' }}>
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={309}
                      height={309}
                      className="w-full h-full object-cover object-center"
                      priority
                    />
                  </div>
                </div>
                <h3 className="font-medium text-sm text-grovio-navy group-hover:text-[#D35F0E] transition-colors">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

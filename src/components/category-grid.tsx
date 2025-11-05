import Link from "next/link"
import { categories } from "@/lib/data"
import Image from "next/image"

export default function CategoryGrid() {
  return (
    <div className="mb-8 md:mb-4 mt-[30px] md:mt-[20px] lg:mt-0">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-2 text-white px-4 md:px-0 scale-[0.8] sm:scale-[0.9] md:scale-[0.8] lg:scale-[0.85] -ml-10 md:-ml-18 lg:-ml-4">Shop by Category</h2>
      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-2 md:px-0">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <div className="bg-white border border-gray-200 hover:border-[#D35F0E] transition-colors cursor-pointer group rounded-none overflow-hidden aspect-3/4 flex flex-col">
              <div className="p-3 md:p-4 text-center h-full flex flex-col justify-center items-center">
                <div className="flex-1 flex items-center justify-center -mt-3 md:mt-0 lg:-mt-6 w-full mb-2 md:mb-3 lg:-mb-4">
                  <div className="relative w-full h-full max-w-full max-h-full">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={309}
                      height={309}
                      className="w-full h-full object-contain scale-[0.8] lg:scale-[0.9] md:scale-[0.8]"
                      priority
                    />
                  </div>
                </div>
                <h3 className="font-medium text-xs md:text-sm text-grovio-navy group-hover:text-[#D35F0E] transition-colors">
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

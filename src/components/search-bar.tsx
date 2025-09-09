"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="mb-6 sm:mb-8 lg:mb-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Select defaultValue="all">
              <SelectTrigger className="w-24 sm:w-28 bg-transparent border-none text-grovio-navy text-xs sm:text-sm focus:outline-none shadow-none">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                <SelectItem value="grains">Rice & Grains</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="seasonings">Seasonings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-28 sm:pl-32 pr-12 sm:pr-14 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grovio-orange focus:border-transparent bg-white text-grovio-navy placeholder-gray-500 shadow-sm text-sm sm:text-base"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-grovio-orange hover:bg-grovio-orange/90" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

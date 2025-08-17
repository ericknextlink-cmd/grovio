import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import CategoryGrid from "@/components/category-grid"
import ProductGrid from "@/components/product-grid"
import ChatbotWidget from "@/components/chatbot-widget"
import { sampleProducts } from "@/lib/data"

export default function HomePage() {
  // In a real app, you'd get user data from authentication
  const user = null // or actual user data

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-grovio-navy mb-4">Welcome to Grovio</h1>
          <p className="text-xl text-gray-600 mb-8">
            The modernized revolutionary grocery shopping platform that helps you shop smarter and better
          </p>
          <SearchBar />
        </div>

        {/* Categories */}
        <CategoryGrid />

        {/* Featured Products */}
        <ProductGrid products={sampleProducts} />
      </main>

      <ChatbotWidget />
    </div>
  )
}

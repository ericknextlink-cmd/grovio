import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"
import { sampleProducts } from "@/lib/data"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={{ fullName: "", username: "" }} />
      <main className="container mx-auto px-4 py-8">
        <ProductGrid products={sampleProducts} title="All Products" />
      </main>
    </div>
  )
}

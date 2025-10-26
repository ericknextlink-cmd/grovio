import ProductGrid from "@/components/product-grid"
import Header from "@/components/header"
import { categories, sampleProducts } from "@/lib/data"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories.find(c => c.slug === slug)
  const title = category ? category.name : "Category"
  const products = category
    ? sampleProducts.filter(p => p.category === category.id)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header user={{ fullName: "", username: "" }} /> */}
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ProductGrid products={products} title={title} />
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Calendar, User, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Groceries Every Ghanaian Home Should Have",
      excerpt: "Discover the must-have pantry staples that form the foundation of Ghanaian cooking and nutrition.",
      author: "Grovio Team",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "Cooking Tips",
      image: "/grocery.png"
    },
    {
      id: 2,
      title: "How to Plan Your Weekly Grocery Shopping on a Budget",
      excerpt: "Learn smart shopping strategies to stretch your grocery budget while maintaining a healthy, balanced diet.",
      author: "Grovio Team",
      date: "January 10, 2025",
      readTime: "7 min read",
      category: "Budget Shopping",
      image: "/grocery.png"
    },
    {
      id: 3,
      title: "Understanding Food Labels: Making Informed Choices",
      excerpt: "A comprehensive guide to reading and understanding food labels to make healthier grocery choices.",
      author: "Grovio Team",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Health & Nutrition",
      image: "/grocery.png"
    },
    {
      id: 4,
      title: "Seasonal Produce Guide: What's Fresh This Month",
      excerpt: "Find out which fruits and vegetables are in season and how to incorporate them into your meals.",
      author: "Grovio Team",
      date: "December 28, 2024",
      readTime: "4 min read",
      category: "Seasonal",
      image: "/grocery.png"
    },
    {
      id: 5,
      title: "Meal Planning Made Easy: A Beginner's Guide",
      excerpt: "Simplify your weekly meal planning with our step-by-step guide to organized, stress-free cooking.",
      author: "Grovio Team",
      date: "December 20, 2024",
      readTime: "8 min read",
      category: "Meal Planning",
      image: "/grocery.png"
    },
    {
      id: 6,
      title: "The Benefits of Shopping with AI-Powered Recommendations",
      excerpt: "Discover how AI technology can help you discover new products, save money, and shop more efficiently.",
      author: "Grovio Team",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Technology",
      image: "/grocery.png"
    }
  ]

  const categories = ["All", "Cooking Tips", "Budget Shopping", "Health & Nutrition", "Seasonal", "Meal Planning", "Technology"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Insights</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover tips, guides, and insights to enhance your grocery shopping experience
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <Input
              type="text"
              placeholder="Search blog posts..."
              className="py-6 text-lg rounded-lg border-2 border-gray-200 focus:border-[#D35F0E]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="hover:bg-[#D35F0E] hover:text-white"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-12">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <span className="inline-block text-xs font-semibold text-[#D35F0E] bg-orange-50 px-3 py-1 rounded-full mb-4 w-fit">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{blogPosts[0].title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${blogPosts[0].id}`}>
                    <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 w-fit">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <span className="inline-block text-xs font-semibold text-[#D35F0E] bg-orange-50 px-2 py-1 rounded-full mb-2 w-fit">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="outline" className="w-full hover:bg-[#D35F0E] hover:text-white">
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to receive the latest blog posts, tips, and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1"
            />
            <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}


"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Search, MessageCircle, Mail, Phone, FileText, ShoppingBag, Package, CreditCard, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const helpCategories = [
    {
      icon: ShoppingBag,
      title: "Getting Started",
      description: "Learn how to create an account, browse products, and place your first order",
      articles: [
        { title: "How to create an account", href: "#" },
        { title: "How to browse and search products", href: "#" },
        { title: "How to place an order", href: "#" },
        { title: "Understanding product pages", href: "#" }
      ]
    },
    {
      icon: Package,
      title: "Orders & Delivery",
      description: "Information about order tracking, delivery options, and order management",
      articles: [
        { title: "How to track your order", href: "/track" },
        { title: "Delivery timeframes and areas", href: "/shipping" },
        { title: "How to cancel an order", href: "#" },
        { title: "Order status updates", href: "#" }
      ]
    },
    {
      icon: CreditCard,
      title: "Payment & Billing",
      description: "Payment methods, billing questions, and invoice information",
      articles: [
        { title: "Accepted payment methods", href: "#" },
        { title: "How to view invoices", href: "#" },
        { title: "Payment security", href: "#" },
        { title: "Billing and refunds", href: "#" }
      ]
    },
    {
      icon: Truck,
      title: "Shipping & Returns",
      description: "Shipping options, return policies, and delivery information",
      articles: [
        { title: "Shipping options and costs", href: "/shipping" },
        { title: "Return policy", href: "/shipping" },
        { title: "How to return an item", href: "/shipping" },
        { title: "Delivery address management", href: "#" }
      ]
    },
    {
      icon: FileText,
      title: "Account & Settings",
      description: "Manage your account, preferences, and profile settings",
      articles: [
        { title: "How to update your profile", href: "#" },
        { title: "Managing preferences", href: "#" },
        { title: "Privacy and security settings", href: "#" },
        { title: "How to delete your account", href: "#" }
      ]
    },
    {
      icon: MessageCircle,
      title: "AI Shopping Assistant",
      description: "Using AI features for personalized recommendations and shopping help",
      articles: [
        { title: "How to use the AI shopping assistant", href: "#" },
        { title: "Understanding personalized recommendations", href: "#" },
        { title: "AI-generated product bundles", href: "#" },
        { title: "Setting up preferences for AI", href: "#" }
      ]
    }
  ]

  const popularArticles = [
    "How to track my order?",
    "What payment methods do you accept?",
    "How do I return an item?",
    "How long does delivery take?",
    "Can I change my delivery address?",
    "How do I cancel an order?",
    "What is your return policy?",
    "How to use AI shopping assistant?"
  ]

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions and get the support you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-lg border-2 border-gray-200 focus:border-[#D35F0E]"
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/contact">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-[#D35F0E] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600">Get in touch with our support team</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/track">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 text-[#D35F0E] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Track Your Order</h3>
                <p className="text-sm text-gray-600">Check the status of your order</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/faq">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-[#D35F0E] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-600">Browse common questions</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularArticles.map((article, index) => (
              <Link key={index} href="#">
                <Card className="hover:shadow-md transition-shadow hover:border-[#D35F0E] cursor-pointer">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-700 hover:text-[#D35F0E]">{article}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="h-6 w-6 text-[#D35F0E]" />
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <Link 
                          href={article.href} 
                          className="text-sm text-[#D35F0E] hover:underline"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Mail className="h-8 w-8 text-[#D35F0E] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-gray-600 mb-4">support@grovio.com</p>
              <Link href="/contact">
                <Button variant="outline" size="sm">Send Email</Button>
              </Link>
            </div>

            <div className="text-center">
              <Phone className="h-8 w-8 text-[#D35F0E] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-4">+233 XX XXX XXXX</p>
              <p className="text-xs text-gray-500">Mon-Fri, 9am-6pm GMT</p>
            </div>

            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-[#D35F0E] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Available 24/7</p>
              <Button size="sm" className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
                Start Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}


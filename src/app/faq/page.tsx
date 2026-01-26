"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const faqs: FAQItem[] = [
    {
      category: "Account",
      question: "How do I create an account?",
      answer: "Creating an account is easy! Click the 'Sign Up' button on our homepage, fill in your details (name, email, phone number, and password), and verify your email address. Alternatively, you can sign up quickly using your Google account."
    },
    {
      category: "Account",
      question: "How do I reset my password?",
      answer: "If you've forgotten your password, click 'Forgot Password' on the login page. Enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      category: "Account",
      question: "Can I update my account information?",
      answer: "Yes, you can update your account information at any time. Log into your account, go to 'Profile' or 'Account Settings,' and edit your details. Don't forget to save your changes."
    },
    {
      category: "Account",
      question: "How do I delete my account?",
      answer: "To delete your account, contact our customer service team or use the account deletion feature in your account settings. Please note that account deletion is permanent and cannot be undone. All your data will be removed in accordance with our Privacy Policy."
    },
    {
      category: "Orders",
      question: "How do I place an order?",
      answer: "Browse our products, add items to your cart, and proceed to checkout. Enter your delivery address, select a payment method, and complete your purchase. You'll receive an order confirmation email with your order details."
    },
    {
      category: "Orders",
      question: "Can I modify or cancel my order?",
      answer: "You can cancel or modify orders that are still in 'pending' or 'processing' status. Go to 'My Orders' in your account, select the order, and click 'Cancel Order' or contact customer service. Once an order is shipped, cancellation may not be possible."
    },
    {
      category: "Orders",
      question: "How do I track my order?",
      answer: "After placing an order, you'll receive a tracking number via email and SMS. You can track your order status by visiting the 'Track Your Order' page on our website or by logging into your account and viewing 'My Orders'."
    },
    {
      category: "Orders",
      question: "What if I receive the wrong item?",
      answer: "If you receive an incorrect item, please contact us immediately with your order number and a photo of the item received. We will arrange for a replacement or full refund at no cost to you, and we'll cover all return shipping costs."
    },
    {
      category: "Payment",
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods including credit and debit cards (Visa, Mastercard), mobile money (MTN, Telecel, AirtelTigo), and bank transfers. All payments are processed securely through our payment partners."
    },
    {
      category: "Payment",
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your full payment card details on our servers. All payments are processed securely through our payment partners, including Paystack."
    },
    {
      category: "Payment",
      question: "Can I get an invoice for my purchase?",
      answer: "Yes, you'll receive an invoice via email after your order is confirmed. You can also download invoices from your order history in your account. Invoices include order details, items purchased, and payment information."
    },
    {
      category: "Payment",
      question: "What should I do if my payment fails?",
      answer: "If your payment fails, check that your payment method has sufficient funds, your card details are correct, and your payment method is not expired. If the issue persists, contact your bank or payment provider, or try a different payment method."
    },
    {
      category: "Delivery",
      question: "What are your delivery areas?",
      answer: "We currently deliver to selected areas in Greater Accra, Ashanti, Western, and Eastern regions. Enter your address during checkout to see if we deliver to your area. We're continuously expanding our delivery network."
    },
    {
      category: "Delivery",
      question: "How long does delivery take?",
      answer: "Standard delivery takes 2-5 business days. Express delivery (1-2 business days) and same-day delivery are available in select areas for an additional fee. Delivery times are estimates and may vary based on location and order volume."
    },
    {
      category: "Delivery",
      question: "Do you charge for delivery?",
      answer: "Delivery is free for orders over GH₵200. For orders under GH₵200, a delivery fee of GH₵10 applies. Express and same-day delivery options have additional fees. All delivery fees are clearly displayed at checkout."
    },
    {
      category: "Delivery",
      question: "Can I change my delivery address?",
      answer: "You can update your delivery address before your order is shipped. Go to 'My Orders,' select your order, and click 'Update Address.' Once an order is shipped, address changes may not be possible. Contact customer service for assistance."
    },
    {
      category: "Returns",
      question: "What is your return policy?",
      answer: "You can return eligible items within 7 days of delivery. Items must be unopened, unused, and in original packaging with tags attached. Perishable items, opened products, and customized items are not eligible for return. See our Shipping & Returns page for full details."
    },
    {
      category: "Returns",
      question: "How do I return an item?",
      answer: "Log into your account, go to 'My Orders,' select the order you want to return, and click 'Return Item.' We'll provide a return authorization number and instructions. Package the item securely and ship it back to the address provided."
    },
    {
      category: "Returns",
      question: "How long does it take to process a refund?",
      answer: "Refunds are processed within 7-14 business days after we receive and inspect your returned items. The refund will appear in your original payment method within 5-10 business days after processing."
    },
    {
      category: "Returns",
      question: "Who pays for return shipping?",
      answer: "You are responsible for return shipping costs unless the return is due to our error, a defective product, or an incorrect item. In such cases, we cover all return shipping costs."
    },
    {
      category: "Products",
      question: "How do I search for products?",
      answer: "Use the search bar at the top of the page to search by product name, brand, or category. You can also browse products by category using the navigation menu. Use filters to narrow down your search by price, brand, rating, and more."
    },
    {
      category: "Products",
      question: "Are product images accurate?",
      answer: "We strive to provide accurate product images, but images are for illustrative purposes only. Actual products may vary slightly in appearance, size, or packaging. Please read product descriptions carefully before purchasing."
    },
    {
      category: "Products",
      question: "What if a product is out of stock?",
      answer: "If a product is out of stock, you'll see a notification on the product page. You can sign up for restock notifications to be alerted when the product becomes available again. We work to restock popular items quickly."
    },
    {
      category: "Products",
      question: "Can I see product ingredients and nutritional information?",
      answer: "Yes, detailed product information including ingredients, nutritional information, and allergen warnings are available on product pages. This information is provided by manufacturers and suppliers."
    },
    {
      category: "AI Features",
      question: "What is the AI Shopping Assistant?",
      answer: "Our AI Shopping Assistant provides personalized product recommendations based on your preferences, dietary restrictions, budget, and shopping history. It can help you find products, create shopping lists, and suggest meal ideas."
    },
    {
      category: "AI Features",
      question: "How do AI recommendations work?",
      answer: "AI recommendations are based on your account preferences, including dietary restrictions, cuisine preferences, family size, budget, and past purchases. The more you use Grovio and update your preferences, the better our recommendations become."
    },
    {
      category: "AI Features",
      question: "Can I customize my AI preferences?",
      answer: "Yes, you can update your preferences at any time in your account settings. Go to 'Preferences' to update your dietary restrictions, favorite ingredients, budget range, and other preferences that influence AI recommendations."
    },
    {
      category: "AI Features",
      question: "What are AI-generated product bundles?",
      answer: "AI-generated bundles are curated collections of complementary products that save you time and money. Bundles are personalized based on your preferences and offer discounts of 10-25% compared to buying items individually."
    },
    {
      category: "Technical",
      question: "The website is not loading properly. What should I do?",
      answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, check your internet connection or contact our technical support team. We're constantly working to improve site performance."
    },
    {
      category: "Technical",
      question: "Can I use Grovio on my mobile device?",
      answer: "Yes, Grovio is fully responsive and works on all mobile devices. You can access our website through your mobile browser. We also offer a mobile-optimized experience for seamless shopping on the go."
    },
    {
      category: "Technical",
      question: "How do I enable cookies?",
      answer: "Cookies are enabled by default in most browsers. If you're having issues, check your browser settings and ensure cookies are enabled for our website. Some features may not work properly if cookies are disabled. See our Cookie Policy for more information."
    },
    {
      category: "Technical",
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. We use industry-standard encryption, secure authentication, and follow best practices for data protection. Your personal information is protected in accordance with our Privacy Policy. We never sell your personal information."
    }
  ]

  const categories = ["all", ...Array.from(new Set(faqs.map(faq => faq.category)))]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find quick answers to common questions about Grovio
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-lg border-2 border-gray-200 focus:border-[#D35F0E]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-[#D35F0E] hover:bg-[#D35F0E]/90" : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const globalIndex = faqs.indexOf(faq)
              const isOpen = openIndex === globalIndex
              
              return (
                <Card key={globalIndex} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFAQ(globalIndex)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-semibold text-[#D35F0E] bg-orange-50 px-2 py-1 rounded">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-400 shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 shrink-0 ml-4" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">No FAQs found matching your search. Try a different search term or category.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Can't find what you're looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
                Contact Support
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline">
                Visit Help Center
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}


"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Home, 
  ShoppingBag, 
  Search, 
  ArrowRight, 
  Sparkles,
  MapPin,
  Package,
  Heart,
  TrendingUp,
  ChevronRight
} from 'lucide-react'

export default function NotFoundPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      setTimeout(() => {
        router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
      }, 300)
    }
  }

  const quickLinks = [
    { icon: Home, label: 'Home', href: '/', color: 'from-orange-500 to-red-500' },
    { icon: ShoppingBag, label: 'Shop All', href: '/shop', color: 'from-blue-500 to-cyan-500' },
    { icon: Package, label: 'My Orders', href: '/orders', color: 'from-purple-500 to-pink-500' },
    { icon: Heart, label: 'Favorites', href: '/favorites', color: 'from-rose-500 to-pink-500' }
  ]

  const popularPages = [
    { name: 'Fresh Produce', href: '/shop?category=fresh-produce', trend: '+12%' },
    { name: 'Dairy & Eggs', href: '/shop?category=dairy', trend: '+8%' },
    { name: 'Bakery', href: '/shop?category=bakery', trend: '+15%' },
    { name: 'Beverages', href: '/shop?category=beverages', trend: '+6%' }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50/30 to-slate-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-linear-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 1.5,
            y: -mousePosition.y * 1.5,
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-linear-to-br from-green-200/30 to-teal-200/30 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {i % 4 === 0 && <ShoppingBag className="w-8 h-8 text-orange-300/50" />}
            {i % 4 === 1 && <Package className="w-8 h-8 text-blue-300/50" />}
            {i % 4 === 2 && <Heart className="w-8 h-8 text-pink-300/50" />}
            {i % 4 === 3 && <Sparkles className="w-8 h-8 text-purple-300/50" />}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="max-w-5xl w-full">
          {/* Logo */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Grovio" width={48} height={48} className="w-12 h-12" />
              <span className="text-2xl font-bold text-gray-800">Grovio</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - 404 Animation */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Animated 404 */}
                <motion.div 
                  className="text-[180px] lg:text-[220px] font-black leading-none text-transparent bg-clip-text bg-linear-to-br from-[#D35F0E] via-orange-500 to-rose-500"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  404
                </motion.div>

                {/* Floating Cart */}
                <motion.div
                  className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-2xl p-4"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ShoppingBag className="w-12 h-12 text-[#D35F0E]" />
                </motion.div>

                {/* Floating Package */}
                <motion.div
                  className="absolute bottom-12 -left-8 bg-white rounded-xl shadow-xl p-3"
                  animate={{
                    y: [0, -12, 0],
                    rotate: [5, -5, 5],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Package className="w-8 h-8 text-blue-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              className="order-1 lg:order-2 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Heading */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Oops! This aisle is{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D35F0E] to-orange-500">
                      empty
                    </span>
                  </h1>
                </motion.div>
                
                <motion.p
                  className="text-xl text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Looks like this page went out of stock. Let's get you back to shopping!
                </motion.p>
              </div>

              {/* Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D35F0E] transition-colors" />
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-32 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-[#D35F0E] transition-all"
                  />
                  <Button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-[#D35F0E] to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white px-6"
                  >
                    {isSearching ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Search className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </div>
              </motion.form>

              {/* Quick Links */}
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link href={link.href}>
                      <Card className="group cursor-pointer border-2 border-transparent hover:border-[#D35F0E]/50 transition-all overflow-hidden">
                        <CardContent className="p-4 relative">
                          <div className={`absolute inset-0 bg-linear-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                          <div className="relative flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-linear-to-br ${link.color} bg-opacity-10`}>
                              <link.icon className="w-5 h-5 text-gray-700" />
                            </div>
                            <span className="font-semibold text-gray-800">{link.label}</span>
                            <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-[#D35F0E] group-hover:translate-x-1 transition-all" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Popular Pages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#D35F0E]" />
                  <span className="font-semibold text-gray-700">Trending Categories</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {popularPages.map((page, index) => (
                    <Link key={page.name} href={page.href}>
                      <motion.div
                        className="p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-[#D35F0E] hover:shadow-md transition-all group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-[#D35F0E]">
                            {page.name}
                          </span>
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            {page.trend}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Main CTA */}
              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link href="/" className="flex-1">
                  <Button className="w-full bg-linear-to-r from-[#D35F0E] to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" className="py-6 px-8 text-lg rounded-xl border-2 hover:border-[#D35F0E] hover:bg-orange-50">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shop Now
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Help Text */}
          <motion.div
            className="text-center mt-12 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm">
              Error Code: <span className="font-mono font-semibold text-gray-700">404 NOT_FOUND</span>
            </p>
            <p className="text-sm mt-2">
              Need help?{' '}
              <Link href="/contact" className="text-[#D35F0E] hover:underline font-medium">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


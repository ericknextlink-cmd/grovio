/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Bell, ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { getGreeting } from "@/lib/utils"

interface HeaderProps {
  user?: {
    fullName: string
    username: string
  } | null
}

export default function Header({ user }: HeaderProps) {
  const [greeting, setGreeting] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setGreeting(getGreeting())
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-grovio-navy text-white shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos.png"
              alt="Grovio Logo"
              width={120}
              height={40}
              className="h-6 sm:h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-grovio-orange font-medium transition-colors text-sm">Home</Link>
            <Link href="/products" className="text-white hover:text-grovio-orange font-medium transition-colors text-sm">Products</Link>
            <Link href="/about" className="text-white hover:text-grovio-orange font-medium transition-colors text-sm">About Us</Link>
            <Link href="/shop" className="text-white hover:text-grovio-orange font-medium transition-colors text-sm">Shop</Link>
            <Link href="/deals" className="text-white hover:text-grovio-orange font-medium transition-colors text-sm">Deals</Link>
            <Link href="/contact" className="text-white hover:text-grovio-orange font-medium transition-colors text-sm">Contact Us</Link>
          </nav>

          {/* Action Icons and Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Action Icons - Always visible */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8 sm:w-9 sm:h-9">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8 sm:w-9 sm:h-9">
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8 sm:w-9 sm:h-9">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            {/* Mobile Menu Button - Only visible on mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10 w-8 h-8 lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Dropdown */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-white hover:text-grovio-orange font-medium transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-white hover:text-grovio-orange font-medium transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-grovio-orange font-medium transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/shop" 
                className="text-white hover:text-grovio-orange font-medium transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/deals" 
                className="text-white hover:text-grovio-orange font-medium transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Deals
              </Link>
              <Link 
                href="/contact" 
                className="text-white hover:text-grovio-orange font-medium transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

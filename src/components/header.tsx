"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/cart-context"
import { useFavorites } from "@/contexts/favorites-context"
import { useAuthStore } from "@/stores/auth-store"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getUniqueItemCount } = useCart()
  const { getFavoritesCount } = useFavorites()
  const { user: authUser, isAuthenticated, signout } = useAuthStore()
  const cartItemCount = getUniqueItemCount()
  const favoritesCount = getFavoritesCount()
  
  // Use auth user if available, otherwise fall back to prop
  const currentUser = authUser || user

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-[#181725] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center">
            <Image src="/logo-text.png" alt="Grovio" width={140} height={24} className="-ml-2 h-8 sm:h-6 w-auto" />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden scale-[0.9] lg:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-[#D35F0E] font-medium transition-colors">Home</Link>
            <Link href="/products" className="text-white hover:text-[#D35F0E] font-medium transition-colors">Products</Link>
            <Link href="/about" className="text-white hover:text-[#D35F0E] font-medium transition-colors">About Us</Link>
            <Link href="/shop" className="text-white hover:text-[#D35F0E] font-medium transition-colors">Shop</Link>
            <Link href="/contact" className="text-white hover:text-[#D35F0E] font-medium transition-colors">Contacts</Link>
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-4 pr-12 py-2 bg-white text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-[#D35F0E]"
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#D35F0E] hover:bg-[#D35F0E]/90 h-8 w-8 p-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Layout - Username in center, icons on right */}
          <div className="lg:hidden flex items-center justify-center flex-1">
            {isAuthenticated && (
              <span className="text-white text-sm font-medium">
                Welcome, {currentUser?.firstName || currentUser?.lastName || 'User'}
              </span>
            )}
          </div>

          {/* Desktop Action Buttons - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#181725] px-4 py-2 text-sm rounded-full bg-transparent">
                    {user?.firstName} {user?.lastName}
                    <Image src="/profile.png" alt="Profile" width={24} height={24} className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#181725] px-4 py-2 text-sm rounded-full bg-transparent"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signup">
                  <Button className="bg-[#D35F0E] rounded-full hover:bg-[#D35F0E]/90 text-white px-4 py-2 text-sm">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#181725] px-4 py-2 text-sm rounded-full bg-transparent">
                    Login
                  </Button>
                </Link>
              </>
            )}
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8 relative">
                <Heart className="h-4 w-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D35F0E] text-white text-xs rounded-full h-2 w-2"></span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8 relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D35F0E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
                {cartItemCount === 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D35F0E] text-white text-xs rounded-full h-2 w-2"></span>
                )}
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Action Buttons - Icons only */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8 relative">
                <Heart className="h-4 w-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D35F0E] text-white text-xs rounded-full h-2 w-2"></span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8 relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D35F0E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
                {cartItemCount === 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D35F0E] text-white text-xs rounded-full h-2 w-2"></span>
                )}
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            
            {/* Mobile Menu Button - Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 w-8 h-8"
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

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-4 pr-12 py-2 bg-white text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-[#D35F0E]"
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#D35F0E] hover:bg-[#D35F0E]/90 h-8 w-8 p-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Dropdown */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/shop"
                className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacts
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2 text-left"
                    >
                      Logout
                    </button>
                    <span className="text-white text-sm py-2">
                      Welcome, {currentUser?.firstName || currentUser?.lastName || 'User'}
                    </span>
                    <button 
                      onClick={() => {
                        signout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/login" 
                      className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

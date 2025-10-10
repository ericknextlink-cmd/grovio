"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, ShoppingCart, User, Search, Menu, X } from "lucide-react"
<<<<<<< Updated upstream
import { useAuth } from "@/contexts/AuthContext"
=======
import { useCart } from "@/contexts/cart-context"
import { useFavorites } from "@/contexts/favorites-context"
import { useAuthStore } from "@/stores/auth-store"
>>>>>>> Stashed changes

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
<<<<<<< Updated upstream
  const { user, isAuthenticated, logout } = useAuth()
=======
  const { getUniqueItemCount } = useCart()
  const { getFavoritesCount } = useFavorites()
  const { user: authUser, isAuthenticated, signout } = useAuthStore()
  const cartItemCount = getUniqueItemCount()
  const favoritesCount = getFavoritesCount()
  
  // Use auth user if available, otherwise fall back to prop
  const currentUser = authUser || user
>>>>>>> Stashed changes

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-[#181725] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* <Image src="/logo.png" alt="Grovio" width={32} height={32} className="h-6 w-6 sm:h-8 sm:w-8" priority /> */}
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

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
<<<<<<< Updated upstream
                <Link href="/profile">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#181725] px-4 py-2 text-sm rounded-full bg-transparent">
                    {user?.firstName} {user?.lastName}
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
=======
                <span className="text-white text-sm">
                  Welcome, {currentUser?.firstName || currentUser?.fullName || 'User'}
                </span>
                <Button 
                  onClick={signout}
                  variant="outline" 
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            {isAuthenticated && (
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-8 h-8">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}

=======
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
            
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
                    <span className="text-white text-sm py-2">
                      Welcome, {currentUser?.firstName || currentUser?.fullName || 'User'}
                    </span>
                    <button 
                      onClick={() => {
                        signout()
>>>>>>> Stashed changes
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
<<<<<<< Updated upstream
                    <Link
                      href="/login"
=======
                    <Link 
                      href="/login" 
>>>>>>> Stashed changes
                      className="text-white hover:text-[#D35F0E] font-medium transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
<<<<<<< Updated upstream
                    <Link
                      href="/signup"
=======
                    <Link 
                      href="/signup" 
>>>>>>> Stashed changes
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

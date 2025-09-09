/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-grovio-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Grovio</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The modernized revolutionary grocery shopping platform that helps you shop smarter and better.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/help" className="hover:text-white transition-colors">Help & Support</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company Info</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Grovio</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div className="space-y-4">
            <h4 className="font-semibold">My Account</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Order History</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <span>© 2024 Grovio. All rights reserved.</span>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Payment Methods:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-white rounded text-xs flex items-center justify-center text-grovio-navy font-bold">V</div>
                <div className="w-8 h-5 bg-white rounded text-xs flex items-center justify-center text-grovio-navy font-bold">M</div>
                <div className="w-8 h-5 bg-white rounded text-xs flex items-center justify-center text-grovio-navy font-bold">P</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

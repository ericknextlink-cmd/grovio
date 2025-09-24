import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-[#181725] text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Brand Statement */}
        <div className="mb-8">
          <p className="text-white text-sm leading-relaxed max-w-2xl">
            Grovio is redefining modern living through innovation, sustainability, and style. We create solutions that inspire a smarter, greener, and more connected lifestyle for individuals and businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white">
              <li><Link href="/" className="hover:text-[#D35F0E] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#D35F0E] transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-[#D35F0E] transition-colors">Products & Services</Link></li>
              <li><Link href="/blog" className="hover:text-[#D35F0E] transition-colors">Blog & Insights</Link></li>
              <li><Link href="/contact" className="hover:text-[#D35F0E] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Customer Care</h4>
            <ul className="space-y-2 text-sm text-white">
              <li><Link href="/help" className="hover:text-[#D35F0E] transition-colors">Help Center</Link></li>
              <li><Link href="/shipping" className="hover:text-[#D35F0E] transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-[#D35F0E] transition-colors">FAQs</Link></li>
              <li><Link href="/track" className="hover:text-[#D35F0E] transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-white">
              <li><Link href="/privacy" className="hover:text-[#D35F0E] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#D35F0E] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookies" className="hover:text-[#D35F0E] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Join the Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Join the Community</h4>
            <p className="text-sm text-white">
              Sign up to receive exclusive updates, lifestyle tips, and early access to new releases.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter Your Email Address" 
                className="flex-1 bg-white text-gray-900 placeholder-gray-500 border-0 rounded-lg"
              />
              <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white rounded-lg px-4">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-white">
              © 2025 Grovio. All Rights Reserved. Designed for those who demand excellence.
            </div>
            <div className="text-sm text-white">
              Grovio - Elevating Everyday Living Through Smart Innovation.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Bell, ShoppingCart, User } from "lucide-react"
import { getGreeting } from "@/lib/utils"

interface HeaderProps {
  user?: {
    fullName: string
    username: string
  } | null
}

export default function Header({ user }: HeaderProps) {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    setGreeting(getGreeting())
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="grovio-gradient text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Greeting */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              {/* Original logo and text - commented out */}
              {/* <div className="w-10 h-10 bg-grovio-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌿</span>
              </div>
              <span className="text-2xl font-bold">Grovio</span> */}
              
              {/* New logo image */}
              <Image
                src="/logo.png"
                alt="Grovio Logo"
                width={120}
                height={40}
                className="h-10 w-auto scale-[1.2]"
                priority
              />
            </Link>
            <div className="hidden md:block text-sm opacity-90">
              {greeting}, {user ? user.fullName.split(" ")[0] : "User"}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <User className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-transparent hover:text-grovio-navy bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-grovio-orange hover:bg-grovio-orange/90 text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

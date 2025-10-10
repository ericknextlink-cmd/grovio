import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
<<<<<<< Updated upstream
import { AuthProvider } from "@/contexts/AuthContext"
=======
import { CartProvider } from "@/contexts/cart-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { AuthProvider } from "@/components/auth-provider"
>>>>>>> Stashed changes


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Grovio - Revolutionary Grocery Shopping Platform",
  description: "Shop smarter and better with Grovio - Ghana's modernized grocery shopping platform",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
<<<<<<< Updated upstream
            {children}
            {/* <Footer /> */}
            <Toaster />
=======
            <CartProvider>
              <FavoritesProvider>
                {children}
                {/* <Footer /> */}
                <Toaster />
              </FavoritesProvider>
            </CartProvider>
>>>>>>> Stashed changes
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

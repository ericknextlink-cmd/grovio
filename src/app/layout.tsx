import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/cart-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { AuthInitializer } from "@/components/auth-initializer"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Grovio - Revolutionary Grocery Shopping Platform",
  description: "Shop smarter and better with Grovio - Ghana's modernized grocery shopping platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Location picker uses server-side Places API (/api/places/*); no client Maps script needed */}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <AuthProvider>
              <AuthInitializer />
              <CartProvider>
                <FavoritesProvider>
                  {children}
                  {/* <Footer /> */}
                  <Toaster />
                  <SonnerToaster />
                </FavoritesProvider>
              </CartProvider>
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}

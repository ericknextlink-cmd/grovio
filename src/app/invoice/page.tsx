"use client"

import { useSearchParams } from "next/navigation"
import Invoice from "@/components/invoice"
import Header from "@/components/header"
import { useAuthStore } from "@/stores/auth-store"

export default function InvoicePage() {
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuthStore()
  
  // Default customer name from auth if available
  const defaultCustomerName = user ? `${user.firstName} ${user.lastName}` : "Guest User"
  const defaultPhone = user?.phoneNumber || "N/A"
  
  // Get order details from URL params or use defaults
  const orderNumber = searchParams.get("order") || "4787837473"
  const customerName = searchParams.get("name") || defaultCustomerName
  const customerAddress = searchParams.get("address") || "Adjuma Crescent Road\nSouth Industrial Area\nAccra, Ghana"
  const customerPhone = searchParams.get("phone") || defaultPhone
  const orderDate = searchParams.get("date") || new Date().toLocaleDateString("en-GB")
  const discount = parseFloat(searchParams.get("discount") || "200")
  const credits = parseFloat(searchParams.get("credits") || "0")

  return (
    <>
      <Header />
      <Invoice
        orderNumber={orderNumber}
        customerName={customerName}
        customerAddress={customerAddress}
        customerPhone={customerPhone}
        orderDate={orderDate}
        discount={discount}
        credits={credits}
      />
    </>
  )
}

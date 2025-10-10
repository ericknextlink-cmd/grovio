"use client"

import { useSearchParams } from "next/navigation"
import Invoice from "@/components/invoice"

export default function InvoicePage() {
  const searchParams = useSearchParams()
  
  // Get order details from URL params or use defaults
  const orderNumber = searchParams.get("order") || "4787837473"
  const customerName = searchParams.get("name") || "William Duncan Bills"
  const customerAddress = searchParams.get("address") || "Adjuma Crescent Road\nSouth Industrial Area\nAccra, Ghana"
  const customerPhone = searchParams.get("phone") || "00233265713324"
  const orderDate = searchParams.get("date") || new Date().toLocaleDateString("en-GB")
  const discount = parseFloat(searchParams.get("discount") || "200")
  const credits = parseFloat(searchParams.get("credits") || "0")

  return (
    <Invoice
      orderNumber={orderNumber}
      customerName={customerName}
      customerAddress={customerAddress}
      customerPhone={customerPhone}
      orderDate={orderDate}
      discount={discount}
      credits={credits}
    />
  )
}

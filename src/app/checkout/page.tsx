"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Wallet, CreditCard, Smartphone, Building } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import LocationPicker from "@/components/location-picker"

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems } = useCart()
  const [selectedLocation, setSelectedLocation] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("16 September")
  const [paymentMethod, setPaymentMethod] = useState("mobile-money")
  const [mobileNumber, setMobileNumber] = useState("")
  const [discountCode, setDiscountCode] = useState("")

  const itemsTotal = getTotalPrice()
  const deliveryFee = 100
  const total = itemsTotal + deliveryFee

  const handleConfirmOrder = () => {
    // TODO: Process payment
    console.log("Processing order...")
    
    // Generate order number
    const orderNumber = Date.now().toString()
    
    // Redirect to invoice with order details
    const params = new URLSearchParams({
      order: orderNumber,
      name: "William Duncan Bills", // In real app, get from user profile
      address: selectedLocation || "Adjuma Crescent Road\nSouth Industrial Area\nAccra, Ghana",
      phone: "00233265713324", // In real app, get from user profile
      date: new Date().toLocaleDateString("en-GB"),
      discount: discountCode ? "200" : "0",
      credits: "0"
    })
    
    window.location.href = `/invoice?${params.toString()}`
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to your cart before checkout.</p>
          <Link href="/cart">
            <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white px-8 py-3 text-lg rounded-full">
              View Cart
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D35F0E] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-gray-800">Grovio</span>
          </div>
          <span className="text-lg font-semibold text-gray-600">Secure checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Delivery Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#D35F0E]" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivering to</p>
                    <p className="font-medium">ERIC BOAHEN</p>
                  </div>
                  
                  <LocationPicker 
                    selectedLocation={selectedLocation}
                    onLocationSelect={setSelectedLocation}
                  />
                  
                  <div className="text-sm text-gray-600">
                    <p>Contact: 0265713327</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Period */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#D35F0E]" />
                  Delivery Period
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">To Delivery Address</p>
                  <p className="font-medium">
                    Delivery Date: <span className="text-[#D35F0E] font-bold">16 September</span> and <span className="text-[#D35F0E] font-bold">17 September</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-[#D35F0E]" />
                  Select Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  
                  {/* Credit Card */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Make Payment with Credit Card (Mastercard, Visa)
                    </Label>
                  </div>

                  {/* Mobile Money */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mobile-money" id="mobile-money" />
                      <Label htmlFor="mobile-money" className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Pay with Mobile Money
                      </Label>
                    </div>
                    {paymentMethod === "mobile-money" && (
                      <div className="ml-6 space-y-3">
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2">
                          <Image src="/mtn-logo.png" alt="MTN" width={20} height={20} />
                          MTN Mobile Money
                        </Button>
                        <Input 
                          placeholder="Enter Mobile Number Here"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Bank Transfer */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Bank Deposit / Bank Transfer
                      </Label>
                    </div>
                    {paymentMethod === "bank-transfer" && (
                      <div className="ml-6 p-4 bg-gray-100 rounded-lg space-y-2 text-sm">
                        <p><span className="font-medium">Account Name:</span> Grovio Ghana</p>
                        <p><span className="font-medium">Bank Name:</span> Consolidated Bank Ghana(CBG)</p>
                        <p><span className="font-medium">Account Number:</span> 294948992294928</p>
                        <p><span className="font-medium">Branch:</span> Kokomlemle</p>
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Item's total ({getTotalItems()})</span>
                    <span>GH₵ {itemsTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery fees</span>
                    <span>GH₵ {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>GH₵ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Input 
                    placeholder="Enter Discount Voucher"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <Button 
                    className="w-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white py-3 text-lg"
                    onClick={handleConfirmOrder}
                  >
                    Confirm Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

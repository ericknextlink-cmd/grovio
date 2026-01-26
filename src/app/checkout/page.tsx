/* eslint-disable  @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock, Wallet, CreditCard, Smartphone, Building } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuthStore } from "@/stores/auth-store"
import { toast } from "sonner"
import { api } from "@/lib/api-client"
import LocationPicker from "@/components/location-picker"
import { useOnboardingGuard } from "@/hooks/use-onboarding-guard"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()
  const { user, isAuthenticated } = useAuthStore()
  const { isChecking: checkingOnboarding } = useOnboardingGuard()
  
  // Delivery address fields
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("Accra")
  const [region, setRegion] = useState("Greater Accra")
  const [phone, setPhone] = useState(user?.phoneNumber || "")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [deliveryNotes, setDeliveryNotes] = useState("")
  
  // Payment & discount
  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const [discountCode, setDiscountCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const itemsTotal = getTotalPrice()
  const deliveryFee = 0 // Free delivery
  const discount = 0 // Calculate based on discount code if needed
  const credits = 0 // From user account if available
  const total = itemsTotal + deliveryFee - discount - credits

  const handleConfirmOrder = async () => {
    // Validation
    if (!isAuthenticated) {
      toast.error('Please login to place an order')
      router.push('/login')
      return
    }

    if (!street || !city || !region || !phone) {
      toast.error('Please fill in all delivery address fields')
      return
    }

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsProcessing(true)

    try {
      // Prepare cart items for backend
      const cartItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))

      // Prepare delivery address
      const deliveryAddress = {
        street,
        city,
        region,
        phone,
        additionalInfo
      }

      // Create order and initialize payment
      const response = await api.orders.create({
        cartItems,
        deliveryAddress,
        discount,
        credits,
        deliveryNotes
      })

      if (response.data.success) {
        const { authorizationUrl, paymentReference, pendingOrderId } = response.data.data

        // Store pending order ID for callback
        localStorage.setItem('pending_order_id', pendingOrderId)
        localStorage.setItem('payment_reference', paymentReference)

        // Open Paystack payment page
        toast.success('Redirecting to payment...')
        
        // Option 1: Redirect in same window
        window.location.href = authorizationUrl
        
        // Option 2: Open in popup (uncomment if preferred)
        // const popup = window.open(
        //   authorizationUrl,
        //   'Paystack Payment',
        //   'width=600,height=700'
        // )
      } else {
        throw new Error(response.data.message || 'Failed to create order')
      }
    } catch (error: any) {
      console.error('Order creation error:', error)
      toast.error(
        error.response?.data?.message || 
        error.message || 
        'Failed to create order. Please try again.'
      )
    } finally {
      setIsProcessing(false)
    }
  }

  // Show loading while checking onboarding
  if (checkingOnboarding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D35F0E]" />
      </div>
    )
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
            <Image src="/logo.png" alt="Grovio" width={32} height={32} className="w-8 h-8" />
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
                    <p className="font-medium">
                      {user ? `${user.firstName} ${user.lastName}`.toUpperCase() : "GUEST USER"}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="street">Street Address *</Label>
                      <Input 
                        id="street"
                        placeholder="e.g., 123 Main Street, House Number"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city"
                          placeholder="Accra"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="region">Region *</Label>
                        <Select value={region} onValueChange={setRegion}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Greater Accra">Greater Accra</SelectItem>
                            <SelectItem value="Ashanti">Ashanti</SelectItem>
                            <SelectItem value="Western">Western</SelectItem>
                            <SelectItem value="Eastern">Eastern</SelectItem>
                            <SelectItem value="Central">Central</SelectItem>
                            <SelectItem value="Northern">Northern</SelectItem>
                            <SelectItem value="Upper East">Upper East</SelectItem>
                            <SelectItem value="Upper West">Upper West</SelectItem>
                            <SelectItem value="Volta">Volta</SelectItem>
                            <SelectItem value="Bono">Bono</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Contact Phone *</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        placeholder="+233241234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo">Additional Info (Optional)</Label>
                      <Input 
                        id="additionalInfo"
                        placeholder="e.g., Gate code, Landmark"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="deliveryNotes">Delivery Notes (Optional)</Label>
                      <Textarea 
                        id="deliveryNotes"
                        placeholder="Any special delivery instructions..."
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
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
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#D35F0E]" />
                    <span className="font-medium">Secure Payment via Paystack</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Pay safely with Credit/Debit Card, Bank Transfer, or Mobile Money
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Image src="/logo.png" alt="Paystack" width={20} height={20} className="w-5 h-5" />
                    <span>Powered by Paystack - SSL Encrypted</span>
                  </div>
                </div>
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
                    <span>{`Item's total (${getTotalItems()})`}</span>
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
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Processing...
                      </span>
                    ) : (
                      <>Proceed to Payment</>
                    )}
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

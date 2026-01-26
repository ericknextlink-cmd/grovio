"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Search, Package, MapPin, Clock, CheckCircle, Truck, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth-store"
import { api } from "@/lib/api-client"
import { toast } from "sonner"

export default function TrackOrderPage() {
  const { isAuthenticated } = useAuthStore()
  const [orderNumber, setOrderNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!orderNumber.trim()) {
      toast.error("Please enter an order number")
      return
    }

    setIsLoading(true)
    try {
      // Try to find order by order number
      // First, get user's orders if authenticated
      if (isAuthenticated) {
        const response = await api.orders.list({ limit: 100 })
        if (response.data.success) {
          const orders = response.data.data || []
          const foundOrder = orders.find(
            (order: any) => 
              order.order_id === orderNumber.toUpperCase() || 
              order.invoice_number === orderNumber
          )
          
          if (foundOrder) {
            setOrderData(foundOrder)
            toast.success("Order found!")
          } else {
            toast.error("Order not found. Please check your order number.")
            setOrderData(null)
          }
        }
      } else {
        // For non-authenticated users, show a message
        toast.info("Please sign in to track your orders")
      }
    } catch (error) {
      console.error("Failed to track order:", error)
      toast.error("Failed to track order. Please try again.")
      setOrderData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <CheckCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusSteps = (status: string) => {
    const steps = [
      { key: "pending", label: "Order Placed", completed: true },
      { key: "processing", label: "Processing", completed: false },
      { key: "shipped", label: "Shipped", completed: false },
      { key: "delivered", label: "Delivered", completed: false }
    ]

    const statusIndex = steps.findIndex(s => s.key === status.toLowerCase())
    return steps.map((step, index) => ({
      ...step,
      completed: index <= statusIndex
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-600 mb-8">
            Enter your order number to track the status of your order
          </p>

          {/* Track Order Form */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="Enter Order Number (e.g., ORD-AC23-233E)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="flex-1 text-lg py-6"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white px-8 py-6"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Tracking...
                      </div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Track
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 text-left">
                  You can find your order number in your order confirmation email or in your account under "My Orders."
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        {isAuthenticated && (
          <div className="mb-8 text-center">
            <Link href="/orders">
              <Button variant="outline">
                View All My Orders
              </Button>
            </Link>
          </div>
        )}

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Order #{orderData.order_id}</CardTitle>
                    <p className="text-sm text-gray-600">Invoice: {orderData.invoice_number}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(orderData.status)}`}>
                    {orderData.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="font-semibold">
                      {new Date(orderData.created_at).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="font-semibold text-lg">GH₵ {orderData.total_amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                    <p className={`font-semibold ${orderData.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {orderData.payment_status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Items</p>
                    <p className="font-semibold">{orderData.order_items?.length || 0} item(s)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#D35F0E]" />
                  Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getStatusSteps(orderData.status).map((step, index) => (
                    <div key={step.key} className="flex items-start gap-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        step.completed ? 'bg-[#D35F0E]' : 'bg-gray-200'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-gray-200 last:border-0">
                        <div className="ml-4">
                          <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.label}
                          </p>
                          {step.key === orderData.status.toLowerCase() && (
                            <p className="text-sm text-gray-600 mt-1">
                              Current status
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            {orderData.delivery_address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#D35F0E]" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">{orderData.delivery_address.street}</p>
                    <p className="text-gray-600">
                      {orderData.delivery_address.city}, {orderData.delivery_address.region}
                    </p>
                    {orderData.delivery_address.phone && (
                      <p className="text-gray-600">Phone: {orderData.delivery_address.phone}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Items */}
            {orderData.order_items && orderData.order_items.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orderData.order_items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity} × GH₵ {item.unit_price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-semibold">GH₵ {item.total_price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Link href={`/orders/${orderData.id}`} className="flex-1">
                <Button className="w-full bg-[#D35F0E] hover:bg-[#D35F0E]/90">
                  View Full Order Details
                </Button>
              </Link>
              {orderData.invoice_pdf_url && (
                <a href={orderData.invoice_pdf_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    Download Invoice
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}

        {/* No Order Found Message */}
        {!orderData && !isLoading && orderNumber && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find an order with that number. Please check your order number and try again.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Make sure you entered the correct order number (e.g., ORD-AC23-233E)</p>
                <p>Check your order confirmation email for the order number</p>
                {isAuthenticated && (
                  <p>
                    <Link href="/orders" className="text-[#D35F0E] hover:underline">
                      View all your orders
                    </Link>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-6">
            If you're having trouble tracking your order or have questions, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>
            <Link href="/help">
              <Button variant="outline">Visit Help Center</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}


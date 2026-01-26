"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { api } from '@/lib/api-client'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Package, 
  Loader2, 
  Calendar, 
  MapPin,
  Phone,
  FileText,
  Download,
  Image as ImageIcon,
  ArrowLeft,
  CheckCircle
} from 'lucide-react'
import { useOnboardingGuard } from '@/hooks/use-onboarding-guard'

interface OrderDetails {
  id: string
  order_id: string
  invoice_number: string
  status: string
  payment_status: string
  subtotal: number
  discount: number
  credits: number
  total_amount: number
  created_at: string
  updated_at: string
  paid_at: string
  delivery_address: {
    street: string
    city: string
    region: string
    phone: string
    additionalInfo?: string
  }
  invoice_pdf_url: string
  invoice_image_url: string
  invoice_qr_code: string
  order_items: Array<{
    id: string
    product_name: string
    quantity: number
    unit_price: number
    total_price: number
  }>
}

export default function OrderDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string
  const { isAuthenticated, isLoading: authLoading } = useAuthStore()
  const { isChecking: checkingOnboarding } = useOnboardingGuard()
  
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error('Please login to view order details')
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated && orderId) {
      fetchOrderDetails()
    }
  }, [isAuthenticated, orderId])

  const fetchOrderDetails = async () => {
    setIsLoading(true)
    try {
      const response = await api.orders.getById(orderId)
      
      if (response.data.success) {
        setOrder(response.data.data)
      } else {
        throw new Error('Order not found')
      }
    } catch (error: any) {
      console.error('Failed to fetch order:', error)
      toast.error('Failed to load order details')
      router.push('/orders')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelOrder = async () => {
    if (!order) return

    const confirmed = window.confirm('Are you sure you want to cancel this order?')
    if (!confirmed) return

    setIsCancelling(true)
    try {
      await api.orders.cancel(order.id, 'Customer requested cancellation')
      toast.success('Order cancelled successfully')
      fetchOrderDetails() // Refresh order details
    } catch (error: any) {
      console.error('Failed to cancel order:', error)
      toast.error(error.response?.data?.message || 'Failed to cancel order')
    } finally {
      setIsCancelling(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'failed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (authLoading || checkingOnboarding || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#D35F0E]" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link href="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/orders">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Order #{order.order_id}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order.created_at).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className={`${getStatusColor(order.status)} h-fit`}>
                {order.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × GH₵ {item.unit_price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold">
                        GH₵ {item.total_price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>GH₵ {order.subtotal.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-GH₵ {order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    {order.credits > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Credits Used</span>
                        <span>-GH₵ {order.credits.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>GH₵ {order.total_amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#D35F0E]" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{order.delivery_address.street}</p>
                  <p className="text-gray-600">
                    {order.delivery_address.city}, {order.delivery_address.region}
                  </p>
                  {order.delivery_address.additionalInfo && (
                    <p className="text-sm text-gray-500">
                      {order.delivery_address.additionalInfo}
                    </p>
                  )}
                  <div className="flex items-center gap-2 pt-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{order.delivery_address.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions & Invoice */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Invoice Number</p>
                  <p className="font-semibold">{order.invoice_number}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <Badge className={order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {order.payment_status}
                  </Badge>
                </div>

                {order.paid_at && (
                  <div>
                    <p className="text-sm text-gray-500">Paid At</p>
                    <p className="text-sm">
                      {new Date(order.paid_at).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}

                <Separator />

                {/* Download Invoice */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Download Invoice</p>
                  {order.invoice_pdf_url && (
                    <a href={order.invoice_pdf_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </a>
                  )}
                  {order.invoice_image_url && (
                    <a href={order.invoice_image_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Download Image
                      </Button>
                    </a>
                  )}
                </div>

                {/* Cancel Order */}
                {(order.status === 'pending' || order.status === 'processing') && (
                  <>
                    <Separator />
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleCancelOrder}
                      disabled={isCancelling}
                    >
                      {isCancelling ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        'Cancel Order'
                      )}
                    </Button>
                  </>
                )}

                {order.status === 'delivered' && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Order Delivered</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Invoice Preview (if image available) */}
            {order.invoice_image_url && (
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href={order.invoice_image_url} target="_blank" rel="noopener noreferrer">
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg border border-gray-200 hover:border-[#D35F0E] transition-colors cursor-pointer">
                      <Image
                        src={order.invoice_image_url}
                        alt="Invoice"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </a>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Click to view full size
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}


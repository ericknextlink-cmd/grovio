"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/contexts/cart-context'
import { toast } from 'sonner'
import { api } from '@/lib/api-client'
import Image from 'next/image'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying')
  const [orderData, setOrderData] = useState<any>(null)
  const [message, setMessage] = useState('Verifying your payment...')

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get payment reference from localStorage or URL
        const reference = searchParams.get('reference') || localStorage.getItem('payment_reference')
        const pendingOrderId = localStorage.getItem('pending_order_id')

        if (!reference) {
          throw new Error('No payment reference found')
        }

        setMessage('Confirming your payment with Paystack...')

        // Verify payment with backend
        const response = await api.orders.verifyPayment({ reference })

        if (response.data.success) {
          setStatus('success')
          setOrderData(response.data.data)
          setMessage('Payment successful!')

          // Clear cart
          clearCart()

          // Clear localStorage
          localStorage.removeItem('pending_order_id')
          localStorage.removeItem('payment_reference')

          toast.success('Order placed successfully!', {
            description: `Order #${response.data.data.orderNumber} has been confirmed`
          })
        } else {
          throw new Error(response.data.message || 'Payment verification failed')
        }
      } catch (error: any) {
        console.error('Payment verification error:', error)
        setStatus('failed')
        setMessage(error.response?.data?.message || error.message || 'Payment verification failed')
        
        toast.error('Payment verification failed', {
          description: 'Please contact support if amount was deducted'
        })
      }
    }

    verifyPayment()
  }, [searchParams, clearCart])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Grovio" width={60} height={60} className="w-16 h-16" />
        </div>

        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {status === 'verifying' && (
            <Loader2 className="h-16 w-16 text-[#D35F0E] animate-spin" />
          )}
          {status === 'success' && (
            <CheckCircle className="h-16 w-16 text-green-500" />
          )}
          {status === 'failed' && (
            <XCircle className="h-16 w-16 text-red-500" />
          )}
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {status === 'verifying' && 'Processing Payment...'}
            {status === 'success' && 'Payment Successful!'}
            {status === 'failed' && 'Payment Failed'}
          </h2>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Order Details (Success) */}
        {status === 'success' && orderData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-semibold">{orderData.orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Invoice Number:</span>
              <span className="font-semibold">{orderData.invoiceNumber}</span>
            </div>
            {orderData.pdfUrl && (
              <div className="pt-2 border-t border-gray-200">
                <a 
                  href={orderData.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#D35F0E] hover:underline text-sm"
                >
                  Download Invoice PDF →
                </a>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {status === 'success' && orderData && (
            <>
              <Link href={`/orders/${orderData.orderId}`}>
                <Button className="w-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white">
                  View Order Details
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </Link>
            </>
          )}

          {status === 'failed' && (
            <>
              <Link href="/cart">
                <Button className="w-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white">
                  Return to Cart
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Go to Home
                </Button>
              </Link>
            </>
          )}

          {status === 'verifying' && (
            <Button disabled className="w-full">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Please wait...
            </Button>
          )}
        </div>

        {/* Support Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Need help? <a href="/contact" className="text-[#D35F0E] hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  )
}


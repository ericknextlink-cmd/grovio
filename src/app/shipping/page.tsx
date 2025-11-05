"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Truck, Package, RefreshCw, Shield, Clock, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShippingReturnsPage() {
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping & Returns</h1>
          <p className="text-gray-600">
            Comprehensive information about our delivery options, shipping policies, and return procedures
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#delivery-areas" className="text-[#D35F0E] hover:underline">1. Delivery Areas</a></li>
            <li><a href="#delivery-options" className="text-[#D35F0E] hover:underline">2. Delivery Options & Timeframes</a></li>
            <li><a href="#delivery-fees" className="text-[#D35F0E] hover:underline">3. Delivery Fees</a></li>
            <li><a href="#order-tracking" className="text-[#D35F0E] hover:underline">4. Order Tracking</a></li>
            <li><a href="#delivery-requirements" className="text-[#D35F0E] hover:underline">5. Delivery Requirements</a></li>
            <li><a href="#return-policy" className="text-[#D35F0E] hover:underline">6. Return Policy</a></li>
            <li><a href="#return-process" className="text-[#D35F0E] hover:underline">7. Return Process</a></li>
            <li><a href="#refunds" className="text-[#D35F0E] hover:underline">8. Refunds</a></li>
            <li><a href="#damaged-items" className="text-[#D35F0E] hover:underline">9. Damaged or Defective Items</a></li>
            <li><a href="#contact" className="text-[#D35F0E] hover:underline">10. Contact Us</a></li>
          </ul>
        </div>

        {/* Section 1 */}
        <section id="delivery-areas" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-[#D35F0E]" />
            <h2 className="text-2xl font-semibold text-gray-900">1. Delivery Areas</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Grovio currently delivers to selected areas across Ghana. We are continuously expanding our delivery network 
              to serve more customers.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Currently Available Delivery Areas:</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Greater Accra Region (Accra, Tema, and surrounding areas)</li>
                <li>Ashanti Region (Kumasi and surrounding areas)</li>
                <li>Western Region (selected areas)</li>
                <li>Eastern Region (selected areas)</li>
              </ul>
            </div>

            <p>
              To check if we deliver to your area, enter your delivery address during checkout. If your area is not 
              currently covered, we will notify you when we expand our services to your location.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="delivery-options" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-6 w-6 text-[#D35F0E]" />
            <h2 className="text-2xl font-semibold text-gray-900">2. Delivery Options & Timeframes</h2>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#D35F0E]" />
                  <CardTitle>Standard Delivery</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">
                  <strong>Delivery Time:</strong> 2-5 business days
                </p>
                <p className="text-gray-700">
                  <strong>Cost:</strong> Free for orders over GH₵200. GH₵10 for orders under GH₵200.
                </p>
                <p className="text-sm text-gray-600">
                  Orders are processed within 24 hours and delivered during business hours (Monday-Friday, 9am-6pm).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#D35F0E]" />
                  <CardTitle>Express Delivery</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">
                  <strong>Delivery Time:</strong> 1-2 business days
                </p>
                <p className="text-gray-700">
                  <strong>Cost:</strong> GH₵25
                </p>
                <p className="text-sm text-gray-600">
                  Available for orders placed before 2pm. Delivered on the next business day or within 48 hours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#D35F0E]" />
                  <CardTitle>Same-Day Delivery</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">
                  <strong>Delivery Time:</strong> Same day (if ordered before 12pm)
                </p>
                <p className="text-gray-700">
                  <strong>Cost:</strong> GH₵50
                </p>
                <p className="text-sm text-gray-600">
                  Available in select areas of Greater Accra. Orders must be placed before 12pm for same-day delivery.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Delivery timeframes are estimates and may vary due to factors beyond our control, 
              including weather conditions, traffic, and high order volumes. We will notify you of any significant delays.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="delivery-fees" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Delivery Fees</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Delivery fees are calculated based on your order value and selected delivery option:
            </p>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-semibold text-gray-900">Order Value</th>
                    <th className="text-left py-3 font-semibold text-gray-900">Standard Delivery</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-3">Under GH₵200</td>
                    <td className="py-3">GH₵10</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3">GH₵200 and above</td>
                    <td className="py-3">FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Express and same-day delivery fees are charged in addition to any applicable standard delivery fees.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="order-tracking" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Order Tracking</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Once your order is confirmed, you will receive a tracking number via email and SMS. You can track your 
              order status in real-time through:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your order confirmation email</li>
              <li>The "Track Your Order" page on our website</li>
              <li>Your account dashboard under "My Orders"</li>
              <li>Our mobile application</li>
            </ul>
            <p>
              You will receive updates via email and SMS at key stages of the delivery process:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Order confirmed</li>
              <li>Order being prepared</li>
              <li>Order shipped/dispatched</li>
              <li>Out for delivery</li>
              <li>Delivered</li>
            </ul>
            <div className="mt-4">
              <Link href="/track">
                <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
                  Track Your Order
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="delivery-requirements" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Delivery Requirements</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.1 Accurate Address Information</h3>
              <p>
                Please ensure your delivery address is accurate and complete. Include house numbers, street names, 
                landmarks, and any specific instructions for the delivery driver. We are not responsible for delivery 
                delays or failed deliveries due to incorrect address information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.2 Availability for Delivery</h3>
              <p>
                Someone must be available to receive the order at the delivery address during the delivery time window. 
                If no one is available, we may:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Leave the order in a safe location (if you have provided instructions)</li>
                <li>Attempt delivery again on the next business day</li>
                <li>Contact you to arrange an alternative delivery time</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.3 Delivery Inspection</h3>
              <p>
                Please inspect your order upon delivery. Check for any visible damage, missing items, or incorrect products. 
                If you notice any issues, please report them immediately through your account or by contacting customer service.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.4 Contact Information</h3>
              <p>
                Ensure your contact phone number is correct and reachable. Our delivery team may contact you to confirm 
                your location or coordinate delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="return-policy" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="h-6 w-6 text-[#D35F0E]" />
            <h2 className="text-2xl font-semibold text-gray-900">6. Return Policy</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We want you to be completely satisfied with your purchase. If you are not satisfied, you may return eligible 
              items within 7 days of delivery.
            </p>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Eligible for Return:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Unopened, unused products in original packaging</li>
                <li>Products in resalable condition</li>
                <li>Products with original tags and labels attached</li>
                <li>Non-perishable items</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-900 mb-3">Not Eligible for Return:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-red-800">
                <li>Perishable items (fresh produce, dairy, meat, etc.)</li>
                <li>Opened or used products</li>
                <li>Products without original packaging</li>
                <li>Customized or personalized items</li>
                <li>Items damaged by misuse or negligence</li>
                <li>Items returned after 7 days</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Special Cases
              </h3>
              <p className="text-green-800">
                If you receive a defective, damaged, or incorrect item, we will arrange for replacement or full refund 
                at no cost to you, regardless of the 7-day return period.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section id="return-process" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Return Process</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-[#D35F0E] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  Initiate Return
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Log into your account, go to "My Orders," select the order you want to return, and click "Return Item." 
                  Alternatively, contact our customer service team with your order number.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-[#D35F0E] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  Receive Return Authorization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We will review your return request and send you a return authorization number and instructions within 
                  24-48 hours. Do not ship items back without authorization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-[#D35F0E] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  Package Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Package the items securely in their original packaging, if possible. Include the return authorization 
                  number and reason for return. Use a shipping method with tracking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-[#D35F0E] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  Ship Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Ship items to the address provided in your return authorization. We recommend using a trackable shipping 
                  method. You are responsible for return shipping costs unless the item is defective or we made an error.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-[#D35F0E] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  Receive Refund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Once we receive and inspect your returned items, we will process your refund within 7-14 business days. 
                  You will receive an email confirmation when the refund is processed.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 8 */}
        <section id="refunds" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Refunds</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">8.1 Refund Processing Time</h3>
              <p>
                Refunds are processed within 7-14 business days after we receive and inspect the returned items. 
                Processing time may vary depending on your payment method and bank.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">8.2 Refund Method</h3>
              <p>
                Refunds will be issued to the original payment method used for the purchase. For card payments, refunds 
                appear on your statement within 5-10 business days after processing. For mobile money or bank transfers, 
                refunds may take 3-7 business days.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">8.3 Refund Amount</h3>
              <p>
                You will receive a full refund for the product price. Original delivery fees are non-refundable unless 
                the return is due to our error or a defective product. Return shipping costs are not refunded unless 
                the return is due to our error.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">8.4 Partial Returns</h3>
              <p>
                If you return only some items from an order, you will receive a refund for the returned items only. 
                Original delivery fees may be adjusted based on the remaining order value.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9 */}
        <section id="damaged-items" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Damaged or Defective Items</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              If you receive a damaged, defective, or incorrect item, please contact us immediately. We will:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Arrange for a replacement item at no cost to you</li>
              <li>Provide a full refund if replacement is not possible</li>
              <li>Cover all return shipping costs</li>
              <li>Process your claim within 24-48 hours</li>
            </ul>
            <p>
              Please take photos of the damaged or defective item and keep the original packaging. This will help us 
              process your claim quickly and improve our quality control.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Important:</strong> Report damaged or defective items within 48 hours of delivery for faster 
                resolution. Claims reported after this period may require additional verification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10 */}
        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              If you have questions about shipping or returns, please contact our customer service team:
            </p>
            <div className="bg-gray-100 rounded-lg p-6 space-y-2">
              <p><strong>Email:</strong> shipping@grovio.com</p>
              <p><strong>Phone:</strong> +233 XX XXX XXXX</p>
              <p><strong>Hours:</strong> Monday-Friday, 9am-6pm GMT</p>
              <p><strong>Address:</strong> Adjuma Crescent Road, South Industrial Area, Accra, Ghana</p>
            </div>
            <p>
              You can also visit our{" "}
              <Link href="/contact" className="text-[#D35F0E] hover:underline">Contact Us</Link> page or{" "}
              <Link href="/help" className="text-[#D35F0E] hover:underline">Help Center</Link> for additional support.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}


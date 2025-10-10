"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Printer, Share2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import QRCode from "./qr-code"
import Barcode from "./barcode"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface InvoiceProps {
  orderNumber?: string
  customerName?: string
  customerAddress?: string
  customerPhone?: string
  orderDate?: string
  discount?: number
  credits?: number
}

export default function Invoice({
  orderNumber = "4787837473",
  customerName = "William Duncan Bills",
  customerAddress = "Adjuma Crescent Road\nSouth Industrial Area\nAccra, Ghana",
  customerPhone = "00233265713324",
  orderDate = "12.09.2025",
  discount = 200,
  credits = 0
}: InvoiceProps) {
  const { items, getTotalPrice } = useCart()
  const invoiceRef = useRef<HTMLDivElement>(null)
  const [barcode, setBarcode] = useState("")
  const [qrCode, setQrCode] = useState("")

  // Generate barcode and QR code
  useEffect(() => {
    // Generate a simple barcode number
    const barcodeNumber = "4474949490484859594848"
    setBarcode(barcodeNumber)
    
    // Generate QR code data
    const qrData = `Order: ${orderNumber}\nDate: ${orderDate}\nTotal: GHC ${getTotalPrice().toFixed(2)}`
    setQrCode(qrData)
  }, [orderNumber, orderDate, getTotalPrice])

  const subtotal = getTotalPrice()
  const discountAmount = discount
  const creditsAmount = credits
  const totalAmount = subtotal - discountAmount - creditsAmount

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`invoice-${orderNumber}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const handleDownloadImage = async () => {
    if (!invoiceRef.current) return

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      })

      const link = document.createElement("a")
      link.download = `invoice-${orderNumber}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mb-6">
          <Button onClick={handleDownloadPDF} className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button onClick={handleDownloadImage} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Image
          </Button>
          <Button onClick={handlePrint} variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>

        {/* Invoice */}
        <div ref={invoiceRef} className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Grovio</h1>
                <div className="text-sm text-gray-600">
                  <p>Adjuma Crescent Road</p>
                  <p>South Industrial Area</p>
                  <p>Accra, Ghana</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold mb-4">Invoice</h2>
              <div className="text-sm">
                <p><span className="font-semibold">Invoice Number:</span> {orderNumber}</p>
                <p><span className="font-semibold">Date Ordered:</span> {orderDate}</p>
              </div>
            </div>
          </div>

          {/* Billed To Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Billed To:</h3>
              <div className="text-sm">
                <p className="font-semibold">{customerName}</p>
                <div className="whitespace-pre-line">{customerAddress}</div>
                <p>{customerPhone}</p>
              </div>
            </div>
            <div></div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-3 font-bold">Description of Items</th>
                  <th className="text-center py-3 font-bold">Qty</th>
                  <th className="text-right py-3 font-bold">Unit Price</th>
                  <th className="text-right py-3 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="py-3 text-sm">{item.name}</td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-right">{item.price}</td>
                    <td className="py-3 text-right font-semibold">
                      GHC {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="font-bold">Subtotal</span>
                <span>GHC {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="mt-4">
                <h4 className="font-bold mb-2">Discount & Credits</h4>
                <div className="flex justify-between py-1">
                  <span>Discounts</span>
                  <span>GHC {discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Credits</span>
                  <span>GHC {creditsAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span>Subtotal</span>
                  <span>GHC {(discountAmount + creditsAmount).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-2 border-b-2 border-black mt-4">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-bold text-lg">GHC {totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-8">
              {/* Barcode */}
              <div className="text-center">
                <div className="mb-2">
                  <Barcode data={barcode} width={160} height={40} />
                </div>
                <p className="text-xs font-mono">{barcode}</p>
              </div>

              {/* QR Code */}
              <div className="w-20 h-20 flex items-center justify-center">
                <QRCode data={qrCode} size={80} />
              </div>

              {/* Shipping Icons */}
              <div className="flex flex-col gap-2">
                <div className="w-6 h-6 border border-black flex items-center justify-center">
                  <div className="w-3 h-3 border-b-2 border-r-2 border-black transform rotate-45"></div>
                </div>
                <div className="w-6 h-6 border border-black flex items-center justify-center">
                  <div className="w-4 h-4 border border-black"></div>
                </div>
                <div className="w-6 h-6 border border-black flex items-center justify-center">
                  <div className="w-3 h-3 border-t-2 border-b-2 border-black"></div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="font-bold text-lg mb-4">Thank you for shopping with us!</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h3 className="font-bold text-lg">Grovio - Redefining the Way You Save.</h3>
              <div className="w-6 h-6 border border-black rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
            
            <div className="text-xs text-gray-600 mb-2">
              <p>Address: Adjuma Crescent Rd, South Industrial Area | 00233265713327 | Email: info@grovio.com.gh | Website: www.grovio.com.gh</p>
              <p>© 2025 Grovio. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

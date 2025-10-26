/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Printer, Share2, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuthStore } from "@/stores/auth-store"
import { toast } from "sonner"
import QRCode from "./qr-code"
import Barcode from "./barcode"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Image from "next/image"

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
  customerName,
  customerAddress = "Adjuma Crescent Road\nSouth Industrial Area\nAccra, Ghana",
  customerPhone,
  orderDate = "12.09.2025",
  discount = 200,
  credits = 0
}: InvoiceProps) {
  const { items, getTotalPrice } = useCart()
  const { user } = useAuthStore()
  const invoiceRef = useRef<HTMLDivElement>(null)
  const [barcode, setBarcode] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")
  
  // Use auth user if available, otherwise use props
  const displayName = customerName || (user ? `${user.firstName} ${user.lastName}` : "Guest User")
  const displayPhone = customerPhone || user?.phoneNumber || "No phone number"

  // Generate barcode and QR code with PDF link
  useEffect(() => {
    // Generate a simple barcode number
    const barcodeNumber = "4474949490484859594848"
    setBarcode(barcodeNumber)
    
    // Generate QR code with PDF link
    // When scanned, it will open the invoice PDF in browser
    const pdfLink = `${window.location.origin}/invoice?order=${orderNumber}&name=${encodeURIComponent(displayName)}&address=${encodeURIComponent(customerAddress)}&phone=${encodeURIComponent(displayPhone)}&date=${encodeURIComponent(orderDate)}&discount=${discount}&credits=${credits}`
    setQrCode(pdfLink)
  }, [orderNumber, orderDate, displayName, customerAddress, displayPhone, discount, credits])

  const subtotal = getTotalPrice()
  const discountAmount = discount
  const creditsAmount = credits
  const totalAmount = subtotal - discountAmount - creditsAmount

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) {
      toast.error("Invoice not ready. Please try again.")
      return
    }

    const loadingToast = toast.loading("Generating PDF...")

    try {
      // Try server-side PDF generation first
      const params = new URLSearchParams({
        order: orderNumber,
        name: displayName,
        address: customerAddress,
        phone: displayPhone,
        date: orderDate,
        discount: discount.toString(),
        credits: credits.toString()
      })

      const apiUrl = `/api/generate-pdf?${params.toString()}`
      
      // Check if server-side generation is available
      const checkResponse = await fetch(apiUrl, { method: 'HEAD' })
      
      if (checkResponse.ok || checkResponse.status === 405) {
        // Server endpoint exists, open it
        window.open(apiUrl, '_blank')
        toast.dismiss(loadingToast)
        toast.success("PDF opened in new tab!")
        return
      }
      
      // Fallback to client-side generation
      throw new Error('Server-side PDF not available, using client-side')
      
    } catch (serverError) {
      console.log("Falling back to client-side PDF generation:", serverError)
      
      // Client-side PDF generation with lab() color fix
      try {
        await new Promise(resolve => setTimeout(resolve, 500))

        const canvas = await html2canvas(invoiceRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          imageTimeout: 0,
          removeContainer: false,
          foreignObjectRendering: false,
          onclone: (clonedDoc: Document) => {
            const clonedElement = clonedDoc.querySelector('[data-invoice-ref]') as HTMLElement
            if (clonedElement) {
              // Fix lab() color issue
              const allElements = clonedElement.querySelectorAll('*')
              allElements.forEach((el: Element) => {
                const htmlEl = el as HTMLElement
                const bgColor = htmlEl.style.backgroundColor
                const textColor = htmlEl.style.color
                
                // Replace lab() with solid colors
                if (bgColor && bgColor.includes('lab')) {
                  htmlEl.style.backgroundColor = '#ffffff'
                }
                if (textColor && textColor.includes('lab')) {
                  htmlEl.style.color = '#000000'
                }
              })
              
              // Ensure images are loaded
              const images = clonedElement.querySelectorAll('img')
              images.forEach(img => {
                if (!img.complete) {
                  img.src = img.src
                }
              })
            }
          }
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

        const pdfBlob = pdf.output('blob')
        const pdfUrl = URL.createObjectURL(pdfBlob)
        window.open(pdfUrl, '_blank')
        
        setPdfUrl(pdfUrl)
        toast.dismiss(loadingToast)
        toast.success("PDF opened in new tab!")
      } catch (error) {
        console.error("Error generating PDF:", error)
        toast.dismiss(loadingToast)
        toast.error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }

  const handleDownloadImage = async () => {
    if (!invoiceRef.current) {
      toast.error("Invoice not ready. Please try again.")
      return
    }

    const loadingToast = toast.loading("Generating image...")

    try {
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500))

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: true,
        imageTimeout: 0,
        removeContainer: false,
        foreignObjectRendering: false,
        onclone: (clonedDoc: Document) => {
          // Fix lab() color issue by replacing with rgb
          const clonedElement = clonedDoc.querySelector('[data-invoice-ref]') as HTMLElement
          if (clonedElement) {
            // Convert all lab() colors to rgb
            const allElements = clonedElement.querySelectorAll('*')
            allElements.forEach((el: Element) => {
              const htmlEl = el as HTMLElement
              const computedStyle = window.getComputedStyle(el)
              
              // Fix background color
              if (computedStyle.backgroundColor.includes('lab')) {
                htmlEl.style.backgroundColor = 'rgb(255, 255, 255)'
              }
              
              // Fix color
              if (computedStyle.color.includes('lab')) {
                htmlEl.style.color = 'rgb(0, 0, 0)'
              }
            })
            
            // Ensure all images are loaded
            const images = clonedElement.querySelectorAll('img')
            images.forEach(img => {
              if (!img.complete) {
                img.src = img.src
              }
            })
          }
        }
      })

      const imageUrl = canvas.toDataURL("image/png")
      setImagePreviewUrl(imageUrl)
      setShowImagePreview(true)
      
      toast.dismiss(loadingToast)
      toast.success("Image preview ready!")
    } catch (error) {
      console.error("Error generating image:", error)
      toast.dismiss(loadingToast)
      toast.error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleSaveImage = () => {
    if (!imagePreviewUrl) {
      toast.error("No image available to save.")
      return
    }
    
    try {
      const link = document.createElement("a")
      link.download = `invoice-${orderNumber}.png`
      link.href = imagePreviewUrl
      link.click()
      toast.success("Invoice image downloaded!")
    } catch (error) {
      console.error("Error saving image:", error)
      toast.error("Failed to save image. Please try again.")
    }
  }

  const handleShareImage = async () => {
    if (!imagePreviewUrl) {
      toast.error("No image available to share.")
      return
    }
    
    try {
      // Convert data URL to blob
      const response = await fetch(imagePreviewUrl)
      const blob = await response.blob()
      const file = new File([blob], `invoice-${orderNumber}.png`, { type: 'image/png' })
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Invoice ${orderNumber}`,
          text: `Invoice for order ${orderNumber}`
        })
        toast.success("Invoice shared successfully!")
      } else {
        // Fallback: download instead
        handleSaveImage()
        toast.info("Web Share not supported. Image downloaded instead.")
      }
    } catch (error) {
      console.error("Error sharing image:", error)
      toast.error("Failed to share. Image has been downloaded instead.")
      handleSaveImage()
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Invoice Preview</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowImagePreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Image Preview */}
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
              <Image 
                src={imagePreviewUrl} 
                alt="Invoice Preview" 
                className="max-w-full h-auto mx-auto shadow-lg"
                width={100}
                height={100}
              />
            </div>
            
            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-4 border-t bg-white">
              <Button
                onClick={handleSaveImage}
                className="w-full sm:w-auto bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Save Image
              </Button>
              <Button
                onClick={handleShareImage}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Image
              </Button>
              <Button
                onClick={() => setShowImagePreview(false)}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Button onClick={handleDownloadPDF} className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleDownloadImage} variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Download Image
            </Button>
            <Button onClick={handlePrint} variant="outline" className="w-full sm:w-auto">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>

        {/* Invoice */}
        <div ref={invoiceRef} data-invoice-ref className="bg-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto shadow-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center">
                <Image src="/logo.png" alt="Grovio" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Grovio</h1>
                <div className="text-xs sm:text-sm text-gray-600">
                  <p>Adjuma Crescent Road</p>
                  <p>South Industrial Area</p>
                  <p>Accra, Ghana</p>
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Invoice</h2>
              <div className="text-xs sm:text-sm">
                <p><span className="font-semibold">Invoice Number:</span> {orderNumber}</p>
                <p><span className="font-semibold">Date Ordered:</span> {orderDate}</p>
              </div>
            </div>
          </div>

          {/* Billed To Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8">
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2">Billed To:</h3>
              <div className="text-xs sm:text-sm">
                <p className="font-semibold">{displayName}</p>
                <div className="whitespace-pre-line">{customerAddress}</div>
                <p>{displayPhone}</p>
              </div>
            </div>
            <div className="text-xs sm:text-sm">
              {/* Delivery Period - Ready for dynamic backend data */}
              <h3 className="font-bold text-base sm:text-lg mb-2">Delivery Period:</h3>
              <p className="text-gray-600">
                Estimated Delivery: <span className="font-semibold text-[#D35F0E]">2-3 Business Days</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                * Delivery dates will be confirmed via SMS/Email
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-2 sm:py-3 font-bold text-xs sm:text-base">Description of Items</th>
                  <th className="text-center py-2 sm:py-3 font-bold text-xs sm:text-base">Qty</th>
                  <th className="text-right py-2 sm:py-3 font-bold text-xs sm:text-base">Unit Price</th>
                  <th className="text-right py-2 sm:py-3 font-bold text-xs sm:text-base">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="py-2 sm:py-3 text-xs sm:text-sm">{item.name}</td>
                    <td className="py-2 sm:py-3 text-center text-xs sm:text-sm">{item.quantity}</td>
                    <td className="py-2 sm:py-3 text-right text-xs sm:text-sm">{item.price}</td>
                    <td className="py-2 sm:py-3 text-right font-semibold text-xs sm:text-sm">
                      GHC {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="flex justify-end mb-8">
            <div className="w-full sm:w-80">
              <div className="flex justify-between py-2 border-b border-gray-300 text-xs sm:text-sm">
                <span className="font-bold">Subtotal</span>
                <span>GHC {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="mt-4">
                <h4 className="font-bold mb-2 text-xs sm:text-sm">Discount & Credits</h4>
                <div className="flex justify-between py-1 text-xs sm:text-sm">
                  <span>Discounts</span>
                  <span>GHC {discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 text-xs sm:text-sm">
                  <span>Credits</span>
                  <span>GHC {creditsAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-300 text-xs sm:text-sm">
                  <span>Subtotal</span>
                  <span>GHC {(discountAmount + creditsAmount).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-2 border-b-2 border-black mt-4">
                <span className="font-bold text-base sm:text-lg">Total Amount</span>
                <span className="font-bold text-base sm:text-lg">GHC {totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 sm:gap-0">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {/* Barcode */}
              <div className="text-center">
                <div className="mb-2">
                  <Barcode data={barcode} width={160} height={40} />
                </div>
                <p className="text-xs font-mono">{barcode}</p>
              </div>

              {/* QR Code - Now links to invoice PDF page */}
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border-2 border-gray-300 rounded bg-white p-2">
                  <QRCode data={qrCode} size={80} />
                </div>
                <p className="text-xs text-gray-500 mt-1">Scan to view invoice</p>
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
              <p className="font-bold text-base sm:text-lg">Thank you for shopping with us!</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
              <h3 className="font-bold text-base sm:text-lg">Grovio - Redefining the Way You Save.</h3>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded flex items-center justify-center">
                <Image src="/logo.png" alt="Grovio" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
            
            <div className="text-xs text-gray-600 mb-2 space-y-1">
              <p className="wrap-break-words">Address: Adjuma Crescent Rd, South Industrial Area | 00233265713327 | Email: info@grovio.com.gh | Website: www.grovio.com.gh</p>
              <p>© 2025 Grovio. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}


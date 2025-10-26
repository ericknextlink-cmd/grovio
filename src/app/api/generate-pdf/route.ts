import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderNumber = searchParams.get('order') || '4787837473'
    const customerName = searchParams.get('name') || 'Guest User'
    const customerAddress = searchParams.get('address') || 'Adjuma Crescent Road\nSouth Industrial Area\nAccra, Ghana'
    const customerPhone = searchParams.get('phone') || 'No phone number'
    const orderDate = searchParams.get('date') || new Date().toLocaleDateString('en-GB')
    const discount = searchParams.get('discount') || '0'
    const credits = searchParams.get('credits') || '0'

    // Try to use Puppeteer for server-side PDF generation
    try {
      const puppeteer = await import('puppeteer')
      
      // Launch browser
      const browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })

      const page = await browser.newPage()
      
      // Navigate to the invoice page
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`
      const invoiceUrl = `${baseUrl}/invoice?order=${orderNumber}&name=${encodeURIComponent(customerName)}&address=${encodeURIComponent(customerAddress)}&phone=${encodeURIComponent(customerPhone)}&date=${encodeURIComponent(orderDate)}&discount=${discount}&credits=${credits}`
      
      await page.goto(invoiceUrl, { waitUntil: 'networkidle0' })
      
      // Wait for invoice to be ready
      await page.waitForSelector('[data-invoice-ref]', { timeout: 10000 })
      
      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      })

      await browser.close()

      // Return PDF - Convert Uint8Array to Buffer
      return new NextResponse(Buffer.from(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="invoice-${orderNumber}.pdf"`
        }
      })
    } catch (puppeteerError) {
      console.error('Puppeteer not available, falling back to client-side generation:', puppeteerError)
      
      // Fallback: Return a response that triggers client-side generation
      return NextResponse.json({
        error: 'Server-side PDF generation not available',
        message: 'Please use client-side generation',
        fallbackRequired: true
      }, { status: 503 })
    }
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json({
      error: 'Failed to generate PDF',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}


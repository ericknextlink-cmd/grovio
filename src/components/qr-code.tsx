"use client"

import { useEffect, useRef } from "react"
import QRCodeLib from "qrcode"

interface QRCodeProps {
  data: string
  size?: number
}

export default function QRCode({ data, size = 100 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data) return

    // Generate proper QR code using qrcode library
    QRCodeLib.toCanvas(
      canvasRef.current,
      data,
      {
        width: size,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      },
      (error) => {
        if (error) {
          console.error('QR Code generation error:', error)
        }
      }
    )
  }, [data, size])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
    />
  )
}

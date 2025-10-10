"use client"

import { useEffect, useRef } from "react"

interface BarcodeProps {
  data: string
  width?: number
  height?: number
}

export default function Barcode({ data, width = 200, height = 60 }: BarcodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    // Generate barcode pattern
    const barWidth = width / (data.length * 2 + 2) // Add padding
    const barHeight = height * 0.8
    const startY = (height - barHeight) / 2

    // Start pattern
    ctx.fillStyle = "black"
    ctx.fillRect(0, startY, barWidth, barHeight)
    ctx.fillRect(barWidth * 2, startY, barWidth, barHeight)

    let x = barWidth * 4

    // Data pattern
    for (let i = 0; i < data.length; i++) {
      const digit = parseInt(data[i])
      const pattern = getBarcodePattern(digit)
      
      for (let j = 0; j < pattern.length; j++) {
        if (pattern[j] === '1') {
          ctx.fillStyle = "black"
          ctx.fillRect(x, startY, barWidth, barHeight)
        } else {
          ctx.fillStyle = "white"
          ctx.fillRect(x, startY, barWidth, barHeight)
        }
        x += barWidth
      }
    }

    // End pattern
    ctx.fillStyle = "black"
    ctx.fillRect(x, startY, barWidth, barHeight)
    ctx.fillRect(x + barWidth * 2, startY, barWidth, barHeight)

  }, [data, width, height])

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300"
      style={{ width, height }}
    />
  )
}

// Simple barcode pattern for digits 0-9
function getBarcodePattern(digit: number): string {
  const patterns = [
    "0001101", // 0
    "0011001", // 1
    "0010011", // 2
    "0111101", // 3
    "0100011", // 4
    "0110001", // 5
    "0101111", // 6
    "0111011", // 7
    "0110111", // 8
    "0001011"  // 9
  ]
  return patterns[digit] || "0000000"
}

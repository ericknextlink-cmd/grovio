"use client"

import { useEffect, useRef } from "react"

interface QRCodeProps {
  data: string
  size?: number
}

export default function QRCode({ data, size = 100 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, size, size)

    // Generate a simple QR-like pattern
    const moduleSize = size / 25 // 25x25 grid
    const modules = 25

    // Create a simple pattern based on the data
    const hash = data.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        const shouldFill = (hash + row * modules + col) % 3 === 0
        
        if (shouldFill) {
          ctx.fillStyle = "black"
          ctx.fillRect(
            col * moduleSize,
            row * moduleSize,
            moduleSize,
            moduleSize
          )
        }
      }
    }

    // Add corner squares (QR code characteristic)
    const cornerSize = 7
    const positions = [
      [0, 0],
      [modules - cornerSize, 0],
      [0, modules - cornerSize]
    ]

    positions.forEach(([startRow, startCol]) => {
      // Outer square
      ctx.fillStyle = "black"
      ctx.fillRect(
        startCol * moduleSize,
        startRow * moduleSize,
        cornerSize * moduleSize,
        cornerSize * moduleSize
      )
      
      // Inner white square
      ctx.fillStyle = "white"
      ctx.fillRect(
        (startCol + 1) * moduleSize,
        (startRow + 1) * moduleSize,
        (cornerSize - 2) * moduleSize,
        (cornerSize - 2) * moduleSize
      )
      
      // Inner black square
      ctx.fillStyle = "black"
      ctx.fillRect(
        (startCol + 2) * moduleSize,
        (startRow + 2) * moduleSize,
        (cornerSize - 4) * moduleSize,
        (cornerSize - 4) * moduleSize
      )
    })

  }, [data, size])

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300"
      style={{ width: size, height: size }}
    />
  )
}

import * as React from "react"

export interface ToastProps {
  className?: string
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement<{
  className?: string
  children: React.ReactNode
}>

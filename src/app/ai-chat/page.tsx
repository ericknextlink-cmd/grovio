"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Send, 
  Menu, 
  X, 
  MessageSquare, 
  Plus, 
  Trash2,
  ShoppingCart,
  Loader2,
  Sparkles
} from "lucide-react"
import Header from "@/components/header"
import { useAuthStore } from "@/stores/auth-store"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import { products } from "@/lib/products"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Thread {
  thread_id: string
  context?: {
    role?: string
    familySize?: number
  }
  created_at: string
  updated_at: string
}

interface RecommendedProduct {
  productId: string
  productName: string
  quantity: number
  price: number
  subtotal: number
  category?: string
  inStock?: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default function AIChatPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { addToCart } = useCart()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load conversation threads on mount (if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      loadThreads()
    }
  }, [isAuthenticated])

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        role: "assistant",
        content: `Hi${user ? ` ${user.firstName}` : ''}! 👋 I'm your Grovio shopping assistant. I can help you:\n\n• Find products within your budget\n• Plan meals for your family\n• Get personalized recommendations\n• Analyze your shopping budget\n\nWhat can I help you with today?`,
        timestamp: new Date()
      }])
    }
  }, [user, messages.length])

  const loadThreads = async () => {
    try {
      const response = await fetch(`${API_URL}/api/ai/threads`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setThreads(data.data)
        }
      }
    } catch (error) {
      console.error("Failed to load threads:", error)
    }
  }

  const loadThread = async (threadId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/ai/threads/${threadId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data.messages) {
          const loadedMessages: Message[] = data.data.messages.map((msg: any, idx: number) => ({
            id: `${threadId}-${idx}`,
            role: msg.role,
            content: msg.content,
            timestamp: new Date(msg.timestamp || data.data.createdAt)
          }))
          setMessages(loadedMessages)
          setCurrentThreadId(threadId)
          setIsSidebarOpen(false)
        }
      }
    } catch (error) {
      console.error("Failed to load thread:", error)
      toast.error("Failed to load conversation")
    }
  }

  const deleteThread = async (threadId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/ai/threads/${threadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      if (response.ok) {
        setThreads(threads.filter(t => t.thread_id !== threadId))
        if (currentThreadId === threadId) {
          startNewConversation()
        }
        toast.success("Conversation deleted")
      }
    } catch (error) {
      console.error("Failed to delete thread:", error)
      toast.error("Failed to delete conversation")
    }
  }

  const startNewConversation = () => {
    setMessages([{
      id: Date.now().toString(),
      role: "assistant",
      content: `Hi${user ? ` ${user.firstName}` : ''}! 👋 Starting a new conversation. What can I help you with?`,
      timestamp: new Date()
    }])
    setCurrentThreadId(null)
    setRecommendedProducts([])
    setShowRecommendations(false)
    setIsSidebarOpen(false)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Use backend AI API
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isAuthenticated && { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` })
        },
        body: JSON.stringify({
          message: inputMessage,
          threadId: currentThreadId,
          role: user?.role || 'user',
          familySize: user?.preferences?.familySize || 1
        })
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.data.message,
          timestamp: new Date()
        }

        setMessages(prev => [...prev, assistantMessage])

        // Update thread ID
        if (data.data.threadId && !currentThreadId) {
          setCurrentThreadId(data.data.threadId)
          loadThreads() // Refresh threads list
        }

        // Check if response contains product recommendations
        if (data.data.products && Array.isArray(data.data.products)) {
          setRecommendedProducts(data.data.products)
          setShowRecommendations(true)
        }
      } else {
        throw new Error(data.message || 'Failed to get response')
      }
    } catch (error) {
      console.error("Chat error:", error)
      
      // Fallback to local AI if backend fails
      try {
        const fallbackResponse = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: inputMessage })
        })

        const fallbackData = await fallbackResponse.json()
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fallbackData.message || "I apologize, I'm having trouble responding right now. Please try again.",
          timestamp: new Date()
        }

        setMessages(prev => [...prev, assistantMessage])
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError)
        toast.error("Failed to get AI response. Please try again.")
      }
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const addProductToCart = (product: RecommendedProduct) => {
    const matchedProduct = products.find(p => 
      p.id === product.productId || 
      p.name.toLowerCase() === product.productName.toLowerCase()
    )

    if (matchedProduct) {
      for (let i = 0; i < product.quantity; i++) {
        addToCart(matchedProduct)
      }
      toast.success(`Added ${product.quantity}x ${product.productName} to cart`)
    } else {
      toast.error("Product not found in catalog")
    }
  }

  const addAllToCart = () => {
    recommendedProducts.forEach(product => {
      addProductToCart(product)
    })
    toast.success(`Added ${recommendedProducts.length} items to cart`)
    setShowRecommendations(false)
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Conversation History */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40
          w-80 bg-white border-r border-gray-200 transition-transform duration-300
          flex flex-col
        `}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-4 border-b border-gray-200">
            <Button
              onClick={startNewConversation}
              className="w-full bg-[#D35F0E] hover:bg-[#D35F0E]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Conversation
            </Button>
          </div>

          {/* Thread List */}
          <ScrollArea className="flex-1 p-4">
            {!isAuthenticated ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Sign in to save your conversations</p>
              </div>
            ) : threads.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No conversations yet</p>
                <p className="text-xs mt-1">Start chatting to create one!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {threads.map((thread) => (
                  <div
                    key={thread.thread_id}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-colors group
                      ${currentThreadId === thread.thread_id ? 'bg-orange-50 border-[#D35F0E] border' : 'hover:bg-gray-50 border border-transparent'}
                    `}
                    onClick={() => loadThread(thread.thread_id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {thread.context?.role ? `${thread.context.role} conversation` : 'Chat'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimestamp(new Date(thread.updated_at))}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteThread(thread.thread_id)
                        }}
                      >
                        <Image src="/trash-orange.png" alt="Trash" width={20} height={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header with Menu Button */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">AI Assistant</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[#D35F0E] flex items-center justify-center">
                        <Image src="/logo.png" alt="AI" width={20} height={20} />
                      </div>
                    </div>
                  )}

                  <div className={`
                    max-w-[80%] sm:max-w-[70%] rounded-2xl p-4
                    ${message.role === 'user' 
                      ? 'bg-[#D35F0E] text-white' 
                      : 'bg-white border border-gray-200 text-gray-900'
                    }
                  `}>
                    <div className="whitespace-pre-wrap wrap-break-word text-sm">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-orange-100' : 'text-gray-500'}`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {user?.profilePicture ? (
                          <Image src={user.profilePicture} alt="User" width={32} height={32} />
                        ) : (
                          <Image src="/profile.png" alt="User" width={32} height={32} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#D35F0E] flex items-center justify-center">
                      <Image src="/logo.png" alt="AI" width={20} height={20} />
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <Loader2 className="h-5 w-5 animate-spin text-[#D35F0E]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Recommended Products Section */}
            {showRecommendations && recommendedProducts.length > 0 && (
              <div className="max-w-4xl mx-auto mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-[#D35F0E]" />
                        Recommended Products
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowRecommendations(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {recommendedProducts.map((product, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{product.productName}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              Qty: {product.quantity} • ₵{product.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-semibold text-[#D35F0E]">
                              ₵{product.subtotal.toFixed(2)}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addProductToCart(product)}
                              className="whitespace-nowrap"
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <p className="font-semibold">
                        Total: ₵{recommendedProducts.reduce((sum, p) => sum + p.subtotal, 0).toFixed(2)}
                      </p>
                      <Button
                        onClick={addAllToCart}
                        className="bg-[#D35F0E] hover:bg-[#D35F0E]/90"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add All to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about products, budgets, meal ideas..."
                  disabled={isLoading}
                  className="flex-1 border-gray-300 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-[#D35F0E] hover:bg-[#D35F0E]/90"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </form>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Powered by AI • May make mistakes • For reference only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}


/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Grovio shopping assistant. I can help you find the perfect groceries based on your needs. What are you looking to cook today?",
      isBot: true,
      isHtml: false,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll to the latest message and ensure it's visible above sticky input
  useEffect(() => {
    if (!isOpen) return
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages, isOpen])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      isHtml: false,
    }

    setMessages([...messages, newMessage])
    setInputMessage("")
    setIsSending(true)

    try {
      console.log("Sending message:", newMessage.text)
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.text }),
      })

      console.log("Response status:", res.status)
      const data = await res.json()
      console.log("Response data:", data)
      let text = "I ran into an issue understanding the request. Try rephrasing."
      
      if (data?.message && typeof data.message === "string") {
        text = data.message
      } else if (data?.error && typeof data.error === "string") {
        text = `Error: ${data.error}`
      } else if (!res.ok) {
        text = `Server error (${res.status}). Please try again.`
      }
      const botResponse = {
        id: newMessage.id + 1,
        text,
        isBot: true,
        isHtml: true,
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (e) {
      const botResponse = {
        id: newMessage.id + 1,
        text: "Sorry, I couldn't reach the recommendation service. Please try again.",
        isBot: true,
        isHtml: false,
      }
      setMessages((prev) => [...prev, botResponse])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-auto h-14 rounded-full bg-grovio-orange hover:bg-grovio-orange/90 shadow-lg z-50 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center gap-2 px-6`}
      >
        <MessageCircle className="h-5 w-5 text-white" />
        <span className="text-white text-sm font-medium">Get Shopping Recommendations</span>
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 md:right-6 left-4 md:left-auto w-[calc(100vw-2rem)] md:w-[520px] h-[500px] md:h-[600px] z-50 shadow-xl overflow-hidden">
          <CardHeader className="bg-grovio-navy text-white p-4 rounded-t-lg -mt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Grovio Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isBot ? "bg-gray-100 text-gray-800" : "bg-grovio-orange text-white"
                    }`}
                  >
                    {message.isHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: message.text }} />
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t sticky bottom-0 bg-white z-10">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-grovio-orange hover:bg-grovio-orange/90" disabled={isSending}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

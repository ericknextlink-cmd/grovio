"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiService, type SignupRequest } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

const countryCodes = [
  { code: "+233", country: "Ghana" },
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
]

export function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+233",
    phoneNumber: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const signupData: SignupRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.countryCode + formData.phoneNumber,
        countryCode: formData.countryCode,
        password: formData.password,
      }

      const response = await apiService.signup(signupData)

      if (response.success) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Grovio! You can now sign in.",
        })

        // Store tokens if provided
        if (response.accessToken && response.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('refreshToken', response.refreshToken)
        }

        // Redirect to login page or dashboard
        router.push('/login')
      } else {
        toast({
          title: "Signup failed",
          description: response.message || "Please check your information and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast({
        title: "Signup failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Image src="/logo.png" alt="Grovio" width={40} height={40} className="h-16 mt-6 mb-8 w-auto mx-auto" priority />
      {/* Form Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#D35F0E] mb-2">Create your Grovio account</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First name"
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Last name"
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile Number</Label>
          <div className="flex gap-2">
            <Select value={formData.countryCode} onValueChange={(value) => setFormData({ ...formData, countryCode: value })}>
              <SelectTrigger className="w-24 border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="phone"
              type="tel"
              maxLength={10}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
              placeholder="1234567890"
              className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Create a password"
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required
          />
        </div>

        <div className="flex items-start gap-4 mt-8 text-[12px] text-gray-600">
          <input id="newsletter" type="checkbox" className="mt-1" />
          <label htmlFor="newsletter">Sign up for our newsletter to stay in the loop about hot deals, new products, and more. Don&apos;t worry, you can unsubscribe at any time.</label>
        </div>

        <p className="text-[12px] text-gray-500">By clicking Continue, you acknowledge you have read and agreed to our Terms of Use and Privacy Policy. Message and data rates may apply.</p>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-8 text-2xl disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have a Grovio account? <Link href="/login" className="text-[#D35F0E] text-base hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupForm



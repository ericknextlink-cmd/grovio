"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: hook into real auth
    console.log("Login attempt:", formData)
  }

  const handleGoogleLogin = () => {
    console.log("Google login")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Image src="/logo.png" alt="Grovio" width={40} height={40} className="h-16 mt-6 mb-8 w-auto mx-auto" priority />
      {/* Form Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#D35F0E] mb-2">Sign in to your Grovio account</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emailOrUsername" className="text-sm font-medium text-gray-700">Email Address or Mobile Number</Label>
          <Input 
            id="emailOrUsername" 
            type="text" 
            placeholder="e.g. you@example.com" 
            value={formData.emailOrUsername} 
            onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })} 
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Enter your password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required 
          />
        </div>
        <Button type="submit" className="w-full rounded-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-8 text-2xl mt-6">
          Sign in
        </Button>
      </form>

      {/* OR Separator */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">OR</span>
        </div>
      </div>

      {/* Google Login */}
      <Button type="button" variant="outline" className="w-full bg-white border-gray-300 hover:bg-gray-50 text-gray-700 py-8 text-2xl rounded-full" onClick={handleGoogleLogin}>
        <Image src="/google.svg" alt="Google" width={24} height={24} className="w-8 h-8 mr-2" />
        Login with Google
      </Button>

      {/* Account Creation */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600 mb-4">
          Don&apos;t have a Grovio account?
        </p>
        <Link href="/signup">
          <Button className="w-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-8 text-2xl rounded-full">
            Create Account
          </Button>
        </Link>
      </div>

      {/* Terms Link */}
      <div className="text-center mt-6">
        <Link href="/terms" className="text-sm text-[#D35F0E] hover:underline">
          Terms and condition
        </Link>
      </div>
    </div>
  )
}

export default LoginForm



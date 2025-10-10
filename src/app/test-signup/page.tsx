"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signupSchema, type SignupFormData } from "@/lib/validations"
import { useAuthStore } from "@/stores/auth-store"

export default function TestSignupPage() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+233")
  const { signup, isLoading, error } = useAuthStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    console.log("=== TEST SIGNUP FORM ===")
    console.log("Form data:", data)
    console.log("Selected country code:", selectedCountryCode)
    
    const fullPhoneNumber = `${selectedCountryCode}${data.phoneNumber}`
    console.log("Full phone number:", fullPhoneNumber)
    
    const signupData = {
      ...data,
      phoneNumber: fullPhoneNumber,
    }
    console.log("Sending to API:", signupData)
    
    try {
      const result = await signup(signupData)
      console.log("Signup result:", result)
    } catch (err) {
      console.error("Signup error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Test Signup</h1>
        
        {/* Debug info */}
        <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
          <p><strong>Form errors:</strong> {Object.keys(errors).length > 0 ? JSON.stringify(errors) : 'None'}</p>
          <p><strong>Is loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
          <p><strong>Error:</strong> {error || 'None'}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              {...register("firstName")}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              {...register("lastName")}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              {...register("email")}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number (9 digits)</Label>
            <Input 
              id="phoneNumber" 
              {...register("phoneNumber")}
              placeholder="123456789"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              {...register("password")}
              placeholder="password123"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password"
              {...register("confirmPassword")}
              placeholder="password123"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating Account..." : "Test Signup"}
          </Button>
        </form>

        <div className="mt-4">
          <Button 
            onClick={() => {
              console.log("Current form data:", watch())
              console.log("Form errors:", errors)
            }}
            variant="outline"
            className="w-full"
          >
            Log Form Data
          </Button>
        </div>
      </div>
    </div>
  )
}

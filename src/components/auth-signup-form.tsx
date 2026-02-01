"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"
import { signupSchema, type SignupFormData } from "@/lib/validations"
import { useAuthStore } from "@/stores/auth-store"
import { useGoogleAuth } from "@/hooks/use-google-auth"
import { toast } from "sonner"

const countryCodes = [
  { code: "+233", country: "Ghana" },
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
]

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState("+233")
  const { signup, error, clearError } = useAuthStore()
  const { setGoogleButtonRef, isLoading: isGoogleLoading, isGoogleReady } = useGoogleAuth()
  const isLoadingForm = isLoading || isGoogleLoading

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  // Clear errors when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    
    try {
    // Format phone number with country code
    const fullPhoneNumber = `${selectedCountryCode}${data.phoneNumber}`
    
    const result = await signup({
      ...data,
      phoneNumber: fullPhoneNumber,
    })
    
    if (result.success) {
      // Show success message and redirect to login
      // User needs to confirm email before accessing the app
      toast.success("Account created successfully!", {
        description: "Please check your email to confirm your account before signing in.",
        duration: 6000,
      })
      router.push("/login")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCountryCodeChange = (code: string) => {
    setSelectedCountryCode(code)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Image src="/logo.png" alt="Grovio" width={40} height={40} className="h-16 mt-6 mb-8 w-auto mx-auto" priority />
      
      {/* Form Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#D35F0E] mb-2">Create your Grovio account</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            First Name
          </Label>
          <Input 
            id="firstName" 
            type="text" 
            placeholder="First name" 
            {...register("firstName")}
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            disabled={isLoadingForm}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Last Name
          </Label>
          <Input 
            id="lastName" 
            type="text" 
            placeholder="Last name" 
            {...register("lastName")}
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            disabled={isLoadingForm}
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            {...register("email")}
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            disabled={isLoadingForm}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
            Mobile Number
          </Label>
          <div className="flex gap-2">
            <Select 
              value={selectedCountryCode} 
              onValueChange={handleCountryCodeChange}
              disabled={isLoadingForm}
            >
              <SelectTrigger className="w-24 border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input 
              id="phoneNumber" 
              type="tel" 
              placeholder="1234567890" 
              {...register("phoneNumber")}
              className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
              disabled={isLoadingForm}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="Create a password" 
              {...register("password")}
              className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E] pr-10"
              disabled={isLoadingForm}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoadingForm}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password" 
              {...register("confirmPassword")}
              className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E] pr-10"
              disabled={isLoadingForm}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoadingForm}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start gap-4 mt-8 text-[12px] text-gray-600">
          <input 
            id="newsletter" 
            type="checkbox" 
            className="mt-1 scale-[1.2]" 
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            disabled={isLoadingForm}
          />
          <label htmlFor="newsletter">
            Sign up for our newsletter to stay in the loop about hot deals, new products, and more. Don&apos;t worry, you can unsubscribe at any time.
          </label>
        </div>

        <p className="text-[12px] text-gray-500">
          By clicking Continue, you acknowledge you have read and agreed to our Terms of Use and Privacy Policy. Message and data rates may apply.
        </p>

        <Button 
          type="submit" 
          className="w-full rounded-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-8 text-2xl"
          disabled={isLoadingForm}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
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

      {/* Google Signup – official button opens account-selection popup (like Vercel) */}
      <div
        ref={setGoogleButtonRef}
        className="min-h-[48px] w-full flex items-center justify-center rounded-full border border-gray-300 bg-white [&>div]:!min-h-[48px] [&>div]:!rounded-full"
        aria-label="Sign up with Google"
      />
      {!isGoogleReady && (
        <p className="text-center text-sm text-gray-500 mt-2">Loading Google Sign-In…</p>
      )}

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have a Grovio account?{" "}
          <Link href="/login" className="text-[#D35F0E] text-base hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupForm
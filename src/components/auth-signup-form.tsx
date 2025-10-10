"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
<<<<<<< Updated upstream
import { useRouter } from "next/navigation"
=======
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
>>>>>>> Stashed changes
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
<<<<<<< Updated upstream
import { apiService, type SignupRequest } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
=======
import { Eye, EyeOff } from "lucide-react"
import { signupSchema, type SignupFormData } from "@/lib/validations"
import { useAuthStore } from "@/stores/auth-store"
import { useGoogleAuth } from "@/hooks/use-google-auth"
import { useRouter } from "next/navigation"
>>>>>>> Stashed changes

const countryCodes = [
  { code: "+233", country: "Ghana" },
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
]

export function SignupForm() {
<<<<<<< Updated upstream
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
=======
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState("+233")
  const { signup, isLoading, error, clearError } = useAuthStore()
  const { signInWithGoogle } = useGoogleAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  // Clear errors when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  const onSubmit = async (data: SignupFormData) => {
    // Format phone number with country code
    const fullPhoneNumber = `${selectedCountryCode}${data.phoneNumber}`
    
    const result = await signup({
      ...data,
      phoneNumber: fullPhoneNumber,
    })
    
    if (result.success) {
      router.push("/")
    }
  }

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  const handleCountryCodeChange = (code: string) => {
    setSelectedCountryCode(code)
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First name"
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required
=======
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            First Name
          </Label>
          <Input 
            id="firstName" 
            type="text" 
            placeholder="First name" 
            {...register("firstName")}
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            disabled={isLoading}
>>>>>>> Stashed changes
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
<<<<<<< Updated upstream
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Last name"
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required
=======
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Last Name
          </Label>
          <Input 
            id="lastName" 
            type="text" 
            placeholder="Last name" 
            {...register("lastName")}
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            disabled={isLoading}
>>>>>>> Stashed changes
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
<<<<<<< Updated upstream
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            required
=======
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            {...register("email")}
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            disabled={isLoading}
>>>>>>> Stashed changes
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
              disabled={isLoading}
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
<<<<<<< Updated upstream
            <Input
              id="phone"
              type="tel"
              maxLength={10}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
              placeholder="1234567890"
              className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
              required
=======
            <Input 
              id="phoneNumber" 
              type="tel" 
              placeholder="1234567890" 
              {...register("phoneNumber")}
              className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
              disabled={isLoading}
>>>>>>> Stashed changes
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
<<<<<<< Updated upstream
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
=======
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
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
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
>>>>>>> Stashed changes
        </div>

        <div className="flex items-start gap-4 mt-8 text-[12px] text-gray-600">
          <input 
            id="newsletter" 
            type="checkbox" 
            className="mt-1" 
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            disabled={isLoading}
          />
          <label htmlFor="newsletter">
            Sign up for our newsletter to stay in the loop about hot deals, new products, and more. Don&apos;t worry, you can unsubscribe at any time.
          </label>
        </div>

        <p className="text-[12px] text-gray-500">
          By clicking Continue, you acknowledge you have read and agreed to our Terms of Use and Privacy Policy. Message and data rates may apply.
        </p>

<<<<<<< Updated upstream
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-8 text-2xl disabled:opacity-50"
=======
        <Button 
          type="submit" 
          className="w-full rounded-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-8 text-2xl"
          disabled={isLoading}
>>>>>>> Stashed changes
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

      {/* Google Signup */}
      <Button 
        type="button" 
        variant="outline" 
        className="w-full bg-white border-gray-300 hover:bg-gray-50 text-gray-700 py-8 text-2xl rounded-full" 
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <Image src="/google.svg" alt="Google" width={24} height={24} className="w-8 h-8 mr-2" />
        {isLoading ? "Signing up..." : "Sign up with Google"}
      </Button>

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
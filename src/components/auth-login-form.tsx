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
import { Eye, EyeOff } from "lucide-react"
import { signinSchema, type SigninFormData } from "@/lib/validations"
import { useAuthStore } from "@/stores/auth-store"
import { useGoogleAuth } from "@/hooks/use-google-auth"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { signin, isLoading, error, clearError } = useAuthStore()
  const { signInWithGoogle } = useGoogleAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  })

  // Clear errors when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  const onSubmit = async (data: SigninFormData) => {
    const result = await signin(data)
    if (result.success) {
      // Check onboarding status and redirect accordingly
      try {
        const { api } = await import('@/lib/api-client')
        const onboardingResponse = await api.preferences.onboardingStatus()
        const hasCompletedOnboarding = onboardingResponse.data?.data?.onboardingCompleted || false
        
        if (!hasCompletedOnboarding) {
          router.push('/onboarding')
        } else {
          router.push('/')
        }
      } catch (error) {
        // If onboarding check fails, assume not completed and redirect to onboarding
        console.warn('Failed to check onboarding status, redirecting to onboarding:', error)
        router.push('/onboarding')
      }
    }
  }

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Image src="/logo.png" alt="Grovio" width={40} height={40} className="h-16 mt-6 mb-8 w-auto mx-auto" priority />
      
      {/* Form Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#D35F0E] mb-2">Sign in to your Grovio account</h1>
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
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="e.g. you@example.com" 
            {...register("email")}
            className="border-gray-300 py-6 focus:border-[#D35F0E] focus:ring-[#D35F0E]"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
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
              placeholder="Enter your password" 
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

        <Button 
          type="submit" 
          className="w-full rounded-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-8 text-2xl mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
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
      <Button 
        type="button" 
        variant="outline" 
        className="w-full bg-white border-gray-300 hover:bg-gray-50 text-gray-700 py-8 text-2xl rounded-full" 
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <Image src="/google.svg" alt="Google" width={24} height={24} className="w-8 h-8 mr-2" />
        {isLoading ? "Signing in..." : "Login with Google"}
      </Button>

      {/* Account Creation */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600 mb-4">
          Don&apos;t have a Grovio account?
        </p>
        <Link href="/signup">
          <Button 
            className="w-full bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white font-medium py-8 text-2xl rounded-full"
            disabled={isLoading}
          >
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

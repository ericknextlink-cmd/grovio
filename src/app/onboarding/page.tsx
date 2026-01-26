"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ChefHat, Users, Utensils, ShoppingBag, Sparkles, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { toast } from "sonner"
import Header from "@/components/header"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface OnboardingData {
  familySize: number
  role: string
  dietaryRestrictions: string[]
  cuisinePreferences: string[]
  budgetRange: string
  shoppingFrequency: string
  cookingFrequency: string
}

const roles = ["Parent", "Student", "Professional", "Senior", "Other"]
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "No Pork", "Halal", "None"]
const cuisineOptions = ["Ghanaian", "Nigerian", "Continental", "Chinese", "Indian", "Italian", "Mexican"]
const budgetRanges = ["Under ₵100/week", "₵100-200/week", "₵200-500/week", "₵500+/week"]
const shoppingFrequencies = ["Daily", "2-3 times/week", "Weekly", "Bi-weekly", "Monthly"]
const cookingFrequencies = ["Daily", "3-4 times/week", "1-2 times/week", "Rarely"]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    familySize: 2,
    role: "",
    dietaryRestrictions: [],
    cuisinePreferences: [],
    budgetRange: "",
    shoppingFrequency: "",
    cookingFrequency: ""
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  // Warn user before leaving if onboarding not complete
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = '' // Chrome requires returnValue to be set
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const updateData = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: 'dietaryRestrictions' | 'cuisinePreferences', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const loadingToast = toast.loading("Saving your preferences...")

    try {
      // Save preferences to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          familySize: data.familySize,
          role: data.role.toLowerCase(),
          dietaryRestrictions: data.dietaryRestrictions,
          preferredCategories: data.cuisinePreferences,
          budgetRange: data.budgetRange,
          shoppingFrequency: data.shoppingFrequency,
          cookingFrequency: data.cookingFrequency
        })
      })

      toast.dismiss(loadingToast)

      if (response.ok) {
        toast.success("Welcome to Grovio! Your preferences have been saved.")
        router.push("/")
      } else {
        toast.error("Failed to save preferences. You can update them later in settings.")
        router.push("/")
      }
    } catch (error) {
      console.error("Error saving preferences:", error)
      toast.dismiss(loadingToast)
      toast.error("Failed to save preferences. You can update them later in settings.")
      router.push("/")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = async () => {
    // Even when skipping, save default preferences to backend to mark onboarding as complete
    setIsSubmitting(true)
    const loadingToast = toast.loading("Setting up your account...")
    
    try {
      // Save minimal/default preferences
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/users/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          familySize: 1,
          role: 'user',
          dietaryRestrictions: [],
          preferredCategories: [],
          budgetRange: 'Under ₵100/week',
          shoppingFrequency: 'Weekly',
          cookingFrequency: 'Daily'
        })
      })

      toast.dismiss(loadingToast)
      localStorage.setItem('onboarding_completed', 'true')

      if (response.ok) {
        toast.info("You can update your preferences anytime in settings.")
        router.push("/")
      } else {
        toast.error("Failed to save. Please try again.")
      }
    } catch (error) {
      console.error("Error skipping onboarding:", error)
      toast.dismiss(loadingToast)
      // Still allow navigation even if backend fails
      localStorage.setItem('onboarding_completed', 'true')
      toast.info("You can set preferences later in settings.")
      router.push("/")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto text-[#D35F0E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tell us about your household</h3>
              <p className="text-gray-600">This helps us recommend the right portions</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base">How many people are you shopping for?</Label>
                <div className="flex items-center gap-4 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateData('familySize', Math.max(1, data.familySize - 1))}
                    className="h-12 w-12"
                  >
                    -
                  </Button>
                  <span className="text-3xl font-bold w-16 text-center">{data.familySize}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateData('familySize', Math.min(20, data.familySize + 1))}
                    className="h-12 w-12"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-base">What best describes you?</Label>
                <RadioGroup value={data.role} onValueChange={(val) => updateData('role', val)} className="mt-3">
                  {roles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <RadioGroupItem value={role} id={`role-${role}`} />
                      <Label htmlFor={`role-${role}`} className="font-normal cursor-pointer">{role}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Utensils className="h-16 w-16 mx-auto text-[#D35F0E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dietary Preferences</h3>
              <p className="text-gray-600">Help us filter products for you</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base mb-3 block">Any dietary restrictions?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`diet-${option}`}
                        checked={data.dietaryRestrictions.includes(option)}
                        onCheckedChange={() => toggleArrayItem('dietaryRestrictions', option)}
                      />
                      <Label htmlFor={`diet-${option}`} className="font-normal cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base mb-3 block">Favorite cuisines?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {cuisineOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cuisine-${option}`}
                        checked={data.cuisinePreferences.includes(option)}
                        onCheckedChange={() => toggleArrayItem('cuisinePreferences', option)}
                      />
                      <Label htmlFor={`cuisine-${option}`} className="font-normal cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 mx-auto text-[#D35F0E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Shopping Habits</h3>
              <p className="text-gray-600">Personalize your experience</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base">Weekly grocery budget?</Label>
                <RadioGroup value={data.budgetRange} onValueChange={(val) => updateData('budgetRange', val)} className="mt-3">
                  {budgetRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <RadioGroupItem value={range} id={`budget-${range}`} />
                      <Label htmlFor={`budget-${range}`} className="font-normal cursor-pointer">{range}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">How often do you shop?</Label>
                <RadioGroup value={data.shoppingFrequency} onValueChange={(val) => updateData('shoppingFrequency', val)} className="mt-3">
                  {shoppingFrequencies.map((freq) => (
                    <div key={freq} className="flex items-center space-x-2">
                      <RadioGroupItem value={freq} id={`shopping-${freq}`} />
                      <Label htmlFor={`shopping-${freq}`} className="font-normal cursor-pointer">{freq}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ChefHat className="h-16 w-16 mx-auto text-[#D35F0E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cooking Habits</h3>
              <p className="text-gray-600">Last step!</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base">How often do you cook?</Label>
                <RadioGroup value={data.cookingFrequency} onValueChange={(val) => updateData('cookingFrequency', val)} className="mt-3">
                  {cookingFrequencies.map((freq) => (
                    <div key={freq} className="flex items-center space-x-2">
                      <RadioGroupItem value={freq} id={`cooking-${freq}`} />
                      <Label htmlFor={`cooking-${freq}`} className="font-normal cursor-pointer">{freq}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Card className="bg-linear-to-br from-orange-50 to-amber-50 border-[#D35F0E]/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-[#D35F0E] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">You're all set!</h4>
                      <p className="text-sm text-gray-700">
                        Our AI will use these preferences to give you personalized product recommendations, 
                        meal ideas, and budget tips tailored just for you.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Important Notice */}
      <div className="container mx-auto px-4 pt-4">
        <Alert className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Complete your profile to unlock full features!</strong> 
            {" "}You'll need to finish onboarding to checkout, view orders, and access personalized recommendations.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#181725]">
              Welcome to Grovio! 🎉
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Let's personalize your shopping experience with AI
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step Content */}
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between pt-4 gap-3">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="flex-1 sm:flex-none"
              >
                Skip for now
              </Button>

              <div className="flex gap-2 flex-1 sm:flex-none">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep} 
                    className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 flex-1"
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 flex-1"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Saving..." : "Get Started"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


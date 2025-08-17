"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChefHat, Users, Utensils, ShoppingBag, Sparkles } from "lucide-react"

interface OnboardingData {
  householdSize: string
  cookingFrequency: string
  dietaryRestrictions: string[]
  cuisinePreferences: string[]
  budgetRange: string
  shoppingFrequency: string
  favoriteIngredients: string[]
  allergies: string[]
  cookingSkill: string
  mealPlanning: boolean
}

const householdSizes = ["1-2", "3-4", "5-6", "7+"]
const cookingFrequencies = ["Daily", "2-3 times/week", "Once a week", "Rarely"]
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Keto", "Paleo", "None"]
const cuisineOptions = ["Ghanaian", "Nigerian", "African", "Italian", "Chinese", "Indian", "Mexican", "American", "Other"]
const budgetRanges = ["Budget-friendly", "Mid-range", "Premium", "Luxury"]
const shoppingFrequencies = ["Daily", "2-3 times/week", "Weekly", "Bi-weekly"]
const cookingSkills = ["Beginner", "Intermediate", "Advanced", "Expert"]

export default function AIOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    householdSize: "",
    cookingFrequency: "",
    dietaryRestrictions: [],
    cuisinePreferences: [],
    budgetRange: "",
    shoppingFrequency: "",
    favoriteIngredients: [],
    allergies: [],
    cookingSkill: "",
    mealPlanning: false,
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
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

  const handleSubmit = () => {
    // Save onboarding data and use for AI recommendations
    console.log("Onboarding data:", data)
    // Here you would typically send this to your backend/AI service
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-grovio-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Tell us about your household</h3>
              <p className="text-gray-600">This helps us recommend the right quantities</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">How many people are in your household?</Label>
                <RadioGroup
                  value={data.householdSize}
                  onValueChange={(value) => updateData("householdSize", value)}
                  className="grid grid-cols-2 gap-3 mt-3"
                >
                  {householdSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={size} />
                      <Label htmlFor={size} className="cursor-pointer">{size} people</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">How often do you cook at home?</Label>
                <RadioGroup
                  value={data.cookingFrequency}
                  onValueChange={(value) => updateData("cookingFrequency", value)}
                  className="grid grid-cols-2 gap-3 mt-3"
                >
                  {cookingFrequencies.map((freq) => (
                    <div key={freq} className="flex items-center space-x-2">
                      <RadioGroupItem value={freq} id={freq} />
                      <Label htmlFor={freq} className="cursor-pointer">{freq}</Label>
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
            <div className="text-center mb-6">
              <Utensils className="h-12 w-12 text-grovio-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Dietary preferences & cuisine</h3>
              <p className="text-gray-600">Help us suggest the right ingredients for you</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Any dietary restrictions?</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {dietaryOptions.map((diet) => (
                    <div key={diet} className="flex items-center space-x-2">
                      <Checkbox
                        id={diet}
                        checked={data.dietaryRestrictions.includes(diet)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateData("dietaryRestrictions", [...data.dietaryRestrictions, diet])
                          } else {
                            updateData("dietaryRestrictions", data.dietaryRestrictions.filter(d => d !== diet))
                          }
                        }}
                      />
                      <Label htmlFor={diet} className="cursor-pointer">{diet}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">What cuisines do you enjoy?</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {cuisineOptions.map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={data.cuisinePreferences.includes(cuisine)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateData("cuisinePreferences", [...data.cuisinePreferences, cuisine])
                          } else {
                            updateData("cuisinePreferences", data.cuisinePreferences.filter(c => c !== cuisine))
                          }
                        }}
                      />
                      <Label htmlFor={cuisine} className="cursor-pointer">{cuisine}</Label>
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
            <div className="text-center mb-6">
              <ShoppingBag className="h-12 w-12 text-grovio-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Shopping habits & budget</h3>
              <p className="text-gray-600">We'll tailor recommendations to your lifestyle</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">What's your typical grocery budget?</Label>
                <RadioGroup
                  value={data.budgetRange}
                  onValueChange={(value) => updateData("budgetRange", value)}
                  className="grid grid-cols-2 gap-3 mt-3"
                >
                  {budgetRanges.map((budget) => (
                    <div key={budget} className="flex items-center space-x-2">
                      <RadioGroupItem value={budget} id={budget} />
                      <Label htmlFor={budget} className="cursor-pointer">{budget}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">How often do you shop for groceries?</Label>
                <RadioGroup
                  value={data.shoppingFrequency}
                  onValueChange={(value) => updateData("shoppingFrequency", value)}
                  className="grid grid-cols-2 gap-3 mt-3"
                >
                  {shoppingFrequencies.map((freq) => (
                    <div key={freq} className="flex items-center space-x-2">
                      <RadioGroupItem value={freq} id={freq} />
                      <Label htmlFor={freq} className="cursor-pointer">{freq}</Label>
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
            <div className="text-center mb-6">
              <ChefHat className="h-12 w-12 text-grovio-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Cooking style & preferences</h3>
              <p className="text-gray-600">Let us know your cooking expertise and favorite ingredients</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">What's your cooking skill level?</Label>
                <RadioGroup
                  value={data.cookingSkill}
                  onValueChange={(value) => updateData("cookingSkill", value)}
                  className="grid grid-cols-2 gap-3 mt-3"
                >
                  {cookingSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <RadioGroupItem value={skill} id={skill} />
                      <Label htmlFor={skill} className="cursor-pointer">{skill}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">Do you plan meals in advance?</Label>
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    id="mealPlanning"
                    checked={data.mealPlanning}
                    onCheckedChange={(checked) => updateData("mealPlanning", checked)}
                  />
                  <Label htmlFor="mealPlanning" className="cursor-pointer">
                    Yes, I like to plan my meals ahead
                  </Label>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Any food allergies or intolerances?</Label>
                <Input
                  placeholder="e.g., nuts, shellfish, lactose"
                  value={data.allergies.join(", ")}
                  onChange={(e) => updateData("allergies", e.target.value.split(", ").filter(item => item.trim()))}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Sparkles className="h-12 w-12 text-grovio-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Almost done! Let's personalize your experience</h3>
              <p className="text-gray-600">Tell us your favorite ingredients for better recommendations</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">What are your favorite ingredients?</Label>
                <Input
                  placeholder="e.g., tomatoes, garlic, chicken, rice"
                  value={data.favoriteIngredients.join(", ")}
                  onChange={(e) => updateData("favoriteIngredients", e.target.value.split(", ").filter(item => item.trim()))}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate multiple ingredients with commas
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🎯 How this helps you:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Personalized product recommendations</li>
                  <li>• Smart shopping lists based on your preferences</li>
                  <li>• Recipe suggestions using your favorite ingredients</li>
                  <li>• Budget-friendly alternatives that match your taste</li>
                  <li>• Seasonal recommendations for fresh produce</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-grovio-navy">
            Welcome to Grovio AI! 🤖
          </CardTitle>
          <p className="text-gray-600">
            Let's personalize your shopping experience with AI-powered recommendations
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
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep} className="bg-grovio-orange hover:bg-grovio-orange/90">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-grovio-orange hover:bg-grovio-orange/90">
                <Sparkles className="h-4 w-4 mr-2" />
                Start Getting Recommendations
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

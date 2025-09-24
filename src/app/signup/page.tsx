import { SignupForm } from "@/components/auth-signup-form"
import { AuthHeader } from "@/components/auth-header"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <div className="flex items-center justify-center p-4">
        <SignupForm />
      </div>
    </div>
  )
}

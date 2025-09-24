import { LoginForm } from "@/components/auth-login-form"
import { AuthHeader } from "@/components/auth-header"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <div className="flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  )
}

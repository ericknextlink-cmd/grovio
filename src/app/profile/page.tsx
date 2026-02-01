/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  MessageSquare, 
  ClipboardList, 
  Tag, 
  Gift, 
  Settings, 
  LogOut, 
  Edit, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  Star,
  Trash2,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import Header from "@/components/header"
import { useAuthStore } from "@/stores/auth-store"
import { toast } from "sonner"
import { api } from "@/lib/api-client"

type ProfileTab = "account" | "messages" | "orders" | "vouchers" | "gifts" | "management"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, signout, isLoading } = useAuthStore()
  const [activeTab, setActiveTab] = useState<ProfileTab>("account")
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("1st Floor Marble House, South Industrial Area, Adabraka, Greater Accra")
  const [newsletterPreference, setNewsletterPreference] = useState("receive")
  // Address fields for edit mode (split from selectedLocation for per-field editing)
  const [addressFullName, setAddressFullName] = useState("")
  const [addressLine1, setAddressLine1] = useState("1st Floor Marble House")
  const [addressLine2, setAddressLine2] = useState("South Industrial Area")
  const [addressArea, setAddressArea] = useState("Adabraka")
  const [addressRegion, setAddressRegion] = useState("Greater Accra")
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])
  const [newPhoneInput, setNewPhoneInput] = useState("")
  const [editingPhoneIndex, setEditingPhoneIndex] = useState<number | null>(null)
  const [editingPhoneValue, setEditingPhoneValue] = useState("")
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null)
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(false)

  // Redirect if not authenticated - but wait for auth to initialize
  useEffect(() => {
    // Only redirect if auth has finished loading and user is not authenticated
    // This prevents premature redirects before tokens are checked
    if (!isLoading && !isAuthenticated) {
      // Double-check if we have tokens - if yes, auth might still be initializing
      const hasToken = typeof window !== 'undefined' && localStorage.getItem('accessToken')
      if (!hasToken) {
        router.push('/login')
      }
    }
  }, [isLoading, isAuthenticated, router])

  // Check onboarding status when component loads and user is authenticated
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!isAuthenticated || isLoading) return
      
      setIsCheckingOnboarding(true)
      try {
        const response = await api.preferences.onboardingStatus()
        const completed = response.data?.data?.onboardingCompleted || false
        setHasCompletedOnboarding(completed)
      } catch (error) {
        console.warn('Failed to check onboarding status:', error)
        // If check fails, assume not completed to be safe
        setHasCompletedOnboarding(false)
      } finally {
        setIsCheckingOnboarding(false)
      }
    }

    checkOnboardingStatus()
  }, [isAuthenticated, isLoading])

  // Sync address name and phones from user when available
  useEffect(() => {
    if (!user) return
    setAddressFullName((prev) => (prev === "" ? `${user.firstName} ${user.lastName}`.trim() : prev))
    setPhoneNumbers((prev) => {
      if (prev.length > 0) return prev
      const raw = user.phoneNumber
      if (!raw) return []
      return raw.split(/[/,]/).map((s) => s.trim()).filter(Boolean)
    })
  }, [user])

  const handleCompleteOnboarding = () => {
    router.push('/onboarding')
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Return null if not authenticated (redirecting)
  if (!isAuthenticated || !user) {
    return null
  }

  // Use real user data from auth store
  const fullName = `${user.firstName} ${user.lastName}`

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 450.00,
      items: 5
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      status: "Processing",
      total: 320.50,
      items: 3
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Delivered",
      total: 180.75,
      items: 2
    }
  ]

  // Mock vouchers data
  const vouchers = [
    {
      id: "VCH-001",
      code: "WELCOME20",
      discount: "20%",
      description: "Welcome discount for new users",
      expiry: "2024-12-31",
      status: "Active"
    },
    {
      id: "VCH-002",
      code: "SAVE50",
      discount: "₵50",
      description: "Save ₵50 on orders over ₵200",
      expiry: "2024-06-30",
      status: "Used"
    },
    {
      id: "VCH-003",
      code: "FREESHIP",
      discount: "Free",
      description: "Free delivery on your next order",
      expiry: "2024-03-15",
      status: "Active"
    }
  ]

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  const handleLogout = async () => {
    try {
      await signout()
      toast.success("Logged out successfully")
      router.push('/')
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800"
      case "Processing": return "bg-yellow-100 text-yellow-800"
      case "Shipped": return "bg-blue-100 text-blue-800"
      case "Cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const sidebarItems = [
    { id: "account", label: "My Grovio Account", icon: User },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 1 },
    { id: "orders", label: "Orders", icon: ClipboardList },
    { id: "vouchers", label: "Discount Vouchers", icon: Tag },
    { id: "gifts", label: "Gifts & Credits", icon: Gift },
    { id: "management", label: "Account Management", icon: Settings }
  ]

  const renderAccountSection = () => (
    <div className="space-y-6">
      {/* Onboarding Status Card */}
      {hasCompletedOnboarding === false && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">
                  Complete Your Profile Setup
                </h3>
                <p className="text-orange-800 mb-4">
                  To get the best shopping experience with personalized recommendations, please complete your onboarding preferences.
                </p>
                <Button 
                  onClick={handleCompleteOnboarding}
                  className="bg-[#D35F0E] hover:bg-[#D35F0E]/90 text-white"
                >
                  Complete Onboarding
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {hasCompletedOnboarding === true && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-medium">
                Your profile setup is complete! You're all set to enjoy personalized shopping.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Name and Email – table layout */}
      <Card>
        <CardHeader className="bg-linear-to-r from-orange-100 to-orange-50">
          <CardTitle className="text-lg sr-only">Account</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-700">Account Name</th>
                <th className="p-4 font-semibold text-gray-700">Email Address</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-4">{fullName}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Address – text "Edit" link only; edit mode: per-field inputs + multiple phones */}
      <Card>
        <CardHeader className="bg-linear-to-r from-orange-100 to-orange-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Address</CardTitle>
            <button
              type="button"
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-[#D35F0E] hover:text-[#D35F0E]/80 font-medium text-sm"
            >
              Edit
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isEditingAddress ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="address-name">Full Name</Label>
                <Input
                  id="address-name"
                  value={addressFullName || fullName}
                  onChange={(e) => setAddressFullName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address-line1">Address line 1</Label>
                <Input
                  id="address-line1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address-line2">Address line 2</Label>
                <Input
                  id="address-line2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address-area">Area / City</Label>
                <Input
                  id="address-area"
                  value={addressArea}
                  onChange={(e) => setAddressArea(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address-region">Region</Label>
                <Input
                  id="address-region"
                  value={addressRegion}
                  onChange={(e) => setAddressRegion(e.target.value)}
                />
              </div>
              <div>
                <Label>Phone numbers</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Add a number in the field below and click Add. You can edit or remove existing numbers.
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {phoneNumbers.map((num, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1">
                      {editingPhoneIndex === idx ? (
                        <>
                          <Input
                            className="h-8 w-36"
                            value={editingPhoneValue}
                            onChange={(e) => setEditingPhoneValue(e.target.value)}
                            placeholder="Phone"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              const next = [...phoneNumbers]
                              next[idx] = editingPhoneValue.trim()
                              setPhoneNumbers(next)
                              setEditingPhoneIndex(null)
                              setEditingPhoneValue("")
                            }}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">{num}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-gray-500 hover:text-[#D35F0E]"
                            onClick={() => {
                              setEditingPhoneIndex(idx)
                              setEditingPhoneValue(num)
                            }}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-gray-500 hover:text-red-600"
                            onClick={() => setPhoneNumbers((p) => p.filter((_, i) => i !== idx))}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="New phone number"
                    value={newPhoneInput}
                    onChange={(e) => setNewPhoneInput(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const v = newPhoneInput.trim()
                      if (v) {
                        setPhoneNumbers((p) => [...p, v])
                        setNewPhoneInput("")
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => setIsEditingAddress(false)} className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditingAddress(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-semibold">{(addressFullName || fullName).toUpperCase()}</p>
              <p>{addressLine1}</p>
              {addressLine2 && <p>{addressLine2}</p>}
              {addressArea && <p>{addressArea}</p>}
              {addressRegion && <p>{addressRegion}</p>}
              {phoneNumbers.length > 0 && (
                <p className="text-gray-600">{phoneNumbers.join(" / ")}</p>
              )}
              {phoneNumbers.length === 0 && user.phoneNumber && (
                <p className="text-gray-600">{user.phoneNumber}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Newsletters */}
      <Card>
        <CardHeader className="bg-linear-to-r from-orange-100 to-orange-50">
          <CardTitle className="text-lg">Newsletters</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">
            Stay updated with exclusive deals, shopping tips, and the latest from Grovio. 
            You can turn newsletters on or off anytime.
          </p>
          <RadioGroup value={newsletterPreference} onValueChange={setNewsletterPreference}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="receive" id="receive" />
              <Label htmlFor="receive">Receive Grovio Newsletter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dont-send" id="dont-send" />
              <Label htmlFor="dont-send">{`Don't send me newsletters`}</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )

  const renderOrdersSection = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    {order.items} items
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    ₵{order.total.toFixed(2)}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderVouchersSection = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Discount Vouchers</h2>
      {vouchers.map((voucher) => (
        <Card key={voucher.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">{voucher.code}</h3>
                  <Badge className={voucher.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {voucher.status}
                  </Badge>
                </div>
                <p className="text-gray-600">{voucher.description}</p>
                <p className="text-sm text-gray-500">Expires: {new Date(voucher.expiry).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#D35F0E]">{voucher.discount}</div>
                <Button variant="outline" size="sm" className="mt-2">
                  {voucher.status === "Active" ? "Use Now" : "Used"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderMessagesSection = () => (
    <div className="text-center py-12">
      <MessageSquare className="h-24 w-24 text-gray-300 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Messages</h2>
      <p className="text-gray-600 mb-6">Your messages will appear here when available.</p>
      <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
        Coming Soon
      </Button>
    </div>
  )

  const renderGiftsSection = () => (
    <div className="text-center py-12">
      <Gift className="h-24 w-24 text-gray-300 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Gifts & Credits</h2>
      <p className="text-gray-600 mb-6">Your gifts and credits will appear here when available.</p>
      <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
        Coming Soon
      </Button>
    </div>
  )

  const renderManagementSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="bg-[#D35F0E] hover:bg-[#D35F0E]/90">
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h3 className="font-semibold text-red-800">Delete Account</h3>
              <p className="text-sm text-red-600">This action cannot be undone. This will permanently delete your account.</p>
            </div>
            <Button variant="destructive" className="flex items-center gap-2">
              <Image src="/trash-orange.png" alt="Trash" width={20} height={20} />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountSection()
      case "messages":
        return renderMessagesSection()
      case "orders":
        return renderOrdersSection()
      case "vouchers":
        return renderVouchersSection()
      case "gifts":
        return renderGiftsSection()
      case "management":
        return renderManagementSection()
      default:
        return renderAccountSection()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        {/* Full-height Sidebar */}
        <aside className="w-64 shrink-0 flex flex-col bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
          <div className="bg-[#D35F0E] p-4 text-white shrink-0">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <h2 className="text-lg font-semibold">My Grovio Account</h2>
            </div>
          </div>
          <nav className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ProfileTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-[#D35F0E] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className={`h-5 w-5 shrink-0 ${activeTab === item.id ? "text-white" : ""}`} />
                <span className="flex-1">{item.label}</span>
                {item.badge != null && (
                  <Badge className={`text-xs shrink-0 ${activeTab === item.id ? "bg-white text-[#D35F0E]" : "bg-[#D35F0E] text-white"}`}>
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
            <div className="mt-auto border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>
        {/* Display area – content for selected tab */}
        <main className="flex-1 min-w-0 overflow-auto">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

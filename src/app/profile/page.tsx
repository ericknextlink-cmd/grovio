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
  Trash2
} from "lucide-react"
import Header from "@/components/header"
import LocationPicker from "@/components/location-picker"
import { useAuthStore } from "@/stores/auth-store"
import { toast } from "sonner"

type ProfileTab = "account" | "messages" | "orders" | "vouchers" | "gifts" | "management"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, signout, isLoading } = useAuthStore()
  const [activeTab, setActiveTab] = useState<ProfileTab>("account")
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("1st Floor Marble House, South Industrial Area, Adabraka, Greater Accra")
  const [newsletterPreference, setNewsletterPreference] = useState("receive")

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

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
    { id: "account", label: "Account Management", icon: Settings },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 1 },
    { id: "orders", label: "Orders", icon: ClipboardList },
    { id: "vouchers", label: "Discount Vouchers", icon: Tag },
    { id: "gifts", label: "Gifts & Credits", icon: Gift },
    { id: "management", label: "Account Management", icon: User }
  ]

  const renderAccountSection = () => (
    <div className="space-y-6">
      {/* Account Name and Email */}
      <Card>
        <CardHeader className="bg-linear-to-r from-orange-100 to-orange-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Account Name</CardTitle>
            <CardTitle className="text-lg">Email Address</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#D35F0E] rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.profilePicture ? (
                  <Image src={user.profilePicture} alt="Profile" width={64} height={64} className="rounded-full" />
                ) : (
                  getInitials(fullName)
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{fullName}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader className="bg-linear-to-r from-orange-100 to-orange-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Address</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-[#D35F0E] hover:text-[#D35F0E]/80"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isEditingAddress ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={fullName} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <LocationPicker 
                  selectedLocation={selectedLocation}
                  onLocationSelect={setSelectedLocation}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={user.phoneNumber} />
              </div>
              <div className="flex gap-2">
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
              <p className="font-semibold">{fullName.toUpperCase()}</p>
              <p>{selectedLocation}</p>
              <p className="text-gray-600">{user.phoneNumber}</p>
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              {/* Header */}
              <div className="bg-[#D35F0E] p-4 text-white">
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6" />
                  <h2 className="text-lg font-semibold">My Grovio Account</h2>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="p-0">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ProfileTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      activeTab === item.id ? "bg-orange-50 text-[#D35F0E] border-r-2 border-[#D35F0E]" : "text-gray-700"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-[#D35F0E] text-white text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                ))}
                
                {/* Logout */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

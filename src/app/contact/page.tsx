"use client"

import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Placeholder submit
    setTimeout(() => setSubmitting(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={{ fullName: "", username: "" }} />
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Form + socials */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <h1 className="text-3xl font-extrabold text-grovio-navy mb-2">{`We'd love to hear from you`}</h1>
            <p className="text-gray-600 mb-6">Questions, feedback, partnerships—send us a note and we’ll get back ASAP.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" required className="py-6" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required className="py-6" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" type="tel" placeholder="+233 555 123 456" className="py-6" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help?" className="min-h-[140px] resize-none py-6" required />
              </div>
              <Button type="submit" disabled={submitting} className="bg-grovio-orange hover:bg-grovio-orange/90 w-1/2 py-8 rounded-full">
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {/* Contact info + socials */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-grovio-navy mt-0.5" />
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:hello@grovio.shop" className="text-gray-600 hover:text-grovio-orange">hello@grovio.shop</a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-grovio-navy mt-0.5" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <a href="tel:+233555123456" className="text-gray-600 hover:text-grovio-orange">+233 555 123 456</a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-grovio-navy mt-0.5" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-gray-600">Accra, Ghana</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-gray-500">Follow us</span>
              <Link href="#" className="p-2 rounded-full border hover:bg-gray-50"><Facebook className="h-4 w-4" /></Link>
              <Link href="#" className="p-2 rounded-full border hover:bg-gray-50"><Instagram className="h-4 w-4" /></Link>
              <Link href="#" className="p-2 rounded-full border hover:bg-gray-50"><Twitter className="h-4 w-4" /></Link>
            </div>
          </section>

          {/* Right: Image */}
          <section className="hidden lg:block relative rounded-xl overflow-hidden min-h-[420px] shadow-md">
            <Image src="https://img.freepik.com/photos-premium/illustrations-3d-magasins-commerce-electronique-qualite-superieure_1266756-424.jpg?w=1480" alt="Contact Grovio" fill className="object-cover" />
          </section>
        </div>
      </main>
    </div>
  )
}

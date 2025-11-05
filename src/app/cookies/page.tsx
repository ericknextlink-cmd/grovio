"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            This Cookie Policy explains how Grovio ("we," "us," or "our") uses cookies and similar tracking technologies 
            on our website and mobile application (collectively, the "Service"). It explains what these technologies are, 
            why we use them, and your rights to control our use of them.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our Service, you consent to the use of cookies in accordance with this Cookie Policy. If you do not 
            agree to our use of cookies, you should disable cookies in your browser settings or refrain from using our Service.
          </p>
        </section>

        {/* Table of Contents */}
        <section className="mb-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#what-are-cookies" className="text-[#D35F0E] hover:underline">1. What Are Cookies?</a></li>
            <li><a href="#how-we-use" className="text-[#D35F0E] hover:underline">2. How We Use Cookies</a></li>
            <li><a href="#types-of-cookies" className="text-[#D35F0E] hover:underline">3. Types of Cookies We Use</a></li>
            <li><a href="#third-party" className="text-[#D35F0E] hover:underline">4. Third-Party Cookies</a></li>
            <li><a href="#managing-cookies" className="text-[#D35F0E] hover:underline">5. Managing Cookies</a></li>
            <li><a href="#other-tracking" className="text-[#D35F0E] hover:underline">6. Other Tracking Technologies</a></li>
            <li><a href="#updates" className="text-[#D35F0E] hover:underline">7. Updates to This Policy</a></li>
            <li><a href="#contact" className="text-[#D35F0E] hover:underline">8. Contact Us</a></li>
          </ul>
        </section>

        {/* Section 1 */}
        <section id="what-are-cookies" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit 
              a website. Cookies are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p>
              Cookies allow a website to recognize your device and store some information about your preferences or past actions. 
              They help us remember your preferences, improve your user experience, and analyze how our Service is used.
            </p>
            <p>
              There are two main types of cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser. 
                These cookies are essential for the Service to function properly.</li>
              <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until you 
                delete them. These cookies remember your preferences and actions across different sessions.</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section id="how-we-use" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We use cookies for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To enable certain functions of the Service</li>
              <li>To provide analytics and help us understand how visitors use our Service</li>
              <li>To store your preferences and personalize your experience</li>
              <li>To remember your login status and shopping cart contents</li>
              <li>To improve the security and performance of our Service</li>
              <li>To deliver targeted advertisements and marketing content</li>
              <li>To enable social media features</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section id="types-of-cookies" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Essential Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies are necessary for the Service to function properly. They enable core functionality such as 
                  security, network management, and accessibility. Without these cookies, services you have requested cannot 
                  be provided.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li>Authentication cookies to keep you logged in</li>
                    <li>Session cookies to maintain your shopping cart</li>
                    <li>Security cookies to prevent fraud</li>
                    <li>Load balancing cookies to distribute traffic</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Can these be disabled?</strong> No, these cookies are essential for the Service to work.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Performance Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies collect information about how visitors use our Service, such as which pages are visited 
                  most often and if visitors receive error messages. These cookies help us improve the performance of our Service.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li>Google Analytics cookies to track page views and user behavior</li>
                    <li>Performance monitoring cookies to identify slow pages</li>
                    <li>Error tracking cookies to identify and fix issues</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Can these be disabled?</strong> Yes, but this may affect your experience and our ability to improve the Service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.3 Functionality Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies allow the Service to remember choices you make and provide enhanced, personalized features. 
                  They may also be used to provide services you have requested.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li>Language and currency preferences</li>
                    <li>Remembering your login information</li>
                    <li>Remembering your shopping cart contents</li>
                    <li>Remembering your location preferences</li>
                    <li>Personalized recommendations settings</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Can these be disabled?</strong> Yes, but you may need to re-enter preferences each time you visit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.4 Marketing Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies are used to deliver advertisements that are relevant to you and your interests. They also 
                  help measure the effectiveness of advertising campaigns.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li>Advertising cookies to show relevant ads</li>
                    <li>Social media cookies for sharing content</li>
                    <li>Retargeting cookies to show ads on other websites</li>
                    <li>Conversion tracking cookies to measure ad effectiveness</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Can these be disabled?</strong> Yes, you can opt out of marketing cookies through your browser 
                  settings or our cookie consent banner.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4 */}
        <section id="third-party" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of 
              the Service, deliver advertisements, and provide other services.
            </p>
            <p>
              Third-party services that may set cookies on our Service include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Google Analytics:</strong> To analyze how visitors use our Service</li>
              <li><strong>Google Maps:</strong> To provide location services and maps</li>
              <li><strong>Payment Processors:</strong> To process payments securely</li>
              <li><strong>Social Media Platforms:</strong> To enable social sharing and login features</li>
              <li><strong>Advertising Networks:</strong> To deliver targeted advertisements</li>
            </ul>
            <p>
              These third-party cookies are subject to the respective third parties' privacy policies. We do not control 
              the use of these cookies, and you should review the third parties' privacy policies for more information.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="managing-cookies" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Cookies</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              You have the right to accept or reject cookies. You can control and manage cookies in various ways:
            </p>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.1 Browser Settings</h3>
              <p className="mb-3">
                Most browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Block all cookies</li>
                <li>Accept cookies only from first-party websites</li>
                <li>Delete existing cookies</li>
                <li>Set your browser to notify you when cookies are set</li>
              </ul>
              <p className="mt-3">
                Please note that blocking or deleting cookies may affect your ability to use certain features of our Service.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.2 Browser-Specific Instructions</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-sm"><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                <p className="text-sm"><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                <p className="text-sm"><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
                <p className="text-sm"><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.3 Cookie Consent Banner</h3>
              <p>
                When you first visit our Service, you may see a cookie consent banner. You can accept or reject non-essential 
                cookies through this banner. You can also change your cookie preferences at any time by accessing our cookie 
                settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.4 Opt-Out Links</h3>
              <p className="mb-2">
                You can opt out of certain third-party cookies through the following links:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#D35F0E] hover:underline">Google Analytics Opt-out</a></li>
                <li>Google Ads: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#D35F0E] hover:underline">Google Ads Settings</a></li>
                <li>Facebook: <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-[#D35F0E] hover:underline">Facebook Ad Preferences</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="other-tracking" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Other Tracking Technologies</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              In addition to cookies, we may use other tracking technologies, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Web Beacons:</strong> Small graphic images embedded in web pages or emails that help us track 
                whether content has been viewed</li>
              <li><strong>Local Storage:</strong> Technology that allows websites to store information locally on your device</li>
              <li><strong>Session Storage:</strong> Similar to local storage but cleared when you close your browser</li>
              <li><strong>Pixel Tags:</strong> Small code snippets that help us track conversions and measure advertising effectiveness</li>
            </ul>
            <p>
              These technologies work similarly to cookies and are used for the same purposes. You can control these 
              technologies through your browser settings in the same way you control cookies.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="updates" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Updates to This Cookie Policy</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, 
              operational, or regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Posting the updated policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending you an email notification (for significant changes)</li>
              <li>Displaying a notice on our Service</li>
            </ul>
            <p>
              Your continued use of our Service after such changes constitutes your acceptance of the updated Cookie Policy.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-100 rounded-lg p-6 space-y-2">
              <p><strong>Grovio</strong></p>
              <p>Email: privacy@grovio.com</p>
              <p>Phone: +233 XX XXX XXXX</p>
              <p>Address: Adjuma Crescent Road, South Industrial Area, Accra, Ghana</p>
            </div>
            <p>
              For more information about how we handle your personal information, please see our{" "}
              <Link href="/privacy" className="text-[#D35F0E] hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            This Cookie Policy is governed by the laws of Ghana. By using our Service, you consent to the use of cookies 
            as described in this policy.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}


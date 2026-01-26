"use client"

import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            At Grovio, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            grocery shopping platform, website, mobile application, and related services (collectively, the "Service").
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our Service, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our Service.
          </p>
        </section>

        {/* Table of Contents */}
        <section className="mb-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#information-we-collect" className="text-[#D35F0E] hover:underline">1. Information We Collect</a></li>
            <li><a href="#how-we-use-information" className="text-[#D35F0E] hover:underline">2. How We Use Your Information</a></li>
            <li><a href="#information-sharing" className="text-[#D35F0E] hover:underline">3. Information Sharing and Disclosure</a></li>
            <li><a href="#data-security" className="text-[#D35F0E] hover:underline">4. Data Security</a></li>
            <li><a href="#your-rights" className="text-[#D35F0E] hover:underline">5. Your Rights and Choices</a></li>
            <li><a href="#cookies" className="text-[#D35F0E] hover:underline">6. Cookies and Tracking Technologies</a></li>
            <li><a href="#third-party" className="text-[#D35F0E] hover:underline">7. Third-Party Services</a></li>
            <li><a href="#children" className="text-[#D35F0E] hover:underline">8. Children's Privacy</a></li>
            <li><a href="#international" className="text-[#D35F0E] hover:underline">9. International Data Transfers</a></li>
            <li><a href="#changes" className="text-[#D35F0E] hover:underline">10. Changes to This Privacy Policy</a></li>
            <li><a href="#contact" className="text-[#D35F0E] hover:underline">11. Contact Us</a></li>
          </ul>
        </section>

        {/* Section 1 */}
        <section id="information-we-collect" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">1.1 Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                When you create an account, place an order, or interact with our Service, we may collect the following 
                personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Name (first name and last name)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Delivery address (street, city, region, postal code)</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Profile picture (if you choose to upload one)</li>
                <li>Account preferences and settings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">1.2 Usage Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We automatically collect information about how you interact with our Service, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Device information (device type, operating system, browser type, IP address)</li>
                <li>Usage patterns (pages visited, time spent, features used)</li>
                <li>Search queries and product interactions</li>
                <li>Purchase history and order details</li>
                <li>Location data (if you grant location permissions)</li>
                <li>Log files and analytics data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">1.3 Preference Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                To provide personalized recommendations, we collect information about your preferences:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Dietary restrictions and allergies</li>
                <li>Cuisine preferences</li>
                <li>Budget range and shopping frequency</li>
                <li>Cooking habits and skill level</li>
                <li>Favorite ingredients and products</li>
                <li>Family size and household information</li>
                <li>Language and currency preferences</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="how-we-use-information" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We use the information we collect for various purposes, including:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Service Delivery</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Manage your account and preferences</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send order confirmations, delivery updates, and receipts</li>
                  <li>Process payments and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personalization</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide personalized product recommendations</li>
                  <li>Create customized shopping bundles based on your preferences</li>
                  <li>Tailor content and promotions to your interests</li>
                  <li>Improve your shopping experience with AI-powered suggestions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Communication</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Send transactional emails (order confirmations, shipping updates)</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Notify you about promotions, new products, and special offers</li>
                  <li>Respond to your feedback and support requests</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Service Improvement</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Analyze usage patterns to improve our Service</li>
                  <li>Develop new features and functionality</li>
                  <li>Conduct research and analytics</li>
                  <li>Detect and prevent security threats and fraud</li>
                  <li>Ensure compliance with legal obligations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="information-sharing" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3.1 Service Providers</h3>
              <p className="mb-2">
                We share information with third-party service providers who perform services on our behalf, including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Payment processors (Paystack) for secure payment processing</li>
                <li>Delivery and logistics partners for order fulfillment</li>
                <li>Cloud storage and hosting providers</li>
                <li>Analytics and marketing service providers</li>
                <li>Customer support platforms</li>
              </ul>
              <p className="mt-2">
                These service providers are contractually obligated to protect your information and use it only for the 
                purposes we specify.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3.2 Legal Requirements</h3>
              <p>
                We may disclose your information if required by law, regulation, legal process, or government request, 
                or to protect the rights, property, or safety of Grovio, our users, or others.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3.3 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, reorganization, or sale of assets, your information may be 
                transferred as part of the transaction. We will notify you of any such change in ownership.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3.4 With Your Consent</h3>
              <p>
                We may share your information with third parties when you explicitly consent to such sharing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="data-security" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encryption of data in transit using SSL/TLS protocols</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security assessments and updates</li>
              <li>Employee training on data protection</li>
              <li>Compliance with industry security standards</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive 
              to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="your-rights" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              You have the following rights regarding your personal information:
            </p>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.1 Access and Correction</h3>
              <p>
                You can access and update your personal information at any time through your account settings. 
                You can also request a copy of your data by contacting us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.2 Deletion</h3>
              <p>
                You can request deletion of your account and personal information. We will honor your request, 
                subject to legal and contractual obligations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.3 Marketing Communications</h3>
              <p>
                You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails 
                or updating your preferences in your account settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.4 Cookies and Tracking</h3>
              <p>
                You can control cookies through your browser settings. However, disabling cookies may affect the 
                functionality of our Service. Please see our Cookie Policy for more information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.5 Data Portability</h3>
              <p>
                You have the right to receive your personal information in a structured, commonly used, and 
                machine-readable format.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="cookies" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We use cookies, web beacons, and similar tracking technologies to collect and store information about 
              your interactions with our Service. Cookies are small text files stored on your device that help us 
              provide, protect, and improve our Service.
            </p>
            <p>
              We use the following types of cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for the Service to function properly</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors use our Service</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p>
              For detailed information about our use of cookies, please refer to our{" "}
              <Link href="/cookies" className="text-[#D35F0E] hover:underline">Cookie Policy</Link>.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="third-party" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Our Service may contain links to third-party websites or integrate with third-party services. 
              We are not responsible for the privacy practices of these third parties. We encourage you to review 
              their privacy policies before providing any personal information.
            </p>
            <p>
              Third-party services we use include:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Payment processors (Paystack) - for secure payment processing</li>
              <li>Google services - for authentication, maps, and analytics</li>
              <li>Social media platforms - for login and sharing features</li>
              <li>Delivery partners - for order fulfillment</li>
            </ul>
          </div>
        </section>

        {/* Section 8 */}
        <section id="children" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Our Service is not intended for children under the age of 18. We do not knowingly collect personal 
              information from children. If you believe we have collected information from a child, please contact 
              us immediately, and we will take steps to delete such information.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section id="international" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have different data protection laws than your country. By using our Service, you 
              consent to the transfer of your information to these countries.
            </p>
            <p>
              We ensure that appropriate safeguards are in place to protect your information in accordance with 
              this Privacy Policy, regardless of where it is processed.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section id="changes" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, 
              operational, or regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Posting the updated policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending you an email notification (for significant changes)</li>
              <li>Displaying a notice on our Service</li>
            </ul>
            <p>
              Your continued use of our Service after such changes constitutes your acceptance of the updated 
              Privacy Policy.
            </p>
          </div>
        </section>

        {/* Section 11 */}
        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="bg-gray-100 rounded-lg p-6 space-y-2">
              <p><strong>Grovio</strong></p>
              <p>Email: privacy@grovio.com</p>
              <p>Phone: +233 XX XXX XXXX</p>
              <p>Address: Adjuma Crescent Road, South Industrial Area, Accra, Ghana</p>
            </div>
            <p>
              You can also visit our{" "}
              <Link href="/contact" className="text-[#D35F0E] hover:underline">Contact Us</Link> page for 
              additional ways to reach us.
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            This Privacy Policy is governed by the laws of Ghana. By using our Service, you consent to the 
            jurisdiction of the courts of Ghana for any disputes arising from this Privacy Policy.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}


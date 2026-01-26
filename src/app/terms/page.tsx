"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsAndConditionsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to Grovio. These Terms and Conditions ("Terms") govern your access to and use of the Grovio 
            grocery shopping platform, website, mobile application, and related services (collectively, the "Service") 
            operated by Grovio ("we," "us," or "our").
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Please read these Terms carefully before using our Service. By accessing or using our Service, you agree 
            to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use the Service.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These Terms constitute a legally binding agreement between you and Grovio. Your use of the Service is also 
            subject to our Privacy Policy, which can be found at{" "}
            <Link href="/privacy" className="text-[#D35F0E] hover:underline">/privacy</Link>.
          </p>
        </section>

        {/* Table of Contents */}
        <section className="mb-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#acceptance" className="text-[#D35F0E] hover:underline">1. Acceptance of Terms</a></li>
            <li><a href="#eligibility" className="text-[#D35F0E] hover:underline">2. Eligibility and Account Registration</a></li>
            <li><a href="#use-of-service" className="text-[#D35F0E] hover:underline">3. Use of Service</a></li>
            <li><a href="#products-pricing" className="text-[#D35F0E] hover:underline">4. Products and Pricing</a></li>
            <li><a href="#orders-payment" className="text-[#D35F0E] hover:underline">5. Orders and Payment</a></li>
            <li><a href="#delivery" className="text-[#D35F0E] hover:underline">6. Delivery and Fulfillment</a></li>
            <li><a href="#returns-refunds" className="text-[#D35F0E] hover:underline">7. Returns and Refunds</a></li>
            <li><a href="#intellectual-property" className="text-[#D35F0E] hover:underline">8. Intellectual Property</a></li>
            <li><a href="#user-content" className="text-[#D35F0E] hover:underline">9. User-Generated Content</a></li>
            <li><a href="#prohibited-activities" className="text-[#D35F0E] hover:underline">10. Prohibited Activities</a></li>
            <li><a href="#disclaimers" className="text-[#D35F0E] hover:underline">11. Disclaimers and Limitation of Liability</a></li>
            <li><a href="#indemnification" className="text-[#D35F0E] hover:underline">12. Indemnification</a></li>
            <li><a href="#termination" className="text-[#D35F0E] hover:underline">13. Termination</a></li>
            <li><a href="#disputes" className="text-[#D35F0E] hover:underline">14. Dispute Resolution</a></li>
            <li><a href="#changes" className="text-[#D35F0E] hover:underline">15. Changes to Terms</a></li>
            <li><a href="#contact" className="text-[#D35F0E] hover:underline">16. Contact Information</a></li>
          </ul>
        </section>

        {/* Section 1 */}
        <section id="acceptance" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              By accessing, browsing, or using our Service, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these 
              Terms, you are prohibited from using or accessing the Service.
            </p>
            <p>
              These Terms apply to all users of the Service, including without limitation users who are browsers, 
              vendors, customers, merchants, and contributors of content.
            </p>
            <p>
              We reserve the right to update, change, or replace any part of these Terms by posting updates and changes 
              to our Service. It is your responsibility to check this page periodically for changes. Your continued use 
              of or access to the Service following the posting of any changes constitutes acceptance of those changes.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="eligibility" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility and Account Registration</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2.1 Age Requirement</h3>
              <p>
                You must be at least 18 years old to use our Service. By using the Service, you represent and warrant 
                that you are at least 18 years of age and have the legal capacity to enter into these Terms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2.2 Account Creation</h3>
              <p className="mb-2">
                To access certain features of the Service, you must create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2.3 Account Security</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials, including your 
                password. You agree not to share your account credentials with any third party. You are solely responsible 
                for all activities that occur under your account, whether or not authorized by you.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2.4 Multiple Accounts</h3>
              <p>
                You may not create multiple accounts for the purpose of circumventing our policies, obtaining promotional 
                benefits, or any other fraudulent purpose. We reserve the right to suspend or terminate accounts that 
                violate this provision.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="use-of-service" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of Service</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3.1 Permitted Use</h3>
              <p>
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, 
                revocable license to access and use the Service for your personal, non-commercial use.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3.2 Service Availability</h3>
              <p>
                We strive to provide uninterrupted access to the Service, but we do not guarantee that the Service will 
                be available at all times. We reserve the right to modify, suspend, or discontinue any part of the Service 
                at any time, with or without notice.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3.3 AI-Powered Features</h3>
              <p className="mb-2">
                Our Service includes AI-powered features such as personalized recommendations, shopping assistants, and 
                product bundles. You acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>AI recommendations are suggestions and not guarantees of product suitability</li>
                <li>You are responsible for reviewing and verifying all product information before purchase</li>
                <li>We are not liable for any decisions made based on AI recommendations</li>
                <li>AI features may be unavailable from time to time for maintenance or updates</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="products-pricing" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Products and Pricing</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4.1 Product Information</h3>
              <p className="mb-2">
                We strive to provide accurate product information, including descriptions, images, prices, and availability. 
                However, we do not warrant that product descriptions, images, or other content on the Service are accurate, 
                complete, reliable, current, or error-free.
              </p>
              <p>
                Product images are for illustrative purposes only. Actual products may vary in appearance, size, or packaging.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4.2 Pricing</h3>
              <p className="mb-2">
                All prices are displayed in Ghana Cedis (GHS) and are subject to change without notice. We reserve the right 
                to modify prices at any time, but price changes will not affect orders that have already been confirmed.
              </p>
              <p className="mb-2">
                Prices include applicable taxes unless otherwise stated. Additional charges may apply for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Delivery fees (if applicable)</li>
                <li>Special packaging or handling</li>
                <li>Rush delivery options</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4.3 Product Availability</h3>
              <p>
                Product availability is subject to change. We reserve the right to limit quantities, discontinue products, 
                or refuse orders at our sole discretion. If a product becomes unavailable after you place an order, we will 
                notify you and provide options for replacement or refund.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4.4 Promotions and Discounts</h3>
              <p>
                We may offer promotions, discounts, or special offers from time to time. These offers are subject to 
                specific terms and conditions as stated. We reserve the right to modify or cancel promotions at any time. 
                Promotions cannot be combined unless explicitly stated.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="orders-payment" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Orders and Payment</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.1 Order Placement</h3>
              <p className="mb-2">
                When you place an order, you are making an offer to purchase products at the prices and terms stated. 
                We reserve the right to accept or reject any order for any reason, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Product availability</li>
                <li>Errors in pricing or product information</li>
                <li>Fraudulent or suspicious activity</li>
                <li>Violation of these Terms</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.2 Order Confirmation</h3>
              <p>
                After you place an order, you will receive an order confirmation email. This confirmation does not constitute 
                acceptance of your order. Your order is accepted when we send you a shipping confirmation or when the product 
                is delivered, whichever occurs first.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.3 Payment Methods</h3>
              <p className="mb-2">
                We accept the following payment methods:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Credit and debit cards (Visa, Mastercard)</li>
                <li>Mobile money (MTN, Telecel, AirtelTigo)</li>
                <li>Bank transfers</li>
                <li>Other payment methods as may be available</li>
              </ul>
              <p className="mt-2">
                All payments are processed securely through our payment partners, including Paystack. We do not store your 
                full payment card details on our servers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.4 Payment Authorization</h3>
              <p>
                By providing payment information, you represent and warrant that you are authorized to use the payment method 
                and that the payment information is accurate. You authorize us to charge your payment method for the total 
                amount of your order, including applicable taxes and fees.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.5 Failed Payments</h3>
              <p>
                If payment fails, we will attempt to notify you. Your order may be cancelled if payment cannot be processed. 
                We are not responsible for any fees charged by your bank or payment provider for failed transactions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="delivery" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Delivery and Fulfillment</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6.1 Delivery Areas</h3>
              <p>
                We currently deliver to selected areas in Ghana. Delivery availability may vary by location. You will be 
                informed of delivery options during checkout. We reserve the right to refuse delivery to certain areas.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6.2 Delivery Times</h3>
              <p className="mb-2">
                Estimated delivery times are provided at checkout and are estimates only. Actual delivery times may vary 
                due to factors beyond our control, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Weather conditions</li>
                <li>Traffic conditions</li>
                <li>High order volumes</li>
                <li>Force majeure events</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6.3 Delivery Instructions</h3>
              <p>
                You are responsible for providing accurate delivery addresses and being available to receive orders. 
                If you are not available, we may attempt delivery again or leave the order in a safe location as per 
                your instructions. We are not responsible for orders left unattended.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6.4 Risk of Loss</h3>
              <p>
                Title to and risk of loss of products pass to you upon delivery to the specified delivery address. 
                You are responsible for inspecting products upon delivery and reporting any issues immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section id="returns-refunds" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Returns and Refunds</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">7.1 Return Policy</h3>
              <p className="mb-2">
                You may return products within 7 days of delivery, subject to the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Products must be in original, unopened packaging</li>
                <li>Products must be unused and in resalable condition</li>
                <li>Perishable items, fresh produce, and opened products are not eligible for return</li>
                <li>You must provide proof of purchase</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">7.2 Return Process</h3>
              <p>
                To initiate a return, contact our customer service team. We will provide instructions for returning 
                the product. You are responsible for return shipping costs unless the product is defective or we 
                made an error.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">7.3 Refunds</h3>
              <p className="mb-2">
                Refunds will be processed within 7-14 business days after we receive and inspect the returned product. 
                Refunds will be issued to the original payment method used for purchase.
              </p>
              <p>
                We reserve the right to refuse returns or refunds if products are damaged, used, or not in resalable 
                condition, or if the return request is made outside the return period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">7.4 Defective Products</h3>
              <p>
                If you receive a defective or damaged product, contact us immediately. We will arrange for replacement 
                or refund at no cost to you, subject to verification of the defect or damage.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section id="intellectual-property" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The Service and its original content, features, and functionality are owned by Grovio and are protected by 
              international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
              republish, download, store, or transmit any of the material on our Service without our prior written consent.
            </p>
            <p>
              The Grovio name, logo, and all related names, logos, product and service names, designs, and slogans are 
              trademarks of Grovio or its affiliates. You may not use such marks without our prior written permission.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section id="user-content" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. User-Generated Content</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">9.1 Content License</h3>
              <p>
                If you submit, post, or upload content to our Service (such as reviews, comments, or feedback), you grant 
                us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify, 
                adapt, publish, translate, and distribute such content in any media.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">9.2 Content Standards</h3>
              <p className="mb-2">
                You agree that your content will not:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Violate any laws or regulations</li>
                <li>Infringe on the rights of any third party</li>
                <li>Contain false, misleading, or defamatory information</li>
                <li>Contain offensive, obscene, or inappropriate material</li>
                <li>Contain spam, advertising, or promotional content</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">9.3 Content Removal</h3>
              <p>
                We reserve the right to remove or modify any user-generated content that violates these Terms or that we 
                determine, in our sole discretion, to be inappropriate or harmful.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10 */}
        <section id="prohibited-activities" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Prohibited Activities</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="mb-2">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Attempt to gain unauthorized access to the Service or its related systems</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
              <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
              <li>Impersonate any person or entity or falsely state or misrepresent your affiliation</li>
              <li>Collect or harvest information about other users without their consent</li>
              <li>Use the Service to transmit viruses, malware, or other harmful code</li>
              <li>Attempt to reverse engineer, decompile, or disassemble the Service</li>
              <li>Resell or redistribute products purchased through the Service without authorization</li>
              <li>Use the Service to compete with or harm our business</li>
            </ul>
          </div>
        </section>

        {/* Section 11 */}
        <section id="disclaimers" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Disclaimers and Limitation of Liability</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">11.1 Service Disclaimer</h3>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR 
                IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES of MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                OR NON-INFRINGEMENT.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">11.2 Limitation of Liability</h3>
              <p className="mb-2">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, GROVIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Loss of profits, revenue, or data</li>
                <li>Loss of business opportunities</li>
                <li>Cost of substitute goods or services</li>
                <li>Personal injury or property damage</li>
              </ul>
              <p className="mt-2">
                OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">11.3 Product Disclaimer</h3>
              <p>
                We are not responsible for the quality, safety, or suitability of products manufactured by third parties. 
                Product descriptions and information are provided by manufacturers or suppliers. We disclaim all warranties 
                regarding product quality, fitness for purpose, or merchantability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12 */}
        <section id="indemnification" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Indemnification</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              You agree to indemnify, defend, and hold harmless Grovio, its officers, directors, employees, agents, and 
              affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable 
              attorneys' fees) arising out of or relating to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Your use or misuse of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of a third party</li>
              <li>Any content you submit, post, or transmit through the Service</li>
            </ul>
          </div>
        </section>

        {/* Section 13 */}
        <section id="termination" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Termination</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">13.1 Termination by You</h3>
              <p>
                You may terminate your account at any time by contacting us or using the account deletion feature in 
                your account settings. Upon termination, your right to use the Service will immediately cease.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">13.2 Termination by Us</h3>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice, 
                for any reason, including but not limited to your breach of these Terms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">13.3 Effect of Termination</h3>
              <p>
                Upon termination, all rights granted to you under these Terms will immediately cease. Sections that by 
                their nature should survive termination will survive, including but not limited to intellectual property 
                rights, disclaimers, indemnification, and limitation of liability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 14 */}
        <section id="disputes" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Dispute Resolution</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">14.1 Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Ghana, without regard to 
                its conflict of law provisions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">14.2 Jurisdiction</h3>
              <p>
                Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive 
                jurisdiction of the courts of Ghana.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">14.3 Informal Resolution</h3>
              <p>
                Before filing a claim, you agree to contact us to attempt to resolve the dispute informally. We will 
                attempt to resolve the dispute within 30 days of receiving your notice.
              </p>
            </div>
          </div>
        </section>

        {/* Section 15 */}
        <section id="changes" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Changes to Terms</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If we make 
              material changes, we will notify you by:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Posting the updated Terms on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending you an email notification (for significant changes)</li>
              <li>Displaying a notice on our Service</li>
            </ul>
            <p>
              Your continued use of the Service after such changes constitutes your acceptance of the new Terms. If you 
              do not agree to the modified Terms, you must stop using the Service.
            </p>
          </div>
        </section>

        {/* Section 16 */}
        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-100 rounded-lg p-6 space-y-2">
              <p><strong>Grovio</strong></p>
              <p>Email: legal@grovio.com</p>
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
            By using the Grovio Service, you acknowledge that you have read, understood, and agree to be bound by 
            these Terms and Conditions. If you do not agree to these Terms, please do not use our Service.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}


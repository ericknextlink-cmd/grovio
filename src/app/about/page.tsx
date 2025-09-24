import Header from "@/components/header"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={{ fullName: "", username: "" }} />
      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-grovio-navy leading-tight mb-4">
              Grovio makes grocery shopping feel thoughtful, simple, and joyful
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We’re building the most helpful way to shop your daily essentials—powered by a friendly AI that listens,
              understands your needs, and recommends the best basket for your life and budget.
            </p>
            <div className="flex gap-4">
              <Link href="/products" className="inline-flex items-center px-6 py-3 rounded-full bg-grovio-orange text-white font-semibold hover:bg-grovio-orange/90">
                Explore Products
              </Link>
              <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-full border border-grovio-orange text-grovio-orange font-semibold hover:bg-orange-50">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image src="/grocery.png" alt="Grovio shopping" fill className="object-cover" />
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white rounded-xl p-8 md:p-10 shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-grovio-navy mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            To help households shop smarter—reducing waste, saving time, and discovering better choices—through trusted
            recommendations and a delightful experience across devices.
          </p>
        </section>

        {/* Values */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: "People First", desc: "We obsess over helpful experiences that genuinely make life easier." },
            { title: "Honest Value", desc: "Transparent pricing and recommendations tuned to your budget." },
            { title: "Joyful Design", desc: "Every interaction should feel calm, clear, and a little bit magical." },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-grovio-navy mb-2">{v.title}</h3>
              <p className="text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </section>

        {/* Stats */}
        <section className="bg-white rounded-xl p-8 md:p-10 shadow-sm mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "10k+", label: "Happy Shoppers" },
              { num: "2k+", label: "Curated Products" },
              { num: "98%", label: "Satisfaction Score" },
              { num: "24/7", label: "AI Assistance" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-grovio-navy">{s.num}</div>
                <div className="text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-grovio-navy mb-4">Ready to shop smarter with Grovio?</h3>
          <p className="text-gray-600 mb-6">Let our assistant build a basket tailored to you.</p>
          <Link href="/" className="inline-flex items-center px-8 py-3 rounded-full bg-grovio-orange text-white font-semibold hover:bg-grovio-orange/90">
            Start Shopping
          </Link>
        </section>
      </main>
    </div>
  )
}

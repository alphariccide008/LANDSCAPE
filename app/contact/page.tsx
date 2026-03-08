import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Leaf, Phone, Mail, MapPin, Clock } from "lucide-react"

const offices = [
  {
    city: "Lagos",
    address: "12 Adeola Odeku Street, Victoria Island, Lagos",
    phone: "+234 (0) 801 234 5678",
    email: "lagos@landscape.ng",
    hours: "Mon–Fri: 8am–6pm | Sat: 9am–3pm",
  },
  {
    city: "Abuja",
    address: "Plot 1512, Constitution Avenue, Maitama, Abuja",
    phone: "+234 (0) 802 345 6789",
    email: "abuja@landscape.ng",
    hours: "Mon–Fri: 8am–6pm | Sat: 9am–3pm",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page hero — light */}
        <section className="relative py-24 bg-gray-50 border-b border-gray-100 overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-30" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-white shadow-sm mb-6">
                <Leaf className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Get In Touch</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-serif text-gray-900 leading-tight mb-5">
                Let&apos;s Build Something{" "}
                <span className="text-gold-gradient">Beautiful</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                Ready to transform your outdoor space? Reach out for a free on-site consultation.
                We&apos;re here Monday through Saturday.
              </p>
              <div className="mt-8 h-1 w-20 bg-gold-gradient rounded-full" />
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black font-serif text-gray-900 mb-4">
                Our <span className="text-gold-gradient">Offices</span>
              </h2>
              <p className="text-gray-500">Visit us at one of our locations or reach out remotely.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="bg-white border border-gray-100 rounded-2xl p-8 hover-lift shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{office.city} Office</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{office.email}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">{office.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

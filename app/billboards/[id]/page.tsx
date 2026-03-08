import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import {
  MapPin,
  ArrowLeft,
  Eye,
  Star,
  Zap,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Static placeholder — replace with DB fetch when backend is ready
const getBillboard = (id: string) => ({
  id,
  title: "Lekki-Epe Expressway Unipole",
  location: "Lekki Phase 1, Lagos",
  state: "Lagos",
  type: "Unipole / Monopole",
  size: "48ft × 24ft",
  height: "45ft",
  price: "₦4,200,000",
  period: "/ month",
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  image2: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  views: "2.4M",
  rating: 4.9,
  reviews: 38,
  illuminated: true,
  facing: "Dual-faced",
  available: true,
  coordinates: "6.4281° N, 3.4219° E",
  trafficDensity: "Very High",
  demographics: "Working professionals, commuters, C-suite executives",
  bestFor: ["FMCG brands", "Finance & banking", "Telecoms", "Auto/motors"],
  features: [
    "Illuminated (visible 24hrs)",
    "Dual-faced (captures both directions)",
    "High-resolution print surface",
    "Verified 2.4M daily impressions",
    "Prime Lekki corridor placement",
    "Free artwork consultation",
  ],
  nearbyLandmarks: ["Lekki Toll Gate", "Eleganza Junction", "Lekki Phase 1 Estate"],
})

export default function BillboardDetailPage({ params }: { params: { id: string } }) {
  const bill = getBillboard(params.id)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/billboards" className="hover:text-primary transition-colors">Billboards</Link>
              <span>/</span>
              <span className="text-gray-600 font-medium line-clamp-1">{bill.title}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-10">
          {/* Back */}
          <Link
            href="/billboards"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Billboards
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left — Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden h-80 sm:h-[420px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bill.image}
                  alt={bill.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {bill.available && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Available Now
                  </div>
                )}
                {bill.illuminated && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Zap className="h-3.5 w-3.5 text-yellow-300" />
                    Illuminated
                  </div>
                )}
              </div>

              {/* Thumbnail */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl overflow-hidden h-24 border-2 border-primary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bill.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bill.image2} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
                <div className="rounded-xl overflow-hidden h-24 bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-400">+4 photos</span>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Type", value: bill.type },
                  { label: "Size", value: bill.size },
                  { label: "Height", value: bill.height },
                  { label: "Facing", value: bill.facing },
                  { label: "Daily Views", value: bill.views },
                  { label: "Traffic", value: bill.trafficDensity },
                  { label: "Coordinates", value: bill.coordinates },
                  { label: "State", value: bill.state },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{item.label}</div>
                    <div className="text-sm font-bold text-gray-800">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-4">What&apos;s Included</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {bill.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Best for */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Best For</h3>
                <p className="text-sm text-gray-400 mb-4">Target demographics: {bill.demographics}</p>
                <div className="flex flex-wrap gap-2">
                  {bill.bestFor.map((b) => (
                    <span key={b} className="text-xs font-semibold text-primary bg-primary/8 rounded-full px-3 py-1">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Booking card */}
            <div className="space-y-5">
              {/* Price card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg shadow-black/5 sticky top-28">
                <div className="h-1 bg-gold-gradient rounded-full -mt-1 -mx-1 mb-5" />

                {/* Title */}
                <h2 className="text-xl font-black text-gray-900 mb-1">{bill.title}</h2>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-5">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  {bill.location}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(bill.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-700">{bill.rating}</span>
                  <span className="text-sm text-gray-400">({bill.reviews} reviews)</span>
                </div>

                {/* Impressions */}
                <div className="flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 mb-5">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-gray-700">
                    <span className="text-primary font-black">{bill.views}</span> daily impressions
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-black text-gray-900">{bill.price}</div>
                  <div className="text-sm text-gray-400">{bill.period} — minimum 1 month</div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-3">
                  <Button variant="gold" className="w-full h-12 rounded-xl text-base font-bold" asChild>
                    <Link href="/contact">Book This Billboard</Link>
                  </Button>
                  <Button variant="outline-gold" className="w-full h-12 rounded-xl font-bold" asChild>
                    <Link href="/contact">Request Site Visit</Link>
                  </Button>
                </div>

                {/* Contact */}
                <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                  <a href="tel:+2348000000000" className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                    </div>
                    +234 800 000 0000
                  </a>
                  <a href="mailto:hello@landscape.ng" className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                    </div>
                    hello@landscape.ng
                  </a>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Available from March 2026
                  </div>
                </div>
              </div>

              {/* Nearby */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Nearby Landmarks</h4>
                <ul className="space-y-2">
                  {bill.nearbyLandmarks.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

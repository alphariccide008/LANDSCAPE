"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { MapPin, Search, Layers, SlidersHorizontal, Eye, Heart, Star, Zap, X, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const billboardTypes = [
  "All Types",
  "Unipole / Monopole",
  "LED Digital Screen",
  "Wall Drape / Wrap",
  "Gantry / Bridge",
  "Transit / Bus Shelter",
  "Rooftop Billboard",
  "Lamp Post Banner",
  "Airport Advertising",
  "Mall / Indoor",
  "Mobile Billboard",
]

const nigeriaStates = [
  "All States",
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
]

const allBillboards = [
  {
    id: 1,
    title: "Lekki-Epe Expressway Unipole",
    location: "Lekki Phase 1, Lagos",
    state: "Lagos",
    type: "Unipole / Monopole",
    size: "48ft × 24ft",
    price: 4200000,
    priceDisplay: "₦4,200,000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    views: "2.4M",
    badge: "Top Pick",
    badgeColor: "gold" as const,
    rating: 4.9,
    illuminated: true,
    facing: "Dual-faced",
  },
  {
    id: 2,
    title: "Adeola Odeku LED Screen",
    location: "Victoria Island, Lagos",
    state: "Lagos",
    type: "LED Digital Screen",
    size: "20ft × 10ft",
    price: 2800000,
    priceDisplay: "₦2,800,000",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    views: "1.8M",
    badge: "Digital",
    badgeColor: "green" as const,
    rating: 4.8,
    illuminated: true,
    facing: "Single-faced",
  },
  {
    id: 3,
    title: "Airport Road Gantry",
    location: "Ikeja Along, Lagos",
    state: "Lagos",
    type: "Gantry / Bridge",
    size: "60ft × 15ft",
    price: 6500000,
    priceDisplay: "₦6,500,000",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    views: "3.1M",
    badge: "Premium",
    badgeColor: "gold" as const,
    rating: 5.0,
    illuminated: true,
    facing: "Overhead",
  },
  {
    id: 4,
    title: "Wuse 2 Wall Drape",
    location: "Wuse Zone 2, Abuja",
    state: "FCT - Abuja",
    type: "Wall Drape / Wrap",
    size: "40ft × 30ft",
    price: 3100000,
    priceDisplay: "₦3,100,000",
    image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=600&q=80",
    views: "980K",
    badge: "Hot Deal",
    badgeColor: "gold" as const,
    rating: 4.7,
    illuminated: false,
    facing: "Single-faced",
  },
  {
    id: 5,
    title: "Trans Amadi Rooftop",
    location: "Trans Amadi, Port Harcourt",
    state: "Rivers",
    type: "Rooftop Billboard",
    size: "36ft × 18ft",
    price: 1900000,
    priceDisplay: "₦1,900,000",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
    views: "1.2M",
    badge: "New",
    badgeColor: "green" as const,
    rating: 4.6,
    illuminated: true,
    facing: "Dual-faced",
  },
  {
    id: 6,
    title: "Ahmadu Bello Way Unipole",
    location: "Central Business District, Abuja",
    state: "FCT - Abuja",
    type: "Unipole / Monopole",
    size: "48ft × 24ft",
    price: 3800000,
    priceDisplay: "₦3,800,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    views: "2.0M",
    badge: "Top Pick",
    badgeColor: "gold" as const,
    rating: 4.8,
    illuminated: true,
    facing: "Single-faced",
  },
  {
    id: 7,
    title: "Benin-Asaba Road Unipole",
    location: "Ring Road, Benin City",
    state: "Edo",
    type: "Unipole / Monopole",
    size: "48ft × 24ft",
    price: 1400000,
    priceDisplay: "₦1,400,000",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    views: "820K",
    badge: "Available",
    badgeColor: "green" as const,
    rating: 4.5,
    illuminated: true,
    facing: "Dual-faced",
  },
  {
    id: 8,
    title: "Kano City Gate Billboard",
    location: "Bompai Road, Kano",
    state: "Kano",
    type: "Unipole / Monopole",
    size: "60ft × 30ft",
    price: 1600000,
    priceDisplay: "₦1,600,000",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=600&q=80",
    views: "1.5M",
    badge: "Top Pick",
    badgeColor: "gold" as const,
    rating: 4.7,
    illuminated: true,
    facing: "Dual-faced",
  },
  {
    id: 9,
    title: "Calabar Marina Transit Shelter",
    location: "Marina, Calabar",
    state: "Cross River",
    type: "Transit / Bus Shelter",
    size: "12ft × 5ft",
    price: 320000,
    priceDisplay: "₦320,000",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    views: "450K",
    badge: "Affordable",
    badgeColor: "green" as const,
    rating: 4.4,
    illuminated: false,
    facing: "Single-faced",
  },
  {
    id: 10,
    title: "Murtala Muhammed Airport Terminal",
    location: "International Arrivals, Lagos",
    state: "Lagos",
    type: "Airport Advertising",
    size: "Various",
    price: 5500000,
    priceDisplay: "₦5,500,000",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    views: "4.2M",
    badge: "Premium",
    badgeColor: "gold" as const,
    rating: 5.0,
    illuminated: true,
    facing: "Multiple",
  },
  {
    id: 11,
    title: "Ikeja City Mall LED Wall",
    location: "Ikeja, Lagos",
    state: "Lagos",
    type: "Mall / Indoor",
    size: "24ft × 12ft",
    price: 2200000,
    priceDisplay: "₦2,200,000",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80",
    views: "1.1M",
    badge: "Digital",
    badgeColor: "green" as const,
    rating: 4.6,
    illuminated: true,
    facing: "Indoor",
  },
  {
    id: 12,
    title: "Onitsha Head Bridge Gantry",
    location: "Upper Iweka, Onitsha",
    state: "Anambra",
    type: "Gantry / Bridge",
    size: "50ft × 12ft",
    price: 2400000,
    priceDisplay: "₦2,400,000",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    views: "2.8M",
    badge: "Hot Deal",
    badgeColor: "gold" as const,
    rating: 4.9,
    illuminated: true,
    facing: "Overhead",
  },
]

function BillboardsContent() {
  const searchParams = useSearchParams()
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [stateFilter, setStateFilter] = useState("All States")
  const [searchText, setSearchText] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Apply URL params on mount
  useEffect(() => {
    const stateParam = searchParams.get("state")
    const typeParam = searchParams.get("type")
    const areaParam = searchParams.get("area")
    if (stateParam) {
      const match = nigeriaStates.find(
        (s) => s.toLowerCase().replace(/\s+/g, "").includes(stateParam.toLowerCase())
      )
      if (match) setStateFilter(match)
    }
    if (typeParam) setTypeFilter(typeParam)
    if (areaParam) setSearchText(areaParam)
  }, [searchParams])

  const filtered = allBillboards.filter((b) => {
    const matchType = typeFilter === "All Types" || b.type === typeFilter
    const matchState =
      stateFilter === "All States" ||
      b.state.toLowerCase().includes(stateFilter.toLowerCase().replace("fct - abuja", "fct")) ||
      stateFilter.toLowerCase().includes(b.state.toLowerCase())
    const matchSearch =
      !searchText ||
      b.title.toLowerCase().includes(searchText.toLowerCase()) ||
      b.location.toLowerCase().includes(searchText.toLowerCase())
    return matchType && matchState && matchSearch
  })

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearFilters = () => {
    setTypeFilter("All Types")
    setStateFilter("All States")
    setSearchText("")
  }

  const hasActiveFilters = typeFilter !== "All Types" || stateFilter !== "All States" || searchText

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-25" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-white shadow-sm mb-6">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Browse Billboards</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black font-serif text-gray-900 leading-tight mb-4">
              Find Your{" "}
              <span className="text-gold-gradient">Perfect</span>{" "}
              Billboard
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
              Browse 2,000+ verified outdoor advertising locations across Nigeria. Filter by type, state, and area to discover your ideal spot.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name or area..."
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
              />
            </div>

            {/* Type filter */}
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-10 pl-9 pr-8 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm appearance-none cursor-pointer min-w-[180px]"
              >
                {billboardTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* State filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="h-10 pl-9 pr-8 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm appearance-none cursor-pointer min-w-[160px]"
              >
                {nigeriaStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-red-300 hover:text-red-500 transition-all flex-shrink-0"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}

            <div className="flex-shrink-0 text-sm text-gray-400">
              <span className="font-bold text-gray-700">{filtered.length}</span> results
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <Search className="h-7 w-7 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No billboards found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-white font-bold text-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((bill) => (
                <Link key={bill.id} href={`/billboards/${bill.id}`}>
                  <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/8 hover:border-primary/20 transition-all duration-300 hover-float cursor-pointer">
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bill.image}
                        alt={bill.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute top-2.5 left-2.5">
                        <Badge variant={bill.badgeColor} className="text-[10px]">{bill.badge}</Badge>
                      </div>

                      <button
                        onClick={(e) => toggleLike(bill.id, e)}
                        className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                          liked.has(bill.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${liked.has(bill.id) ? "fill-current" : ""}`} />
                      </button>

                      <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-white text-[11px] font-semibold">
                        <Eye className="h-3 w-3" />
                        {bill.views} daily
                      </div>

                      {bill.illuminated && (
                        <div className="absolute bottom-2 right-2.5 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                          <Zap className="h-2.5 w-2.5 text-yellow-300" />
                          <span className="text-[10px] text-white">Lit</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="inline-block text-[10px] font-semibold text-primary bg-primary/8 rounded-full px-2.5 py-0.5 mb-2">
                        {bill.type}
                      </span>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-primary transition-colors mb-1 line-clamp-1">
                        {bill.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="line-clamp-1">{bill.location}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-base font-black text-primary">{bill.priceDisplay}</span>
                          <span className="text-[10px] text-gray-400 ml-1">/mo</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-bold text-gray-600">{bill.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Load more placeholder */}
          {filtered.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-gray-400 text-sm mb-4">Showing {filtered.length} of 2,000+ listings</p>
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-primary/30 text-primary font-bold text-sm hover:bg-primary/5 hover:border-primary transition-all duration-300">
                Load More Billboards <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function BillboardsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<div className="pt-32 pb-16 bg-gray-50 min-h-[300px]" />}>
          <BillboardsContent />
        </Suspense>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

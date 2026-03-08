"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Eye, Heart, ArrowRight, Star, Zap, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const deals = [
  {
    id: 1,
    title: "Lekki-Epe Expressway Unipole (KM 14)",
    location: "Lekki Phase 1, Lagos",
    type: "Unipole / Monopole",
    size: "48ft × 24ft",
    price: "₦4,200,000",
    period: "/ month",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    views: "2.4M",
    badge: "Top Pick",
    badgeColor: "gold" as const,
    rating: 4.9,
    illuminated: true,
    facing: "Dual-faced",
  },
  {
    id: 2,
    title: "Adeola Odeku LED Screen — VI",
    location: "Victoria Island, Lagos",
    type: "LED Digital Screen",
    size: "20ft × 10ft",
    price: "₦2,800,000",
    period: "/ month",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    views: "1.8M",
    badge: "Digital",
    badgeColor: "green" as const,
    rating: 4.8,
    illuminated: true,
    facing: "Single-faced",
  },
  {
    id: 3,
    title: "Airport Road Gantry — Mafoluku",
    location: "Ikeja Along, Lagos",
    type: "Gantry / Bridge",
    size: "60ft × 15ft",
    price: "₦6,500,000",
    period: "/ month",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&q=80",
    views: "3.1M",
    badge: "Premium",
    badgeColor: "gold" as const,
    rating: 5.0,
    illuminated: true,
    facing: "Overhead",
  },
  {
    id: 4,
    title: "Wuse 2 Wall Drape — Diplomatic Zone",
    location: "Wuse Zone 2, Abuja",
    type: "Wall Drape / Wrap",
    size: "40ft × 30ft",
    price: "₦3,100,000",
    period: "/ month",
    image: "https://images.unsplash.com/photo-1580746738099-b05b7b10a3f9?w=600&q=80",
    views: "980K",
    badge: "Hot Deal",
    badgeColor: "gold" as const,
    rating: 4.7,
    illuminated: false,
    facing: "Single-faced",
  },
  {
    id: 5,
    title: "Trans Amadi Rooftop — GRA",
    location: "Trans Amadi, Port Harcourt",
    type: "Rooftop Billboard",
    size: "36ft × 18ft",
    price: "₦1,900,000",
    period: "/ month",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80",
    views: "1.2M",
    badge: "New",
    badgeColor: "green" as const,
    rating: 4.6,
    illuminated: true,
    facing: "Dual-faced",
  },
  {
    id: 6,
    title: "Ahmadu Bello Way Unipole — CBD",
    location: "Central Business District, Abuja",
    type: "Unipole / Monopole",
    size: "48ft × 24ft",
    price: "₦3,800,000",
    period: "/ month",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    views: "2.0M",
    badge: "Top Pick",
    badgeColor: "gold" as const,
    rating: 4.8,
    illuminated: true,
    facing: "Single-faced",
  },
]

export function TopDeals() {
  const [liked, setLiked] = useState<Set<number>>(new Set())

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-5">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Top Listings</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
              Featured{" "}
              <span className="text-orange-gradient">Billboard</span>{" "}
              Deals
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Hand-picked premium outdoor advertising locations with the highest traffic and brand visibility across Nigeria.
            </p>
          </div>
          <Link href="/billboards" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-300 flex-shrink-0">
            View All Billboards <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Link key={deal.id} href={`/billboards/${deal.id}`}>
              <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/10 hover:border-primary/25 transition-all duration-400 hover-lift cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <Badge variant={deal.badgeColor}>{deal.badge}</Badge>
                  </div>

                  <button onClick={(e) => toggleLike(deal.id, e)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${liked.has(deal.id) ? "bg-red-500 text-white shadow-lg" : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white"}`}>
                    <Heart className={`h-4 w-4 ${liked.has(deal.id) ? "fill-current" : ""}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold">
                    <Eye className="h-3.5 w-3.5" /> {deal.views} daily views
                  </div>

                  {deal.illuminated && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                      <Zap className="h-3 w-3 text-yellow-300" />
                      <span className="text-xs text-white font-medium">Lit</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <span className="inline-block text-xs font-semibold text-primary bg-primary/8 rounded-full px-3 py-0.5 mb-3">
                    {deal.type}
                  </span>

                  <h3 className="font-bold text-foreground text-lg leading-snug group-hover:text-primary transition-colors mb-1">
                    {deal.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" /> {deal.location}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Size</div>
                      <div className="text-xs font-bold text-foreground mt-0.5">{deal.size}</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Facing</div>
                      <div className="text-xs font-bold text-foreground mt-0.5">{deal.facing}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <span className="text-xl font-black text-primary">{deal.price}</span>
                      <span className="text-xs text-muted-foreground ml-1">{deal.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-foreground">{deal.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/billboards"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300"
            style={{ background: "#D4541E" }}>
            Browse All 2,000+ Billboards <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

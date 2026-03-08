"use client"

import { useEffect, useRef, useState } from "react"
import {
  ShieldCheck, Map, BarChart3, Headphones, Zap, Search, Clock, Award,
} from "lucide-react"

const features = [
  {
    icon: Map,
    title: "Nationwide Coverage",
    description: "Access 2,000+ verified billboard locations across all 36 states and FCT — from Lagos Island to Sokoto metropolis.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description: "Every location is physically inspected. No phantom billboards — what you see is what you get on the ground.",
  },
  {
    icon: BarChart3,
    title: "Traffic Analytics",
    description: "Daily impressions data, demographic breakdowns, and visibility scores help you pick the highest-impact spots.",
  },
  {
    icon: Search,
    title: "Smart Filtering",
    description: "Filter by state, area, billboard type, size, price range, and illumination to find exactly what your campaign needs.",
  },
  {
    icon: Zap,
    title: "Fast Booking",
    description: "Go from discovery to confirmed booking in under 24 hours. Our team handles all vendor negotiations for you.",
  },
  {
    icon: Clock,
    title: "Real-time Availability",
    description: "Live availability calendar ensures you never book a spot that's already taken. Updated daily.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "A dedicated account manager is assigned to every campaign — from site selection through installation and monitoring.",
  },
  {
    icon: Award,
    title: "Trusted by Top Brands",
    description: "500+ brands from MTN and Dangote to startups trust LMC to amplify their outdoor presence across Nigeria.",
  },
]

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-card shadow-sm mb-5">
            <Award className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Why Landscape Media</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight mb-4">
            Everything You Need to{" "}
            <span className="text-orange-gradient">Run OOH Ads</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We&apos;ve built the most complete outdoor advertising platform in Nigeria — so you spend less time searching and more time reaching your audience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group relative p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-400 hover-lift cursor-default overflow-hidden ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 60}ms`, transitionDuration: "600ms" }}
              >
                <div className="absolute left-0 top-5 bottom-5 w-0.5 rounded-r-full bg-orange-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

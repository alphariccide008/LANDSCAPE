"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Award, Users, MapPin, TrendingUp, Monitor } from "lucide-react"

const pillars = [
  {
    icon: Award,
    title: "Premium Locations",
    description: "Hand-picked high-traffic sites across Lagos expressways, island corridors, and major junctions.",
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    description: "Data-backed impression counts, traffic analytics, and demographic targeting for every site.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced media planners, creative strategists, and on-ground installation crews.",
  },
  {
    icon: MapPin,
    title: "Nationwide Reach",
    description: "Coverage across all 36 states — from Lagos to Abuja, Kano, Port Harcourt, and beyond.",
  },
]

const values = [
  "Premium billboard sites on Lekki-Epe Expressway",
  "LED digital screens with 24/7 content management",
  "Unipoles and monopoles on major highways",
  "Transit shelter advertising across Lagos BRT routes",
  "Dedicated account manager for every campaign",
  "Campaign performance reports with verified impressions",
]

export function AboutSection() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [leftVisible, setLeftVisible] = useState(false)
  const [rightVisible, setRightVisible] = useState(false)

  useEffect(() => {
    const obs1 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setLeftVisible(true) },
      { threshold: 0.15 }
    )
    const obs2 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRightVisible(true) },
      { threshold: 0.15 }
    )
    if (leftRef.current) obs1.observe(leftRef.current)
    if (rightRef.current) obs2.observe(rightRef.current)
    return () => { obs1.disconnect(); obs2.disconnect() }
  }, [])

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative gold arc */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border-[60px] border-primary/5" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full border-[50px] border-accent/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Images mosaic */}
          <div
            ref={leftRef}
            className={`relative transition-all duration-1000 ${
              leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large image */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden h-64 sm:h-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                  alt="Lagos billboard"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Small images */}
              <div className="relative rounded-2xl overflow-hidden h-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&q=80"
                  alt="Outdoor advertising"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80"
                  alt="City advertising"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 glass-gold rounded-2xl p-5 shadow-2xl animate-float">
              <div className="text-3xl font-black text-primary counter-value">15+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Years of Excellence
              </div>
              <div className="mt-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-sm">★</span>
                ))}
              </div>
            </div>

            {/* Gold decorative element */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gold-gradient opacity-20 blur-2xl animate-pulse" />
          </div>

          {/* Right — Content */}
          <div
            ref={rightRef}
            className={`transition-all duration-1000 delay-200 ${
              rightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 mb-6">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                About LMC
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight mb-6">
              Nigeria&apos;s Most Trusted{" "}
              <span className="text-orange-gradient">OOH Media Company</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Founded in Lagos, Landscape Media Concept (LMC) has grown into one of Nigeria&apos;s leading
              outdoor advertising companies. We connect brands to millions of Nigerians through strategically
              placed billboards, LED screens, and transit media.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              From a single unipole on Lekki Expressway to nationwide multi-format campaigns,
              our commitment to high-impact, data-driven outdoor advertising has never wavered.
              Every site is a stage — and your brand is the star.
            </p>

            {/* Values checklist */}
            <ul className="space-y-3 mb-8">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{value}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button variant="gold" size="lg" className="rounded-full" asChild>
                <Link href="/about">
                  Our Full Story <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link href="/contact">Work With Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

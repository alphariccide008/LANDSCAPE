"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Monitor,
  Columns,
  Layers,
  LayoutDashboard,
  Bus,
  Building2,
  Plane,
  BarChart3,
  ArrowRight,
} from "lucide-react"

const services = [
  {
    icon: Monitor,
    title: "LED Digital Screens",
    description:
      "High-definition LED displays that deliver dynamic, eye-catching content in the highest-traffic corridors of Nigeria's cities.",
    href: "/services/led-screens",
    color: "from-blue-500/15 to-blue-600/5",
    features: ["Full HD & 4K options", "Remote content updates", "Day & night visibility"],
  },
  {
    icon: Columns,
    title: "Unipoles & Monopoles",
    description:
      "Nigeria's most iconic billboard format. Towering single-pole structures for maximum roadside dominance and brand presence.",
    href: "/services/unipoles",
    color: "from-amber-500/15 to-amber-600/5",
    features: ["Heights up to 60ft", "Dual & single faced", "Illuminated options"],
  },
  {
    icon: Layers,
    title: "Wall Drapes & Wraps",
    description:
      "Massive building-scale vinyl wraps that transform entire facades into unmissable brand statements in dense urban areas.",
    href: "/services/wall-drapes",
    color: "from-purple-500/15 to-purple-600/5",
    features: ["Custom dimensions", "Weather-resistant vinyl", "Full-colour print"],
  },
  {
    icon: LayoutDashboard,
    title: "Gantry & Bridge Signs",
    description:
      "Overhead gantry structures spanning major highways and bridges — capturing both directions of high-speed traffic.",
    href: "/services/gantry",
    color: "from-rose-500/15 to-rose-600/5",
    features: ["Highway-spec structure", "Multi-panel options", "High-impact placement"],
  },
  {
    icon: Bus,
    title: "Transit & Bus Shelters",
    description:
      "Street-level advertising panels in bus shelters and transit hubs. Daily reach to millions of urban commuters.",
    href: "/services/transit",
    color: "from-teal-500/15 to-teal-600/5",
    features: ["Backlit panels", "High dwell time", "Dense urban coverage"],
  },
  {
    icon: Building2,
    title: "Rooftop Billboards",
    description:
      "Elevated rooftop structures that cut through cluttered skylines and deliver premium brand visibility across city blocks.",
    href: "/services/rooftop",
    color: "from-green-500/15 to-green-600/5",
    features: ["360° visibility", "Steel-reinforced", "Illuminated options"],
  },
  {
    icon: Plane,
    title: "Airport Advertising",
    description:
      "Premium placements at major Nigerian airports — reaching high-income travellers, executives, and diaspora audiences.",
    href: "/services/airport",
    color: "from-sky-500/15 to-sky-600/5",
    features: ["Arrivals & departures", "Lightboxes & digital", "Guaranteed dwell time"],
  },
  {
    icon: BarChart3,
    title: "Campaign Management",
    description:
      "End-to-end OOH campaign planning — from site selection and booking to installation monitoring and performance reporting.",
    href: "/services/campaigns",
    color: "from-orange-500/15 to-orange-600/5",
    features: ["Multi-site campaigns", "Proof of posting", "Analytics reports"],
  },
]

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const Icon = service.icon

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative bg-card border border-border rounded-2xl p-6 transition-all duration-700 hover-float card-shine cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Gold top border */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />

      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {service.description}
        </p>

        <ul className="space-y-1.5 mb-5">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
              {feat}
            </li>
          ))}
        </ul>

        <Link
          href={service.href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
        >
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const headRef = useRef<HTMLDivElement>(null)
  const [headVisible, setHeadVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadVisible(true) },
      { threshold: 0.2 }
    )
    if (headRef.current) observer.observe(headRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/4 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/4 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        {/* Header */}
        <div
          ref={headRef}
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-800 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 mb-5">
            <Monitor className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-5 leading-tight">
            Every Format of{" "}
            <span className="text-gold-gradient">Outdoor Advertising</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From towering unipoles to dynamic LED screens — we offer every format of out-of-home advertising
            to put your brand in front of millions across Nigeria.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 text-sm"
          >
            Explore All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

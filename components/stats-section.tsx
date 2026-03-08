"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp } from "lucide-react"

const stats = [
  { target: 2000, suffix: "+", label: "Billboard Locations", description: "Across Nigeria" },
  { target: 98, suffix: "%", label: "Client Satisfaction", description: "Based on reviews" },
  { target: 36, suffix: "", label: "States Covered", description: "All 36 + FCT" },
  { target: 500, suffix: "+", label: "Brands Served", description: "From SMEs to multinationals" },
  { target: 30, suffix: "+", label: "OOH Formats", description: "Every format available" },
  { target: 500, suffix: "M+", label: "Monthly Impressions", description: "Combined reach" },
]

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, isVisible, duration])
  return count
}

function StatCard({ stat, index, isVisible }: { stat: (typeof stats)[0]; index: number; isVisible: boolean }) {
  const count = useCountUp(stat.target, isVisible)

  return (
    <div
      className={`relative group bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Orange top accent */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-orange-gradient rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="text-5xl sm:text-6xl font-black text-primary counter-value leading-none mb-3">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-base font-bold text-foreground">{stat.label}</div>
      <div className="text-sm text-muted-foreground mt-1">{stat.description}</div>
    </div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/6 blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div
          className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-card shadow-sm mb-5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Our Impact</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground">
            Numbers That Tell Our{" "}
            <span className="text-orange-gradient">Story</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Years of connecting Nigerian brands to millions of people through strategic outdoor advertising.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>

        <div
          className={`mt-16 text-center max-w-3xl mx-auto transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="border-l-4 border-primary pl-6 text-left inline-block">
            <blockquote className="text-lg sm:text-xl italic text-muted-foreground leading-relaxed">
              &ldquo;The right billboard in the right location doesn&apos;t just sell a product — it builds a brand that lasts.&rdquo;
            </blockquote>
            <div className="mt-3 text-sm text-primary font-semibold">— Landscape Media Concept</div>
          </div>
        </div>
      </div>
    </section>
  )
}

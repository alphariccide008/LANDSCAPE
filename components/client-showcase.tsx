"use client"

import { useEffect, useRef, useState } from "react"

const clients = [
  { name: "Eko Hotels & Suites", abbr: "EKO" },
  { name: "Julius Berger Nigeria", abbr: "JBN" },
  { name: "Dangote Group", abbr: "DAN" },
  { name: "GTBank PLC", abbr: "GTB" },
  { name: "LASG Properties", abbr: "LSG" },
  { name: "First Bank Nigeria", abbr: "FBN" },
  { name: "Zenith Bank PLC", abbr: "ZNB" },
  { name: "UAC Properties", abbr: "UAC" },
  { name: "Nestoil Limited", abbr: "NST" },
  { name: "Chevron Nigeria", abbr: "CVX" },
  { name: "Shell Nigeria", abbr: "SHN" },
  { name: "Access Bank PLC", abbr: "AXS" },
]

export function ClientShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-14 sm:py-16 bg-muted/30 border-y border-border relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            Trusted by Nigeria&apos;s Leading Organizations
          </p>
        </div>

        {/* Infinite scroll track */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll-infinite pause-animation w-max">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex-shrink-0 group cursor-pointer min-w-[180px]"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-black text-white">{client.abbr}</span>
                </div>
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

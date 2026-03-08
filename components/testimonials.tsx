"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Tunde Adesanya",
    role: "Head of Marketing, MTN Nigeria",
    location: "Lagos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    text: "LMC's site selection for our Q4 campaign was exceptional. The Lekki Expressway unipoles delivered over 2 million verified impressions in the first week. They made the entire process — from booking to installation — seamless.",
    rating: 5,
    campaign: "MTN Nigeria — Q4 2025 Drive",
  },
  {
    id: 2,
    name: "Chioma Okafor",
    role: "Brand Manager, Dangote Cement",
    location: "Lagos & Kano",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&q=80",
    text: "We needed nationwide coverage fast — 36 states in 30 days. Landscape Media Concept delivered exactly that, with real-time proof-of-posting reports for every site. The quality of their locations is consistently premium.",
    rating: 5,
    campaign: "Dangote Cement — National Rollout",
  },
  {
    id: 3,
    name: "Emeka Nwosu",
    role: "Marketing Director, GTBank PLC",
    location: "Abuja & Lagos",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    text: "The Victoria Island LED screen campaign we ran through LMC generated massive walk-in traffic to our branches. Their analytics reporting was thorough and the team was proactive throughout the entire campaign window.",
    rating: 5,
    campaign: "GTBank — LED Screen Campaign, VI",
  },
  {
    id: 4,
    name: "Fatima Bello",
    role: "Communications Lead, Airtel Nigeria",
    location: "Lagos",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80",
    text: "LMC gave us the best billboard placements on the Airport Road corridor — and the gantry sign above Mafoluku was a masterstroke. Commuters talked about it online. Brand recall was off the charts.",
    rating: 5,
    campaign: "Airtel — Airport Road Gantry Campaign",
  },
  {
    id: 5,
    name: "Babatunde Ojo",
    role: "Senior Manager, Zenith Bank",
    location: "Lagos",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    text: "We've worked with several OOH agencies over the years. LMC stands apart in how they understand our audience. They don't just sell us spaces — they craft media plans that actually move business results.",
    rating: 5,
    campaign: "Zenith Bank — Multi-format Campaign",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((p) => (p + 1) % testimonials.length)

  const handleDragStart = (clientX: number) => { setDragging(true); setDragStart(clientX) }
  const handleDragEnd = (clientX: number) => {
    if (!dragging) return
    const diff = dragStart - clientX
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev() }
    setDragging(false)
  }

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 mb-5">
            <Quote className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Client Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-5">
            Brands That <span className="text-orange-gradient">Trust Us</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real results from Nigeria's leading brands who chose Landscape Media Concept for their outdoor campaigns.
          </p>
        </div>

        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        >
          <div className="relative bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/5 overflow-hidden">
            <div className="absolute top-0 left-8 right-8 h-1 bg-orange-gradient rounded-full" />
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="h-20 w-20 text-primary" />
            </div>

            <div key={current} className="animate-fade-in">
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">★</span>
                ))}
              </div>

              <blockquote className="text-xl sm:text-2xl text-foreground leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={testimonials[current].image} alt={testimonials[current].name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary border-2 border-card flex items-center justify-center">
                    <span className="text-[6px] text-white font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-foreground">{testimonials[current].name}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
                  <div className="text-xs text-primary font-medium mt-0.5">{testimonials[current].location}</div>
                </div>
                <div className="ml-auto hidden sm:block">
                  <div className="text-xs text-muted-foreground">Campaign</div>
                  <div className="text-sm font-semibold text-foreground">{testimonials[current].campaign}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-border hover:bg-primary/40"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
          {testimonials.slice(0, 3).map((t, i) => (
            <button key={t.id} onClick={() => setCurrent(i)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 ${current === i ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
            >
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, si) => <span key={si} className="text-primary text-xs">★</span>)}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{t.text}</p>
              <div className="mt-2 text-xs font-semibold text-foreground">{t.name}</div>
              <div className="text-[10px] text-muted-foreground">{t.role}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

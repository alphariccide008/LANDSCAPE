"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react"

const slides = [
  {
    id: 1,
    tag: "Lagos · Victoria Island · Lekki",
    title: "Own Every",
    highlight: "Lagos Street.",
    description:
      "2,000+ premium billboard locations across Lagos — from Lekki Expressway to Ikeja Along. Book verified sites and launch your campaign in days.",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1800&q=85",
  },
  {
    id: 2,
    tag: "Ikeja · Oshodi · Apapa",
    title: "Maximum Reach,",
    highlight: "Zero Guesswork.",
    description:
      "Every site comes with verified daily impressions, traffic analytics, and demographic data — so every naira of your ad spend works harder.",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1800&q=85",
  },
  {
    id: 3,
    tag: "Abuja · Port Harcourt · Kano",
    title: "Nationwide Scale,",
    highlight: "Local Precision.",
    description:
      "Unipoles, LED screens, wall drapes, gantries, transit shelters — every OOH format in every major Nigerian city, managed from one platform.",
    image: "https://images.unsplash.com/photo-1580746738099-b05b7b10a3f9?w=1800&q=85",
  },
]

const stats = [
  { value: "2,000+", label: "Prime Locations" },
  { value: "36", label: "States Covered" },
  { value: "500+", label: "Brands Served" },
  { value: "500M+", label: "Monthly Impressions" },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
  }

  useEffect(() => {
    startAutoPlay()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const goTo = (index: number) => {
    if (animating || index === current) return
    setAnimating(true)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 800)
    startAutoPlay()
  }

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  const padNum = (n: number) => String(n + 1).padStart(2, "0")

  return (
    <section className="relative h-screen min-h-[680px] max-h-[1000px] overflow-hidden bg-black text-white flex flex-col">

      {/* ── Background images ── */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            style={{
              transform: i === current ? "scale(1.04)" : "scale(1)",
              transition: "transform 6s ease-out",
            }}
          />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
      ))}

      {/* ── Thin orange top accent line ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20" style={{ background: "linear-gradient(90deg, #D4541E, #E8793A, transparent)" }} />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-4">

          {/* Location tag */}
          <div
            key={`tag-${current}`}
            className="flex items-center gap-2 mb-6 animate-fade-in"
          >
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#D4541E" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
              {slides[current].tag}
            </span>
          </div>

          {/* Headline */}
          <div className="mb-6 overflow-hidden">
            <h1
              key={`title-${current}`}
              className="text-[clamp(2.8rem,6.5vw,5.8rem)] font-black leading-[1.0] tracking-tight text-white animate-slide-up"
            >
              {slides[current].title}
            </h1>
            <h1
              key={`hl-${current}`}
              className="text-[clamp(2.8rem,6.5vw,5.8rem)] font-black leading-[1.0] tracking-tight animate-slide-up stagger-2"
              style={{
                background: "linear-gradient(135deg, #F0956A, #D4541E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {slides[current].highlight}
            </h1>
          </div>

          {/* Divider accent */}
          <div className="w-12 h-0.5 mb-6 rounded-full" style={{ background: "#D4541E" }} />

          {/* Description */}
          <p
            key={`desc-${current}`}
            className="text-base sm:text-lg text-white/65 max-w-xl leading-relaxed mb-10 animate-fade-in-up stagger-3 font-light"
          >
            {slides[current].description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up stagger-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 h-13 px-7 rounded-full font-semibold text-sm text-white transition-all duration-300 group"
              style={{ background: "#D4541E" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#b8431a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#D4541E")}
            >
              Request a Media Plan
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/billboards"
              className="inline-flex items-center gap-2 h-13 px-7 rounded-full font-semibold text-sm text-white/80 border border-white/25 hover:border-white/60 hover:text-white transition-all duration-300"
            >
              Browse All Locations
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative z-10 w-full border-t border-white/10" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-5 grid grid-cols-2 sm:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col py-1 ${i < stats.length - 1 ? "sm:border-r border-white/10 sm:pr-6 sm:mr-6" : ""} ${i > 0 ? "sm:pl-0 pl-4" : ""}`}
            >
              <span
                className="text-2xl sm:text-3xl font-black leading-none counter-value"
                style={{ color: "#D4541E" }}
              >
                {stat.value}
              </span>
              <span className="text-[11px] text-white/45 uppercase tracking-wider mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom controls bar ── */}
      <div
        className="relative z-10 flex items-center justify-between w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-5"
      >
        {/* Slide counter */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-sm font-bold text-white">{padNum(current)}</span>
          <span className="w-8 h-px bg-white/30" />
          <span className="text-sm text-white/35">{padNum(slides.length - 1)}</span>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-500 rounded-full focus:outline-none"
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                background: i === current ? "#D4541E" : "rgba(255,255,255,0.30)",
              }}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white/60 hover:text-white transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:opacity-80"
            style={{ background: "#D4541E" }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

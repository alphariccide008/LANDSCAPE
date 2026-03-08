"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react"

function LMCIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#D4541E" strokeWidth="2.2" fill="rgba(212,84,30,0.12)" />
      <circle cx="2" cy="20" r="3.2" fill="#D4541E" />
      <text x="20" y="24.5" textAnchor="middle" fill="#D4541E" fontSize="11" fontWeight="800" fontFamily="Poppins, sans-serif" letterSpacing="0.5">LMC</text>
    </svg>
  )
}

const services = [
  { label: "LED Digital Screens", href: "/services/led-screens" },
  { label: "Unipoles & Monopoles", href: "/services/unipoles" },
  { label: "Wall Drapes & Wraps", href: "/services/wall-drapes" },
  { label: "Gantry & Bridge Signs", href: "/services/gantry" },
  { label: "Transit & Bus Shelters", href: "/services/transit" },
  { label: "Rooftop Billboards", href: "/services/rooftop" },
  { label: "Airport Advertising", href: "/services/airport" },
  { label: "Campaign Management", href: "/services/campaigns" },
]

const locations = [
  { label: "Billboards in Lagos", href: "/billboards?state=Lagos" },
  { label: "Billboards in Abuja", href: "/billboards?state=Abuja" },
  { label: "Billboards in Port Harcourt", href: "/billboards?state=Rivers" },
  { label: "Billboards in Kano", href: "/billboards?state=Kano" },
  { label: "Billboards in Benin City", href: "/billboards?state=Edo" },
  { label: "All States", href: "/billboards" },
]

const company = [
  { label: "About Us", href: "/about" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
]

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail("") }
  }

  return (
    <footer style={{ background: "#0F0A06" }} className="text-white/50 relative overflow-hidden">
      {/* Orange top border */}
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #D4541E, #E8793A, transparent)" }} />

      {/* Soft glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,84,30,0.06), transparent)", filter: "blur(80px)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">

          {/* Brand column — spans 2 cols */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <LMCIcon />
              <div>
                <span className="text-xl font-black text-white">
                  land<span style={{ color: "#D4541E" }}>scape</span>
                </span>
                <div className="text-[9px] text-white/30 tracking-widest uppercase">Media Concept</div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-white/40 mb-6 max-w-xs">
              Nigeria's leading outdoor advertising company. Premium billboards, LED screens, and OOH media
              across Lagos and all 36 states.
            </p>

            <div className="space-y-2.5 mb-6">
              {[
                { icon: MapPin, text: "36, Fadunsi Str., Oke-Ira, Ogba, Lagos" },
                { icon: Mail, text: "landscapemedia23@yahoo.com" },
                { icon: Phone, text: "+234 902 821 5501" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5 hover:text-white transition-colors group cursor-pointer">
                  <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#D4541E" }} />
                  <span className="text-xs leading-relaxed">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 text-white/40 hover:text-white hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#D4541E"; (e.currentTarget as HTMLElement).style.borderColor = "#D4541E" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)" }}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Our Services</h3>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/40 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block" style={{}}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Locations</h3>
            <ul className="space-y-2.5">
              {locations.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/40 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Stay Updated</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              Get OOH market insights, new billboard listings, and campaign tips straight to your inbox.
            </p>

            {subscribed ? (
              <div className="rounded-xl p-4 text-center" style={{ border: "1px solid rgba(212,84,30,0.3)", background: "rgba(212,84,30,0.08)" }}>
                <div className="text-2xl mb-1">✓</div>
                <p className="text-sm font-semibold" style={{ color: "#D4541E" }}>You&apos;re subscribed!</p>
                <p className="text-xs text-white/30 mt-1">Welcome to LMC Insider.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full h-11 px-4 rounded-xl text-white placeholder:text-white/25 focus:outline-none text-sm transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#D4541E")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                  style={{ background: "#D4541E" }}
                >
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { val: "2,000+", lbl: "Billboards" },
                { val: "500+", lbl: "Brands Served" },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-lg font-black" style={{ color: "#D4541E" }}>{val}</div>
                  <div className="text-xs text-white/30 mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs text-white/25">
            © 2026{" "}
            <span className="font-semibold text-white/50">Landscape Media Concept</span>. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-white/25 hover:text-white/60 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

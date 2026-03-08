"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Menu,
  X,
  ChevronDown,
  Monitor,
  Building2,
  Columns,
  LayoutDashboard,
  Bus,
  Layers,
  Plane,
  MapPin,
} from "lucide-react"

function LMCLogo({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="20" cy="20" r="18" stroke="#D4541E" strokeWidth="2.2" fill="white" />
      {/* Small accent dot on left edge */}
      <circle cx="2" cy="20" r="3.2" fill="#D4541E" />
      {/* LMC text */}
      <text
        x="20"
        y="24.5"
        textAnchor="middle"
        fill="#D4541E"
        fontSize="11"
        fontWeight="800"
        fontFamily="Poppins, sans-serif"
        letterSpacing="0.5"
      >
        LMC
      </text>
    </svg>
  )
}

const services = [
  { name: "LED Digital Screens", href: "/services/led-screens", icon: Monitor },
  { name: "Unipoles / Monopoles", href: "/services/unipoles", icon: Columns },
  { name: "Wall Drapes & Wraps", href: "/services/wall-drapes", icon: Layers },
  { name: "Gantry / Bridge Signs", href: "/services/gantry", icon: LayoutDashboard },
  { name: "Transit & Bus Shelters", href: "/services/transit", icon: Bus },
  { name: "Rooftop Billboards", href: "/services/rooftop", icon: Building2 },
  { name: "Airport Advertising", href: "/services/airport", icon: Plane },
  { name: "Campaign Management", href: "/services/campaigns", icon: MapPin },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) =>
    `text-sm font-medium tracking-wide transition-all duration-300 gold-underline pb-1 ${
      isActive(href) ? "text-primary" : "text-muted-foreground hover:text-primary"
    }`

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-2xl border-b border-border shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1400px]">
        <div className="flex h-18 sm:h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <LMCLogo size={40} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight text-foreground">
                land<span className="text-primary">scape</span>
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Media Concept
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/billboards" className={linkClass("/billboards")}>Billboards</Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-all duration-300 pb-1 ${
                  pathname.startsWith("/services") ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mega Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] transition-all duration-300 ${
                  servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-card border border-border rounded-2xl shadow-2xl shadow-black/10 p-4 overflow-hidden">
                  {/* Gold accent bar */}
                  <div className="h-0.5 w-full bg-gold-gradient rounded-full mb-4" />
                  <div className="grid grid-cols-2 gap-1">
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/8 group transition-all duration-200"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {service.name}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <Link
                      href="/services"
                      className="flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/about" className={linkClass("/about")}>About</Link>
            <Link href="/blog" className={linkClass("/blog")}>Blog</Link>
            <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="gold" size="sm" asChild className="rounded-full px-6">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-slide-down">
            <nav className="space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/billboards", label: "Billboards" },
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile services accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname.startsWith("/services")
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-1 ml-4 space-y-1 animate-slide-down">
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200"
                        >
                          <Icon className="h-4 w-4 text-primary" />
                          {service.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </nav>

            <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3 px-4">
              <Button variant="gold" asChild className="rounded-full w-full">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

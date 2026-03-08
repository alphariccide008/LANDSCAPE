"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Monitor } from "lucide-react"

const perks = [
  "Free media plan consultation",
  "Verified site selection & availability check",
  "No-obligation campaign quote",
  "Response within 24 hours",
]

export function CTASection() {
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
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6">
              <Monitor className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Start Your Campaign</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-5">
              Ready to Put Your Brand{" "}
              <span className="text-orange-gradient">On Every Street?</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Talk to our media planning team today. We&apos;ll identify the best billboard locations for your target audience,
              handle the booking, and manage the installation — end to end.
            </p>

            <ul className="space-y-3 mb-10">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3 mb-10">
              {[
                { icon: Phone, label: "+234 902 821 5501", href: "tel:+2349028215501" },
                { icon: Mail, label: "landscapemedia23@yahoo.com", href: "mailto:landscapemedia23@yahoo.com" },
                { icon: MapPin, label: "36, Fadunsi Str., Oke-Ira, Ogba, Lagos", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 h-13 px-8 rounded-full font-bold text-sm text-white transition-all shadow-lg shadow-primary/20"
                style={{ background: "#D4541E" }}
              >
                Request a Media Plan <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/billboards"
                className="inline-flex items-center gap-2 h-13 px-8 rounded-full font-bold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Browse Billboards
              </Link>
            </div>
          </div>

          {/* Right — Quote form */}
          <div className={`transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-sm">
              <div className="h-1 bg-orange-gradient rounded-full mb-8 -mt-1 -mx-1" />

              <h3 className="text-2xl font-bold text-foreground mb-2">Get a Free Quote</h3>
              <p className="text-sm text-muted-foreground mb-6">Fill in the details and our team will respond within 24 hours.</p>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {["First Name", "Last Name"].map((label) => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{label}</label>
                      <input
                        type="text"
                        placeholder={label === "First Name" ? "Adaora" : "Eze"}
                        className="w-full h-11 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="adaora@yourbrand.com"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Campaign Type</label>
                  <select className="w-full h-11 px-4 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm">
                    <option value="">Select campaign type</option>
                    <option value="unipole">Unipole / Monopole</option>
                    <option value="led">LED Digital Screen</option>
                    <option value="wall">Wall Drape / Wrap</option>
                    <option value="gantry">Gantry / Bridge Sign</option>
                    <option value="transit">Transit Shelter</option>
                    <option value="rooftop">Rooftop Billboard</option>
                    <option value="multi">Multi-format Campaign</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Target State / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Lekki, Lagos"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Campaign Brief</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your brand, target audience, and budget range..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md shadow-primary/20"
                  style={{ background: "#D4541E" }}
                >
                  Submit Request <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Layers, BarChart3, Zap, Monitor } from "lucide-react"

const billboardTypes = [
  "Unipole / Monopole",
  "LED Digital Screen",
  "Wall Drape / Wrap",
  "Gantry / Bridge",
  "Transit / Bus Shelter",
  "Rooftop Billboard",
  "Lamp Post Banner",
  "Airport Advertising",
  "Mall / Indoor",
  "Mobile Billboard",
]

const nigeriaStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
]

const highlights = [
  { icon: MapPin, value: "2,000+", label: "Premium Locations" },
  { icon: Layers, value: "30+", label: "Billboard Types" },
  { icon: BarChart3, value: "36", label: "States Covered" },
  { icon: Zap, value: "500+", label: "Brands Served" },
]

export function BillboardSearch() {
  const router = useRouter()
  const [type, setType] = useState("")
  const [state, setState] = useState("")
  const [area, setArea] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (type) params.append("type", type)
    if (state) params.append("state", state)
    if (area) params.append("area", area)
    router.push(`/billboards${params.toString() ? `?${params.toString()}` : ""}`)
  }

  return (
    <section id="search" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/4 blur-[120px]" />
      <div className="absolute inset-0 pattern-dots opacity-25" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1400px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-6">
              <Monitor className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Billboard Finder</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-5">
              Search Through{" "}
              <span className="text-orange-gradient">2,000+</span>{" "}
              Billboards Across Nigeria
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Find the perfect outdoor advertising spot — filter by type, state, or area.
              We cover every major city and route in Nigeria.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, value, label }) => (
                <div key={label} className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/25 hover:shadow-md transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-black text-foreground">{value}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Search Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/8 rounded-3xl blur-2xl scale-95" />
            <div className="relative bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/5">
              <div className="h-1 bg-orange-gradient rounded-full mb-8 -mt-1 -mx-1" />

              <h3 className="text-2xl font-black text-foreground mb-1">Find Billboards</h3>
              <p className="text-sm text-muted-foreground mb-7">Select your preferences to discover available locations</p>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    <Layers className="h-3.5 w-3.5 text-primary" /> Billboard Type
                  </label>
                  <select value={type} onChange={(e) => setType(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm">
                    <option value="">Select billboard type</option>
                    {billboardTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> State
                  </label>
                  <select value={state} onChange={(e) => setState(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm">
                    <option value="">Select state</option>
                    {nigeriaStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    <Search className="h-3.5 w-3.5 text-primary" /> Area / Location
                  </label>
                  <input type="text" value={area} onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Victoria Island, Ikeja"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm" />
                </div>

                <button onClick={handleSearch}
                  className="w-full h-14 rounded-xl text-white font-bold text-base flex items-center justify-center gap-3 hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 mt-2"
                  style={{ background: "#D4541E" }}>
                  <Search className="h-5 w-5" /> Search Billboards
                </button>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-5">
                Trusted by <span className="text-primary font-bold">500+</span> brands across Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

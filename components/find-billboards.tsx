import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

const locations = [
  {
    name: "Lagos",
    count: 1006,
    description: "Nigeria's commercial capital — highest OOH density in the country",
    href: "/billboards?state=Lagos",
    highlight: true,
  },
  {
    name: "FCT — Abuja",
    count: 324,
    description: "Premium placements in the nation's capital for high-value audiences",
    href: "/billboards?state=Abuja",
    highlight: false,
  },
  {
    name: "Rivers",
    count: 239,
    description: "High-traffic routes across Port Harcourt and surroundings",
    href: "/billboards?state=Rivers",
    highlight: false,
  },
  {
    name: "Edo — Benin",
    count: 126,
    description: "Strategic spots in Benin City's key commercial corridors",
    href: "/billboards?state=Edo",
    highlight: false,
  },
  {
    name: "Kano",
    count: 102,
    description: "Reaching millions across the Northern Nigeria market",
    href: "/billboards?state=Kano",
    highlight: false,
  },
  {
    name: "Cross River",
    count: 65,
    description: "Impactful locations in Calabar and surrounding areas",
    href: "/billboards?state=CrossRiver",
    highlight: false,
  },
]

export function FindBillboards() {
  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-card shadow-sm mb-5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">By Location</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
              Find Billboards in{" "}
              <span className="text-orange-gradient">Nigeria</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Strategically positioned billboard locations across Nigeria's most active commercial cities and corridors.
            </p>
          </div>
          <Link
            href="/billboards"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-300 flex-shrink-0"
          >
            View All States <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((loc) => (
            <Link key={loc.name} href={loc.href}>
              <div
                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover-lift cursor-pointer overflow-hidden bg-card ${
                  loc.highlight
                    ? "border-primary/25 shadow-md"
                    : "border-border shadow-sm hover:border-primary/20 hover:shadow-md"
                }`}
              >
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-orange-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {loc.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Most Popular</span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                      {loc.name}
                    </h3>
                    <p className="text-2xl font-black text-primary counter-value">
                      {loc.count.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-1">billboards</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{loc.description}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Click to browse</span>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-foreground">Don&apos;t see your state?</h4>
            <p className="text-sm text-muted-foreground mt-0.5">We cover all 36 states + FCT across Nigeria</p>
          </div>
          <Link
            href="/billboards"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-primary/20 flex-shrink-0"
            style={{ background: "#D4541E" }}
          >
            Browse All States <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ImageIcon,
  MapPin,
  BarChart3,
  MessageSquare,
  Plus,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Menu,
  ArrowRight,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

// ── Types ──────────────────────────────────────────────
interface Billboard {
  id: number
  name: string
  location: string
  state: string
  type: string
  status: "Available" | "Booked" | "Under Maintenance"
  price: number
  impressions: string
}

interface Enquiry {
  id: number
  brand: string
  contact: string
  type: string
  state: string
  date: string
  status: "New" | "In Progress" | "Closed"
}

// ── Mock Data ──────────────────────────────────────────
const billboards: Billboard[] = [
  { id: 1, name: "Lekki-Epe Expressway Unipole (KM 14)", location: "Lekki Phase 2", state: "Lagos", type: "Unipole", status: "Booked", price: 2400000, impressions: "85,000/day" },
  { id: 2, name: "Victoria Island LED Screen — Ahmadu Bello", location: "Victoria Island", state: "Lagos", type: "LED Screen", status: "Available", price: 4800000, impressions: "120,000/day" },
  { id: 3, name: "Airport Road Gantry — Mafoluku", location: "Oshodi", state: "Lagos", type: "Gantry", status: "Available", price: 3200000, impressions: "95,000/day" },
  { id: 4, name: "Wuse II Wall Drape — Diplomatic Zone", location: "Wuse II", state: "Abuja", type: "Wall Drape", status: "Booked", price: 1800000, impressions: "42,000/day" },
  { id: 5, name: "Aba Road Rooftop — GRA Phase 2", location: "GRA Phase 2", state: "Rivers", type: "Rooftop", status: "Under Maintenance", price: 1200000, impressions: "38,000/day" },
  { id: 6, name: "Kano City Gate Unipole", location: "City Gate", state: "Kano", type: "Unipole", status: "Available", price: 900000, impressions: "55,000/day" },
]

const enquiries: Enquiry[] = [
  { id: 1, brand: "MTN Nigeria", contact: "campaigns@mtn.ng", type: "LED Screen", state: "Lagos", date: "Mar 06, 2026", status: "In Progress" },
  { id: 2, brand: "Zenith Bank PLC", contact: "marketing@zenithbank.com", type: "Multi-format", state: "Lagos & Abuja", date: "Mar 05, 2026", status: "New" },
  { id: 3, brand: "Dangote Cement", contact: "brand@dangote.com", type: "Unipole", state: "Kano", date: "Mar 04, 2026", status: "New" },
  { id: 4, brand: "Airtel Nigeria", contact: "ooh@airtel.ng", type: "Gantry", state: "Lagos", date: "Mar 02, 2026", status: "Closed" },
  { id: 5, brand: "GTBank PLC", contact: "comms@gtbank.com", type: "Wall Drape", state: "Abuja", date: "Mar 01, 2026", status: "In Progress" },
]

const kpis = [
  { label: "Total Billboards", value: "2,148", change: "+12", up: true, icon: ImageIcon, href: "/admin/billboards" },
  { label: "Available Now", value: "847", change: "+34", up: true, icon: CheckCircle, href: "/admin/billboards" },
  { label: "Active Campaigns", value: "312", change: "+8", up: true, icon: TrendingUp, href: "/admin/campaigns" },
  { label: "New Enquiries", value: "27", change: "+5", up: true, icon: MessageSquare, href: "/admin/enquiries" },
]

const statusColor: Record<string, string> = {
  Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Booked: "bg-primary/15 text-primary border-primary/25",
  "Under Maintenance": "bg-amber-500/15 text-amber-400 border-amber-500/25",
  New: "bg-primary/15 text-primary border-primary/25",
  "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Closed: "bg-muted text-muted-foreground border-border",
}

// ── Main Page ──────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("lmc_admin_auth") !== "true") {
      router.replace("/admin/login")
    } else {
      setAuthed(true)
    }
  }, [router])

  if (!authed) return null

  const filtered = billboards.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase()) ||
      b.state.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen" style={{ background: "#0A0705", fontFamily: "Poppins, sans-serif" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active="dashboard" />

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-64">

        {/* Topbar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
          style={{ background: "rgba(10,7,5,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-white">Dashboard</h1>
              <p className="text-xs text-white/30">Landscape Media Concept — Admin</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-xl text-sm text-white/40"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Search className="h-3.5 w-3.5" />
              <input
                type="text"
                placeholder="Search billboards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white placeholder:text-white/25 text-xs w-44"
              />
            </div>
            {/* Bell */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#D4541E" }} />
            </button>
            {/* Avatar */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#D4541E" }}>A</div>
              <span className="text-xs font-medium hidden sm:block">Admin</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon
              return (
                <Link
                  key={kpi.label}
                  href={kpi.href}
                  className="rounded-2xl p-5 block group transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200" style={{ background: "rgba(212,84,30,0.12)" }}>
                      <Icon className="h-4.5 w-4.5" style={{ color: "#D4541E" }} />
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${kpi.up ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}
                    >
                      {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {kpi.change}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white">{kpi.value}</div>
                  <div className="text-xs text-white/35 mt-1 font-medium group-hover:text-white/55 transition-colors">{kpi.label}</div>
                </Link>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Billboards Table — spans 2 cols */}
            <div
              className="lg:col-span-2 rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Table header */}
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <h2 className="text-sm font-bold text-white">Billboard Inventory</h2>
                  <p className="text-xs text-white/30 mt-0.5">{filtered.length} locations</p>
                </div>
                <Link
                  href="/admin/billboards"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                  style={{ background: "#D4541E" }}
                >
                  <Plus className="h-3.5 w-3.5" /> Add Billboard
                </Link>
              </div>

              {/* Rows */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      {["Name & Location", "Type", "State", "Price / Month", "Impressions", "Status"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/25">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b, i) => (
                      <tr
                        key={b.id}
                        onClick={() => router.push(`/admin/billboards/${b.id}/edit`)}
                        className="transition-colors hover:bg-white/[0.04] cursor-pointer"
                        style={i < filtered.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.04)" } : {}}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-white text-xs leading-snug max-w-[220px]">{b.name}</div>
                          <div className="text-white/30 text-xs mt-0.5 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />{b.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-white/50">{b.type}</td>
                        <td className="px-6 py-4 text-xs text-white/50">{b.state}</td>
                        <td className="px-6 py-4 text-xs font-semibold text-white">
                          ₦{b.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-xs text-white/50 flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />{b.impressions}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColor[b.status]}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-3 flex items-center justify-end" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Link href="/admin/billboards" className="text-xs font-semibold flex items-center gap-1.5 hover:underline" style={{ color: "#D4541E" }}>
                  View all billboards <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Enquiries Panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <h2 className="text-sm font-bold text-white">Recent Enquiries</h2>
                  <p className="text-xs text-white/30 mt-0.5">Latest quote requests</p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(212,84,30,0.15)", color: "#D4541E" }}>
                  {enquiries.filter((e) => e.status === "New").length} new
                </span>
              </div>

              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                {enquiries.map((enq) => (
                  <Link key={enq.id} href="/admin/enquiries" className="block px-5 py-4 hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-white leading-snug">{enq.brand}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${statusColor[enq.status]}`}>
                        {enq.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-white/35 mb-1">{enq.type} · {enq.state}</div>
                    <div className="flex items-center gap-1 text-[11px] text-white/25">
                      <Clock className="h-3 w-3" />{enq.date}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Link href="/admin/enquiries" className="text-xs font-semibold flex items-center gap-1.5 hover:underline" style={{ color: "#D4541E" }}>
                  View all enquiries <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h2 className="text-sm font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Plus, label: "Add Billboard", href: "/admin/billboards/new" },
                { icon: MapPin, label: "Add Location", href: "/admin/locations" },
                { icon: BarChart3, label: "View Reports", href: "/admin/campaigns" },
                { icon: MessageSquare, label: "Check Enquiries", href: "/admin/enquiries" },
              ].map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium text-white/50 hover:text-white transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,84,30,0.12)" }}>
                    <Icon className="h-4 w-4" style={{ color: "#D4541E" }} />
                  </div>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-2 text-xs text-white/20">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            All systems operational · Last updated: Mar 07, 2026
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  MapPin, Plus, Search, Bell, ChevronDown, Menu,
  Pencil, Trash2, Eye, Filter, ChevronLeft, ChevronRight,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

// ── Types ──────────────────────────────────────────────
interface Billboard {
  id: number
  name: string
  location: string
  state: string
  type: string
  size: string
  price: number
  impressions: string
  status: "Available" | "Booked" | "Under Maintenance"
  facing: string
  illuminated: boolean
}

// ── Mock Data ──────────────────────────────────────────
const allBillboards: Billboard[] = [
  { id: 1, name: "Lekki-Epe Expressway Unipole (KM 14)", location: "Lekki Phase 1", state: "Lagos", type: "Unipole", size: "48ft × 24ft", price: 4200000, impressions: "85,000/day", status: "Booked", facing: "Dual-faced", illuminated: true },
  { id: 2, name: "Adeola Odeku LED Screen", location: "Victoria Island", state: "Lagos", type: "LED Screen", size: "20ft × 10ft", price: 2800000, impressions: "120,000/day", status: "Available", facing: "Single-faced", illuminated: true },
  { id: 3, name: "Airport Road Gantry — Mafoluku", location: "Ikeja Along", state: "Lagos", type: "Gantry", size: "60ft × 15ft", price: 6500000, impressions: "95,000/day", status: "Available", facing: "Overhead", illuminated: true },
  { id: 4, name: "Wuse 2 Wall Drape", location: "Wuse Zone 2", state: "Abuja", type: "Wall Drape", size: "40ft × 30ft", price: 3100000, impressions: "42,000/day", status: "Booked", facing: "Single-faced", illuminated: false },
  { id: 5, name: "Trans Amadi Rooftop — GRA", location: "Trans Amadi", state: "Rivers", type: "Rooftop", size: "36ft × 18ft", price: 1900000, impressions: "38,000/day", status: "Under Maintenance", facing: "Dual-faced", illuminated: true },
  { id: 6, name: "Ahmadu Bello Way Unipole", location: "CBD", state: "Abuja", type: "Unipole", size: "48ft × 24ft", price: 3800000, impressions: "55,000/day", status: "Available", facing: "Single-faced", illuminated: true },
  { id: 7, name: "Kano City Gate Unipole", location: "City Gate", state: "Kano", type: "Unipole", size: "36ft × 18ft", price: 900000, impressions: "55,000/day", status: "Available", facing: "Dual-faced", illuminated: false },
  { id: 8, name: "Benin Ring Road LED", location: "Ring Road", state: "Edo", type: "LED Screen", size: "16ft × 8ft", price: 1200000, impressions: "30,000/day", status: "Available", facing: "Single-faced", illuminated: true },
  { id: 9, name: "Calabar Marina Wall Drape", location: "Marina", state: "Cross River", type: "Wall Drape", size: "50ft × 25ft", price: 850000, impressions: "22,000/day", status: "Booked", facing: "Single-faced", illuminated: false },
  { id: 10, name: "Oshodi Bus Shelter — 12 Panels", location: "Oshodi", state: "Lagos", type: "Transit Shelter", size: "6ft × 4ft each", price: 1600000, impressions: "68,000/day", status: "Available", facing: "Street-level", illuminated: true },
  { id: 11, name: "Ikeja GRA Rooftop", location: "GRA Ikeja", state: "Lagos", type: "Rooftop", size: "30ft × 15ft", price: 2100000, impressions: "40,000/day", status: "Available", facing: "Dual-faced", illuminated: true },
  { id: 12, name: "PH Rumuola Flyover Gantry", location: "Rumuola", state: "Rivers", type: "Gantry", size: "60ft × 12ft", price: 2400000, impressions: "62,000/day", status: "Booked", facing: "Overhead", illuminated: true },
]

const statusColor: Record<string, string> = {
  Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Booked: "bg-primary/15 text-primary border-primary/25",
  "Under Maintenance": "bg-amber-500/15 text-amber-400 border-amber-500/25",
}

const PAGE_SIZE = 8

// ── Main ───────────────────────────────────────────────
export default function BillboardsPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    if (localStorage.getItem("lmc_admin_auth") !== "true") {
      router.replace("/admin/login")
    } else {
      setAuthed(true)
    }
  }, [router])

  if (!authed) return null

  const types = ["All", ...Array.from(new Set(allBillboards.map((b) => b.type)))]
  const statuses = ["All", "Available", "Booked", "Under Maintenance"]

  const filtered = allBillboards.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase()) ||
      b.state.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || b.status === statusFilter
    const matchType = typeFilter === "All" || b.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = (id: number) => {
    setDeleteId(id)
    setTimeout(() => setDeleteId(null), 2000)
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#0A0705", fontFamily: "Poppins, sans-serif" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active="billboards" />

      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
          style={{ background: "rgba(10,7,5,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-white">Billboards</h1>
              <p className="text-xs text-white/30">Manage your billboard inventory</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#D4541E" }} />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#D4541E" }}>A</div>
              <span className="text-xs font-medium hidden sm:block">Admin</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-5">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-white/40 text-sm">
              <span className="text-white font-semibold">{filtered.length}</span> billboards found
            </div>
            <Link href="/admin/billboards/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "#D4541E" }}>
              <Plus className="h-4 w-4" /> Add New Billboard
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3"
            style={{ padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {/* Search */}
            <div className="flex items-center gap-2 flex-1 h-10 px-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Search className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
              <input type="text" placeholder="Search by name, location, or state..."
                value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="bg-transparent outline-none text-white placeholder:text-white/25 text-xs flex-1" />
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2 h-10 px-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Filter className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
                className="bg-transparent outline-none text-white text-xs cursor-pointer">
                {statuses.map((s) => <option key={s} value={s} style={{ background: "#1a0e05" }}>{s}</option>)}
              </select>
            </div>

            {/* Type filter */}
            <div className="flex items-center gap-2 h-10 px-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Filter className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
              <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1) }}
                className="bg-transparent outline-none text-white text-xs cursor-pointer">
                {types.map((t) => <option key={t} value={t} style={{ background: "#1a0e05" }}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["#", "Name & Location", "Type", "Size", "Impressions", "Price / Month", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/25">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-16 text-white/25 text-sm">
                        No billboards match your filters.
                      </td>
                    </tr>
                  ) : paginated.map((b, i) => (
                    <tr key={b.id} className="transition-colors hover:bg-white/[0.02]"
                      style={i < paginated.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.04)" } : {}}>
                      <td className="px-5 py-4 text-white/25 text-xs">{b.id}</td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white text-xs leading-snug max-w-[200px]">{b.name}</div>
                        <div className="text-white/30 text-xs mt-0.5 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />{b.location}, {b.state}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-white/50">{b.type}</td>
                      <td className="px-5 py-4 text-xs text-white/50">{b.size}</td>
                      <td className="px-5 py-4 text-xs text-white/50 flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" />{b.impressions}
                      </td>
                      <td className="px-5 py-4 text-xs font-bold text-white">₦{b.price.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColor[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/billboards/${b.id}/edit`}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                            style={{ background: "rgba(255,255,255,0.06)" }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                          <button onClick={() => handleDelete(b.id)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${deleteId === b.id ? "bg-red-500/20 text-red-400" : "text-white/40 hover:text-red-400"}`}
                            style={{ background: deleteId === b.id ? undefined : "rgba(255,255,255,0.06)" }}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-xs text-white/30">
                  Page {page} of {totalPages} · {filtered.length} results
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white disabled:opacity-30 transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button key={n} onClick={() => setPage(n)}
                      className="w-8 h-8 rounded-lg text-xs font-bold transition-colors"
                      style={n === page
                        ? { background: "#D4541E", color: "#fff" }
                        : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                      {n}
                    </button>
                  ))}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white disabled:opacity-30 transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

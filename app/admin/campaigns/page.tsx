"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bell, Menu, Search, Plus, Eye,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

interface Campaign {
  id: number
  client: string
  brand: string
  sites: number
  startDate: string
  endDate: string
  value: number
  status: "Active" | "Completed" | "Pending" | "Paused"
  type: string
}

const campaigns: Campaign[] = [
  { id: 1, client: "MTN Nigeria", brand: "MTN Pulse", sites: 8, startDate: "Jan 2026", endDate: "Mar 2026", value: 38400000, status: "Active", type: "Unipole + LED" },
  { id: 2, client: "Dangote Group", brand: "Dangote Cement", sites: 12, startDate: "Nov 2025", endDate: "Jan 2026", value: 52000000, status: "Completed", type: "Gantry + Unipole" },
  { id: 3, client: "GTBank", brand: "GTBank Corporate", sites: 5, startDate: "Feb 2026", endDate: "Apr 2026", value: 22500000, status: "Active", type: "LED Screen" },
  { id: 4, client: "Airtel Nigeria", brand: "Airtel SmartTalk", sites: 10, startDate: "Mar 2026", endDate: "Jun 2026", value: 44000000, status: "Pending", type: "Unipole" },
  { id: 5, client: "Zenith Bank", brand: "Zenith Bank Retail", sites: 6, startDate: "Dec 2025", endDate: "Feb 2026", value: 28800000, status: "Completed", type: "Unipole + Gantry" },
  { id: 6, client: "Shoprite Nigeria", brand: "Shoprite Grand Opening", sites: 4, startDate: "Jan 2026", endDate: "Feb 2026", value: 9600000, status: "Completed", type: "Wall Drape + LED" },
  { id: 7, client: "Nigerian Breweries", brand: "Star Lager", sites: 7, startDate: "Feb 2026", endDate: "May 2026", value: 18200000, status: "Active", type: "Transit + LED" },
  { id: 8, client: "Access Bank", brand: "Access Bank DiamondXtra", sites: 3, startDate: "Mar 2026", endDate: "Mar 2026", value: 7500000, status: "Paused", type: "LED Screen" },
  { id: 9, client: "Indomie Nigeria", brand: "Indomie New Flavour", sites: 9, startDate: "Apr 2026", endDate: "Jun 2026", value: 19800000, status: "Pending", type: "Rooftop + Unipole" },
  { id: 10, client: "DSTV Nigeria", brand: "GOtv Campaigns", sites: 11, startDate: "Jan 2026", endDate: "Apr 2026", value: 33000000, status: "Active", type: "Gantry + Unipole" },
]

const statusStyle: Record<string, { bg: string; color: string }> = {
  Active: { bg: "rgba(52,211,153,0.12)", color: "#34d399" },
  Completed: { bg: "rgba(148,163,184,0.1)", color: "#94a3b8" },
  Pending: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
  Paused: { bg: "rgba(251,113,133,0.12)", color: "#fb7185" },
}

export default function CampaignsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    if (!localStorage.getItem("lmc_admin_auth")) router.push("/admin/login")
  }, [router])

  const filtered = campaigns.filter(c => {
    const matchSearch = `${c.client} ${c.brand} ${c.type}`.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalValue = campaigns.filter(c => c.status === "Active").reduce((s, c) => s + c.value, 0)
  const active = campaigns.filter(c => c.status === "Active").length
  const pending = campaigns.filter(c => c.status === "Pending").length

  return (
    <div className="min-h-screen" style={{ background: "#0A0705", fontFamily: "Poppins, sans-serif" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active="campaigns" />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4" style={{ background: "rgba(10,7,5,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
            <h1 className="text-base font-bold text-white">Campaigns</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Bell className="h-4 w-4" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#D4541E" }}>A</div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-2xl font-black" style={{ color: "#D4541E" }}>₦{(totalValue / 1000000).toFixed(0)}M</div>
              <div className="text-xs text-white/40 mt-1">Active Revenue</div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-2xl font-black text-emerald-400">{active}</div>
              <div className="text-xs text-white/40 mt-1">Active Campaigns</div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-2xl font-black text-amber-400">{pending}</div>
              <div className="text-xs text-white/40 mt-1">Pending Approval</div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search client or brand..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-xl text-white text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#D4541E")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="h-10 px-3 rounded-xl text-white text-sm focus:outline-none cursor-pointer"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {["All","Active","Completed","Pending","Paused"].map(s => (
                  <option key={s} value={s} style={{ background: "#1a1007" }}>{s}</option>
                ))}
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 h-10 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all" style={{ background: "#D4541E" }}>
              <Plus className="h-4 w-4" /> New Campaign
            </button>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Client", "Brand / Campaign", "Type", "Sites", "Period", "Value (₦)", "Status", ""].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold text-white/35 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => {
                    const st = statusStyle[c.status]
                    return (
                      <tr
                        key={c.id}
                        style={{
                          background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                        className="hover:bg-white/[0.025] transition-colors"
                      >
                        <td className="px-5 py-3.5 font-semibold text-white whitespace-nowrap">{c.client}</td>
                        <td className="px-5 py-3.5 text-white/60 whitespace-nowrap">{c.brand}</td>
                        <td className="px-5 py-3.5 text-white/45 text-xs whitespace-nowrap">{c.type}</td>
                        <td className="px-5 py-3.5 text-white font-bold">{c.sites}</td>
                        <td className="px-5 py-3.5 text-white/45 text-xs whitespace-nowrap">{c.startDate} – {c.endDate}</td>
                        <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">₦{(c.value / 1000000).toFixed(1)}M</td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ background: st.bg, color: st.color, borderColor: st.color + "40" }}>{c.status}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-white/30 text-sm">No campaigns match your filters.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bell, Menu, Search, Plus,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

const locations = [
  { id: 1, state: "Lagos", city: "Lekki", zone: "Lekki-Epe Corridor", billboards: 14, available: 6, booked: 7, maintenance: 1 },
  { id: 2, state: "Lagos", city: "Victoria Island", zone: "VI Business District", billboards: 9, available: 4, booked: 5, maintenance: 0 },
  { id: 3, state: "Lagos", city: "Ikeja", zone: "Ikeja Industrial", billboards: 11, available: 5, booked: 5, maintenance: 1 },
  { id: 4, state: "Lagos", city: "Oshodi", zone: "Oshodi Transit Hub", billboards: 7, available: 3, booked: 3, maintenance: 1 },
  { id: 5, state: "Lagos", city: "Surulere", zone: "Surulere Residential", billboards: 5, available: 2, booked: 3, maintenance: 0 },
  { id: 6, state: "Abuja", city: "Wuse", zone: "Wuse Zone 2 & CBD", billboards: 8, available: 4, booked: 4, maintenance: 0 },
  { id: 7, state: "Abuja", city: "Garki", zone: "Garki II", billboards: 6, available: 3, booked: 2, maintenance: 1 },
  { id: 8, state: "Abuja", city: "Maitama", zone: "Maitama Diplomatic Zone", billboards: 4, available: 2, booked: 2, maintenance: 0 },
  { id: 9, state: "Rivers", city: "Port Harcourt", zone: "PH GRA & Rumuola", billboards: 10, available: 4, booked: 5, maintenance: 1 },
  { id: 10, state: "Kano", city: "Kano", zone: "Kano City Centre", billboards: 6, available: 4, booked: 2, maintenance: 0 },
  { id: 11, state: "Oyo", city: "Ibadan", zone: "Ibadan Dugbe", billboards: 5, available: 3, booked: 2, maintenance: 0 },
  { id: 12, state: "Edo", city: "Benin City", zone: "Ring Road", billboards: 4, available: 3, booked: 1, maintenance: 0 },
  { id: 13, state: "Cross River", city: "Calabar", zone: "Calabar Marina", billboards: 3, available: 1, booked: 2, maintenance: 0 },
]

export default function LocationsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!localStorage.getItem("lmc_admin_auth")) router.push("/admin/login")
  }, [router])

  const filtered = locations.filter(l =>
    `${l.state} ${l.city} ${l.zone}`.toLowerCase().includes(search.toLowerCase())
  )

  const totalBillboards = locations.reduce((s, l) => s + l.billboards, 0)
  const totalAvailable = locations.reduce((s, l) => s + l.available, 0)
  const totalBooked = locations.reduce((s, l) => s + l.booked, 0)

  return (
    <div className="min-h-screen" style={{ background: "#0A0705", fontFamily: "Poppins, sans-serif" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active="locations" />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4" style={{ background: "rgba(10,7,5,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
            <h1 className="text-base font-bold text-white">Locations</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Bell className="h-4 w-4" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#D4541E" }}>A</div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Sites", value: totalBillboards, color: "#D4541E" },
              { label: "Available", value: totalAvailable, color: "#34d399" },
              { label: "Booked", value: totalBooked, color: "#fb923c" },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search state, city, zone..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl text-white text-sm focus:outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#D4541E")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 h-10 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "#D4541E" }}
            >
              <Plus className="h-4 w-4" /> Add Location
            </button>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["State", "City", "Zone / Area", "Total Sites", "Available", "Booked", "Maintenance"].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold text-white/35 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((loc, i) => (
                    <tr
                      key={loc.id}
                      style={{
                        background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                      className="hover:bg-white/[0.025] transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: "rgba(212,84,30,0.12)", color: "#D4541E" }}>{loc.state}</span>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-white">{loc.city}</td>
                      <td className="px-5 py-3.5 text-white/50">{loc.zone}</td>
                      <td className="px-5 py-3.5 font-bold text-white">{loc.billboards}</td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: "rgba(52,211,153,0.12)", color: "#34d399" }}>{loc.available}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: "rgba(212,84,30,0.12)", color: "#fb923c" }}>{loc.booked}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        {loc.maintenance > 0 ? (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>{loc.maintenance}</span>
                        ) : (
                          <span className="text-white/20 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-white/30 text-sm">No locations match your search.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

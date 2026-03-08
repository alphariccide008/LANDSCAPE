"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import {
  Bell, Menu, ChevronLeft, Save,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

const allBillboards = [
  { id: 1, name: "Lekki-Epe Expressway Unipole (KM 14)", location: "Lekki Phase 1", state: "Lagos", type: "Unipole", size: "48ft × 24ft", price: 4200000, impressions: "85,000/day", status: "Booked", facing: "Dual-faced", illuminated: true, notes: "" },
  { id: 2, name: "Adeola Odeku LED Screen", location: "Victoria Island", state: "Lagos", type: "LED Screen", size: "20ft × 10ft", price: 2800000, impressions: "120,000/day", status: "Available", facing: "Single-faced", illuminated: true, notes: "" },
  { id: 3, name: "Airport Road Gantry — Mafoluku", location: "Ikeja Along", state: "Lagos", type: "Gantry", size: "60ft × 15ft", price: 6500000, impressions: "95,000/day", status: "Available", facing: "Overhead", illuminated: true, notes: "" },
  { id: 4, name: "Wuse 2 Wall Drape", location: "Wuse Zone 2", state: "Abuja", type: "Wall Drape", size: "40ft × 30ft", price: 3100000, impressions: "42,000/day", status: "Booked", facing: "Single-faced", illuminated: false, notes: "" },
  { id: 5, name: "Trans Amadi Rooftop — GRA", location: "Trans Amadi", state: "Rivers", type: "Rooftop", size: "36ft × 18ft", price: 1900000, impressions: "38,000/day", status: "Under Maintenance", facing: "Dual-faced", illuminated: true, notes: "Scheduled repair until end of month." },
  { id: 6, name: "Ahmadu Bello Way Unipole", location: "CBD", state: "Abuja", type: "Unipole", size: "48ft × 24ft", price: 3800000, impressions: "55,000/day", status: "Available", facing: "Single-faced", illuminated: true, notes: "" },
  { id: 7, name: "Kano City Gate Unipole", location: "City Gate", state: "Kano", type: "Unipole", size: "36ft × 18ft", price: 900000, impressions: "55,000/day", status: "Available", facing: "Dual-faced", illuminated: false, notes: "" },
  { id: 8, name: "Benin Ring Road LED", location: "Ring Road", state: "Edo", type: "LED Screen", size: "16ft × 8ft", price: 1200000, impressions: "30,000/day", status: "Available", facing: "Single-faced", illuminated: true, notes: "" },
  { id: 9, name: "Calabar Marina Wall Drape", location: "Marina", state: "Cross River", type: "Wall Drape", size: "50ft × 25ft", price: 850000, impressions: "22,000/day", status: "Booked", facing: "Single-faced", illuminated: false, notes: "" },
  { id: 10, name: "Oshodi Bus Shelter — 12 Panels", location: "Oshodi", state: "Lagos", type: "Transit Shelter", size: "6ft × 4ft each", price: 1600000, impressions: "68,000/day", status: "Available", facing: "Street-level", illuminated: true, notes: "" },
  { id: 11, name: "Ikeja GRA Rooftop", location: "GRA Ikeja", state: "Lagos", type: "Rooftop", size: "30ft × 15ft", price: 2100000, impressions: "40,000/day", status: "Available", facing: "Dual-faced", illuminated: true, notes: "" },
  { id: 12, name: "PH Rumuola Flyover Gantry", location: "Rumuola", state: "Rivers", type: "Gantry", size: "60ft × 12ft", price: 2400000, impressions: "62,000/day", status: "Booked", facing: "Overhead", illuminated: true, notes: "" },
]

const STATES = ["Lagos","Abuja","Rivers","Kano","Oyo","Kaduna","Enugu","Delta","Anambra","Edo","Ondo","Kwara","Ogun","Osun","Ekiti","Cross River","Akwa Ibom","Imo","Abia","Benue"]
const TYPES = ["Unipole","LED Screen","Gantry","Wall Drape","Rooftop","Transit Shelter","Airport","Monopole"]
const FACINGS = ["Single-faced","Dual-faced","Overhead","Street-level","360°"]

export default function EditBillboardPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const [form, setForm] = useState({
    name: "", location: "", state: "Lagos", type: "Unipole",
    size: "", price: "", impressions: "", facing: "Single-faced",
    illuminated: false, status: "Available", notes: "",
  })

  useEffect(() => {
    if (!localStorage.getItem("lmc_admin_auth")) { router.push("/admin/login"); return }
    const billboard = allBillboards.find(b => b.id === id)
    if (!billboard) { setNotFound(true); return }
    setForm({
      name: billboard.name,
      location: billboard.location,
      state: billboard.state,
      type: billboard.type,
      size: billboard.size,
      price: String(billboard.price),
      impressions: billboard.impressions,
      facing: billboard.facing,
      illuminated: billboard.illuminated,
      status: billboard.status,
      notes: billboard.notes,
    })
  }, [router, id])

  const set = (field: string, value: string | boolean) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => router.push("/admin/billboards"), 1000) }, 900)
  }

  const inputCls = "w-full h-10 px-3 rounded-xl text-white text-sm focus:outline-none transition-colors"
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "Poppins, sans-serif" }
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "#D4541E")
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
  const labelCls = "block text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5"

  return (
    <div className="min-h-screen" style={{ background: "#0A0705", fontFamily: "Poppins, sans-serif" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active="billboards" />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4" style={{ background: "rgba(10,7,5,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Link href="/admin/billboards" className="hover:text-white/70 transition-colors">Billboards</Link>
              <span>/</span>
              <span className="text-white/70">Edit #{id}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Bell className="h-4 w-4" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#D4541E" }}>A</div>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/billboards" className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-white">Edit Billboard <span style={{ color: "#D4541E" }}>#{id}</span></h1>
              <p className="text-xs text-white/35 mt-0.5">Update the details for this OOH site</p>
            </div>
          </div>

          {notFound ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-white/50 text-sm">Billboard #{id} not found.</p>
              <Link href="/admin/billboards" className="mt-4 inline-block text-sm font-semibold" style={{ color: "#D4541E" }}>← Back to Billboards</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Basic Information</h2>
                <div>
                  <label className={labelCls}>Billboard Name / Title</label>
                  <input className={inputCls} style={inputStyle} placeholder="e.g. Lekki-Epe Expressway Unipole (KM 14)" value={form.name} onChange={e => set("name", e.target.value)} onFocus={focusStyle} onBlur={blurStyle} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Location / Landmark</label>
                    <input className={inputCls} style={inputStyle} placeholder="e.g. Lekki Phase 1" value={form.location} onChange={e => set("location", e.target.value)} onFocus={focusStyle} onBlur={blurStyle} required />
                  </div>
                  <div>
                    <label className={labelCls}>State</label>
                    <select className={`${inputCls} cursor-pointer`} style={inputStyle} value={form.state} onChange={e => set("state", e.target.value)} onFocus={focusStyle} onBlur={blurStyle}>
                      {STATES.map(s => <option key={s} value={s} style={{ background: "#1a1007" }}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Billboard Type</label>
                    <select className={`${inputCls} cursor-pointer`} style={inputStyle} value={form.type} onChange={e => set("type", e.target.value)} onFocus={focusStyle} onBlur={blurStyle}>
                      {TYPES.map(t => <option key={t} value={t} style={{ background: "#1a1007" }}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Size (ft)</label>
                    <input className={inputCls} style={inputStyle} placeholder="e.g. 48ft × 24ft" value={form.size} onChange={e => set("size", e.target.value)} onFocus={focusStyle} onBlur={blurStyle} required />
                  </div>
                  <div>
                    <label className={labelCls}>Facing Direction</label>
                    <select className={`${inputCls} cursor-pointer`} style={inputStyle} value={form.facing} onChange={e => set("facing", e.target.value)} onFocus={focusStyle} onBlur={blurStyle}>
                      {FACINGS.map(f => <option key={f} value={f} style={{ background: "#1a1007" }}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Daily Impressions</label>
                    <input className={inputCls} style={inputStyle} placeholder="e.g. 85,000/day" value={form.impressions} onChange={e => set("impressions", e.target.value)} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => set("illuminated", !form.illuminated)}
                    className="w-11 h-6 rounded-full relative transition-colors duration-200"
                    style={{ background: form.illuminated ? "#D4541E" : "rgba(255,255,255,0.1)" }}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.illuminated ? "left-6" : "left-1"}`} />
                  </button>
                  <span className="text-sm text-white/60">Illuminated / Backlit</span>
                </div>
              </div>

              <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Pricing & Availability</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Monthly Rate (₦)</label>
                    <input type="number" className={inputCls} style={inputStyle} placeholder="e.g. 4200000" value={form.price} onChange={e => set("price", e.target.value)} onFocus={focusStyle} onBlur={blurStyle} required />
                  </div>
                  <div>
                    <label className={labelCls}>Status</label>
                    <select className={`${inputCls} cursor-pointer`} style={inputStyle} value={form.status} onChange={e => set("status", e.target.value)} onFocus={focusStyle} onBlur={blurStyle}>
                      <option value="Available" style={{ background: "#1a1007" }}>Available</option>
                      <option value="Booked" style={{ background: "#1a1007" }}>Booked</option>
                      <option value="Under Maintenance" style={{ background: "#1a1007" }}>Under Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <label className={labelCls}>Internal Notes (optional)</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none transition-colors resize-none"
                  style={inputStyle}
                  placeholder="Any additional notes about this site..."
                  value={form.notes}
                  onChange={e => set("notes", e.target.value)}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || saved}
                  className="flex items-center gap-2.5 px-6 h-11 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-70"
                  style={{ background: "#D4541E" }}
                >
                  {saving ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : saved ? (
                    <><Save className="h-4 w-4" /> Saved!</>
                  ) : (
                    <><Save className="h-4 w-4" /> Update Billboard</>
                  )}
                </button>
                <Link
                  href="/admin/billboards"
                  className="flex items-center gap-2 px-5 h-11 rounded-xl text-white/50 hover:text-white text-sm font-medium transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  Cancel
                </Link>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bell, Menu, ChevronLeft, Save,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

const STATES = ["Lagos","Abuja","Rivers","Kano","Oyo","Kaduna","Enugu","Delta","Anambra","Edo","Ondo","Kwara","Ogun","Osun","Ekiti","Cross River","Akwa Ibom","Imo","Abia","Benue"]
const TYPES = ["Unipole","LED Screen","Gantry","Wall Drape","Rooftop","Transit Shelter","Airport","Monopole"]
const FACINGS = ["Single-faced","Dual-faced","Overhead","Street-level","360°"]

export default function NewBillboardPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    name: "", location: "", state: "Lagos", type: "Unipole",
    size: "", price: "", impressions: "", facing: "Single-faced",
    illuminated: false, status: "Available", notes: "",
  })

  useEffect(() => {
    if (!localStorage.getItem("lmc_admin_auth")) router.push("/admin/login")
  }, [router])

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
              <span className="text-white/70">Add New</span>
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
          {/* Page header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/billboards" className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-white">Add New Billboard</h1>
              <p className="text-xs text-white/35 mt-0.5">Fill in the details to add a new OOH site to inventory</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Card: Basic Info */}
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

            {/* Card: Specs */}
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
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${form.illuminated ? "" : "bg-white/10"}`}
                  style={form.illuminated ? { background: "#D4541E" } : {}}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.illuminated ? "left-6" : "left-1"}`} />
                </button>
                <span className="text-sm text-white/60">Illuminated / Backlit</span>
              </div>
            </div>

            {/* Card: Pricing & Status */}
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

            {/* Card: Notes */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <label className={labelCls}>Internal Notes (optional)</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none transition-colors resize-none"
                style={{ ...inputStyle, height: "auto" }}
                placeholder="Any additional notes about this site..."
                value={form.notes}
                onChange={e => set("notes", e.target.value)}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            {/* Actions */}
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
                  <><Save className="h-4 w-4" /> Save Billboard</>
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
        </main>
      </div>
    </div>
  )
}

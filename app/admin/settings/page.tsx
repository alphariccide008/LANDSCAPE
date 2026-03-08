"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bell, Menu, Save, User, Lock, Mail,
  Phone, Globe, Shield,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

type SaveState = "idle" | "saving" | "saved"

export default function SettingsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [profileSave, setProfileSave] = useState<SaveState>("idle")
  const [passwordSave, setPasswordSave] = useState<SaveState>("idle")

  const [profile, setProfile] = useState({
    name: "Admin", email: "landscapemedia23@yahoo.com",
    phone: "+234 902 821 5501", website: "landscapemediaconcept.com",
  })

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" })
  const [passwordError, setPasswordError] = useState("")

  const [notifications, setNotifications] = useState({
    newEnquiry: true, campaignUpdate: true, weeklyReport: false, systemAlerts: true,
  })

  useEffect(() => {
    if (!localStorage.getItem("lmc_admin_auth")) router.push("/admin/login")
  }, [router])

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSave("saving")
    setTimeout(() => { setProfileSave("saved"); setTimeout(() => setProfileSave("idle"), 2000) }, 800)
  }

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    if (passwords.newPass !== passwords.confirm) { setPasswordError("New passwords do not match."); return }
    if (passwords.newPass.length < 6) { setPasswordError("Password must be at least 6 characters."); return }
    setPasswordSave("saving")
    setTimeout(() => {
      setPasswordSave("saved")
      setPasswords({ current: "", newPass: "", confirm: "" })
      setTimeout(() => setPasswordSave("idle"), 2000)
    }, 800)
  }

  const inputCls = "w-full h-10 px-3 rounded-xl text-white text-sm focus:outline-none transition-colors"
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }
  const focusBorder = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "#D4541E")
  const blurBorder = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
  const labelCls = "block text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5"

  const SaveBtn = ({ state, label }: { state: SaveState; label: string }) => (
    <button
      type="submit"
      disabled={state !== "idle"}
      className="flex items-center gap-2.5 px-5 h-10 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-70"
      style={{ background: state === "saved" ? "#16a34a" : "#D4541E" }}
    >
      {state === "saving" ? (
        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      ) : (
        <><Save className="h-4 w-4" /> {state === "saved" ? "Saved!" : label}</>
      )}
    </button>
  )

  return (
    <div className="min-h-screen" style={{ background: "#0A0705", fontFamily: "Poppins, sans-serif" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active="settings" />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4" style={{ background: "rgba(10,7,5,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
            <h1 className="text-base font-bold text-white">Settings</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Bell className="h-4 w-4" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#D4541E" }}>A</div>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-2xl space-y-5">

          {/* Profile */}
          <form onSubmit={saveProfile} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,84,30,0.15)" }}>
                <User className="h-4 w-4" style={{ color: "#D4541E" }} />
              </div>
              <h2 className="text-sm font-bold text-white">Admin Profile</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Display Name</label>
                  <input className={inputCls} style={inputStyle} value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
                    <input className={`${inputCls} pl-9`} style={inputStyle} value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
                    <input className={`${inputCls} pl-9`} style={inputStyle} value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
                    <input className={`${inputCls} pl-9`} style={inputStyle} value={profile.website} onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} />
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <SaveBtn state={profileSave} label="Save Profile" />
              </div>
            </div>
          </form>

          {/* Password */}
          <form onSubmit={savePassword} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,84,30,0.15)" }}>
                <Lock className="h-4 w-4" style={{ color: "#D4541E" }} />
              </div>
              <h2 className="text-sm font-bold text-white">Change Password</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Current Password</label>
                <input type="password" className={inputCls} style={inputStyle} value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>New Password</label>
                  <input type="password" className={inputCls} style={inputStyle} value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} required />
                </div>
                <div>
                  <label className={labelCls}>Confirm New Password</label>
                  <input type="password" className={inputCls} style={inputStyle} value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} required />
                </div>
              </div>
              {passwordError && (
                <div className="text-xs text-red-400 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>{passwordError}</div>
              )}
              <div className="pt-1">
                <SaveBtn state={passwordSave} label="Update Password" />
              </div>
            </div>
          </form>

          {/* Notifications */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,84,30,0.15)" }}>
                <Bell className="h-4 w-4" style={{ color: "#D4541E" }} />
              </div>
              <h2 className="text-sm font-bold text-white">Notification Preferences</h2>
            </div>
            <div className="space-y-3">
              {[
                { key: "newEnquiry", label: "New Enquiry Received", desc: "Get notified when a new client enquiry comes in" },
                { key: "campaignUpdate", label: "Campaign Updates", desc: "Status changes on active campaigns" },
                { key: "weeklyReport", label: "Weekly Performance Report", desc: "Summary email every Monday" },
                { key: "systemAlerts", label: "System Alerts", desc: "Critical system and security notifications" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-2.5 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div>
                    <div className="text-sm text-white/80 font-medium">{label}</div>
                    <div className="text-xs text-white/35 mt-0.5">{desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                    className="w-11 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0"
                    style={{ background: notifications[key as keyof typeof notifications] ? "#D4541E" : "rgba(255,255,255,0.1)" }}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${notifications[key as keyof typeof notifications] ? "left-6" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.12)" }}>
                <Shield className="h-4 w-4 text-red-400" />
              </div>
              <h2 className="text-sm font-bold text-white">Danger Zone</h2>
            </div>
            <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}>
              <div>
                <div className="text-sm text-red-400 font-medium">Sign Out All Sessions</div>
                <div className="text-xs text-white/35 mt-0.5">Log out of all admin sessions across all devices</div>
              </div>
              <button
                onClick={() => { localStorage.removeItem("lmc_admin_auth"); router.push("/admin/login") }}
                className="px-4 h-9 rounded-xl text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/15"
                style={{ border: "1px solid rgba(239,68,68,0.3)" }}
              >
                Sign Out
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

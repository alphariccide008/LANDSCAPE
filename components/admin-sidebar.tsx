"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard, ImageIcon, MapPin, BarChart3,
  MessageSquare, Settings, LogOut, X,
} from "lucide-react"

type ActivePage = "dashboard" | "billboards" | "locations" | "campaigns" | "enquiries" | "settings"

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
  active: ActivePage
}

const STORAGE_KEY = "lmc_live_chats"

function getLiveUnread(): number {
  try {
    const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    return sessions.reduce((sum: number, s: { unreadByAdmin?: number; messages?: { from: string; read?: boolean }[] }) => {
      // Count unread client messages across all live sessions
      const unread = (s.messages ?? []).filter((m) => m.from === "client" && !m.read).length
      return sum + (s.unreadByAdmin ?? unread)
    }, 0)
  } catch {
    return 0
  }
}

export function AdminSidebar({ open, onClose, active }: AdminSidebarProps) {
  const router = useRouter()
  const [liveUnread, setLiveUnread] = useState(0)

  useEffect(() => {
    setLiveUnread(getLiveUnread())
    const interval = setInterval(() => setLiveUnread(getLiveUnread()), 2000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { key: "dashboard",  icon: LayoutDashboard, label: "Dashboard",  href: "/admin" },
    { key: "billboards", icon: ImageIcon,        label: "Billboards", href: "/admin/billboards" },
    { key: "locations",  icon: MapPin,           label: "Locations",  href: "/admin/locations" },
    { key: "campaigns",  icon: BarChart3,        label: "Campaigns",  href: "/admin/campaigns" },
    { key: "enquiries",  icon: MessageSquare,    label: "Enquiries",  href: "/admin/enquiries", badge: liveUnread },
    { key: "settings",   icon: Settings,         label: "Settings",   href: "/admin/settings" },
  ]

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#0F0A06", borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Logo */}
        <div
          className="px-6 py-6 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="#D4541E" strokeWidth="2.2" fill="rgba(212,84,30,0.1)" />
              <circle cx="2" cy="20" r="3.2" fill="#D4541E" />
              <text
                x="20" y="24.5" textAnchor="middle" fill="#D4541E"
                fontSize="11" fontWeight="800" fontFamily="Poppins, sans-serif" letterSpacing="0.5"
              >
                LMC
              </text>
            </svg>
            <div>
              <div className="text-sm font-black text-white">landscape</div>
              <div className="text-[9px] text-white/30 uppercase tracking-widest">Media Concept</div>
            </div>
          </Link>
          <button className="lg:hidden text-white/40 hover:text-white" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.key === active
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? "" : "text-white/45 hover:text-white/80 hover:bg-white/5"
                }`}
                style={isActive ? { background: "rgba(212,84,30,0.18)", color: "#D4541E" } : {}}
                onClick={onClose}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span
                    className="text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 text-white"
                    style={{ background: "#D4541E" }}
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all mb-1"
          >
            <LogOut className="h-4 w-4 rotate-180" />
            Back to Site
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("lmc_admin_auth")
              router.push("/admin/login")
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

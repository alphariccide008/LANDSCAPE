"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  MessageSquare, Bell, Menu, Search, Send, Phone,
  Mail, MoreVertical, Check, CheckCheck, ArrowLeft, Radio,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

// ── Types ──────────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string | number
  from: "client" | "admin"
  text: string
  time: string
  read?: boolean
  timestamp?: number
}

interface Conversation {
  id: string | number
  name: string
  company: string
  email: string
  phone: string
  service: string
  avatar: string
  online: boolean
  live: boolean        // true = real website visitor
  messages: ChatMessage[]
}

// ── localStorage helpers ────────────────────────────────────────────────────
const STORAGE_KEY = "lmc_live_chats"

interface LiveSession {
  id: string
  name: string
  company: string
  startTime: string
  lastActivity: number
  messages: { id: string; from: "client" | "admin"; text: string; time: string; timestamp: number }[]
  unreadByAdmin: number
}

function getLiveSessions(): LiveSession[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") } catch { return [] }
}

function saveLiveSessions(sessions: LiveSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
}

function nowStr() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
}

// ── Static mock conversations (historical) ─────────────────────────────────
const MOCK_CONVS: Conversation[] = [
  {
    id: 101, name: "Bola Adeyemi", company: "Jumia Nigeria", email: "badeyemi@jumia.com.ng",
    phone: "+234 802 111 4455", service: "LED Screen", avatar: "BA", online: false, live: false,
    messages: [
      { id: 1, from: "client", text: "Hello, we are looking to book LED screen placements across Lagos Island for a 3-month product launch campaign starting April 2026.", time: "Mar 6, 09:14", read: true },
      { id: 2, from: "admin", text: "Hi Bola! Thanks for reaching out. We have excellent LED screens available on Victoria Island and Lekki. Can you share more about your target audience?", time: "Mar 6, 09:32", read: true },
      { id: 3, from: "client", text: "Our target is urban professionals, age 25-45. We want high-traffic spots. What are your daily impression numbers?", time: "Mar 6, 09:48", read: true },
      { id: 4, from: "admin", text: "Our VI LED screen averages 120,000 impressions/day. I'll send you a full proposal shortly.", time: "Mar 6, 10:05", read: true },
      { id: 5, from: "client", text: "That sounds great. Please also include pricing for a combo package — LED + unipole.", time: "Mar 6, 10:20", read: false },
    ],
  },
  {
    id: 102, name: "Emeka Nwachukwu", company: "Sterling Bank", email: "enwachu@sterlingbank.com",
    phone: "+234 803 200 9901", service: "Gantry", avatar: "EN", online: false, live: false,
    messages: [
      { id: 1, from: "client", text: "Good morning. Interested in gantry placements on major Lagos expressways — Third Mainland, Lekki-Epe, and Lagos-Ibadan.", time: "Mar 4, 08:01", read: true },
      { id: 2, from: "client", text: "Urgent — campaign needs to go live by April 1st.", time: "Mar 4, 08:03", read: false },
    ],
  },
  {
    id: 103, name: "Chisom Obi", company: "Chicken Republic", email: "cobi@chickenrepublic.ng",
    phone: "+234 706 344 2200", service: "Unipole", avatar: "CO", online: true, live: false,
    messages: [
      { id: 1, from: "client", text: "We need unipoles in high-traffic areas of Ibadan and Abuja for our new outlet openings. Campaign period is Q2 2026.", time: "Mar 5, 14:20", read: true },
      { id: 2, from: "admin", text: "Hello Chisom! We have prime unipole positions in Ibadan Dugbe and Abuja CBD available for Q2. Let me prepare a site plan for you.", time: "Mar 5, 15:00", read: true },
      { id: 3, from: "client", text: "Perfect, looking forward to it. Can you also include photos of the sites?", time: "Mar 5, 15:18", read: true },
      { id: 4, from: "admin", text: "Absolutely, I'll include site photos, dimensions, daily traffic counts and pricing in the proposal. You'll have it by end of day.", time: "Mar 5, 15:30", read: true },
    ],
  },
  {
    id: 104, name: "Ahmad Suleiman", company: "BUA Group", email: "asuleiman@buagroup.com",
    phone: "+234 706 200 0011", service: "Airport", avatar: "AS", online: false, live: false,
    messages: [
      { id: 1, from: "client", text: "BUA Group would like airport advertising at Kano and Abuja airports for a corporate branding campaign. Please share your airport portfolio.", time: "Mar 1, 16:44", read: false },
    ],
  },
  {
    id: 105, name: "Grace Ukpong", company: "Flour Mills Nigeria", email: "gukpong@flourmills.ng",
    phone: "+234 805 444 3312", service: "Unipole", avatar: "GU", online: true, live: false,
    messages: [
      { id: 1, from: "client", text: "We need unipoles along the PH expressways for our Golden Penny campaign. Can you provide a proposal for 4 sites?", time: "Mar 2, 10:10", read: true },
      { id: 2, from: "admin", text: "Hi Grace! We have 4 excellent sites on PH expressways. Let me pull the details together.", time: "Mar 2, 11:00", read: true },
      { id: 3, from: "client", text: "Thank you. Budget is ₦3M–₦5M/month. Please keep within that range.", time: "Mar 2, 11:22", read: false },
    ],
  },
]

// ── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ av, online, live, size = "md" }: { av: string; online?: boolean; live?: boolean; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-8 h-8 text-[10px]" : "w-10 h-10 text-xs"
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sz} rounded-full flex items-center justify-center font-bold text-white`}
        style={{ background: live ? "linear-gradient(135deg, #059669, #047857)" : "linear-gradient(135deg, #D4541E, #8B2E0A)" }}>
        {av}
      </div>
      {(online !== undefined || live) && (
        <span className="absolute bottom-0 right-0 rounded-full border-2"
          style={{ width: 9, height: 9, borderColor: "#0A0705", background: (live || online) ? "#34d399" : "rgba(255,255,255,0.15)" }} />
      )}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function EnquiriesPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mockConvs, setMockConvs] = useState<Conversation[]>(MOCK_CONVS)
  const [liveConvs, setLiveConvs] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [search, setSearch] = useState("")
  const [input, setInput] = useState("")
  const [mobileView, setMobileView] = useState<"list" | "chat">("list")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!localStorage.getItem("lmc_admin_auth")) router.push("/admin/login")
  }, [router])

  // Poll localStorage for live sessions
  const syncLive = useCallback(() => {
    const sessions = getLiveSessions()
    const convs: Conversation[] = sessions.map(s => ({
      id: s.id,
      name: s.name || "Website Visitor",
      company: s.company || "Website",
      email: "", phone: "",
      service: "Live Chat",
      avatar: initials(s.name || "WV"),
      online: Date.now() - s.lastActivity < 60000, // active within 1 min
      live: true,
      messages: s.messages.map(m => ({
        id: m.id, from: m.from, text: m.text, time: m.time, timestamp: m.timestamp, read: true,
      })),
    }))
    setLiveConvs(convs)
  }, [])

  useEffect(() => {
    syncLive()
    const interval = setInterval(syncLive, 1500)
    return () => clearInterval(interval)
  }, [syncLive])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeId, liveConvs, mockConvs])

  const allConvs: Conversation[] = [...liveConvs, ...mockConvs]
  const filtered = allConvs.filter(c =>
    `${c.name} ${c.company} ${c.service}`.toLowerCase().includes(search.toLowerCase())
  )

  const active = allConvs.find(c => c.id === activeId) ?? null
  const unreadTotal = mockConvs.reduce((s, c) => s + c.messages.filter(m => !m.read && m.from === "client").length, 0)
    + liveConvs.reduce((s, c) => {
      const sess = getLiveSessions().find(ss => ss.id === c.id)
      return s + (sess?.unreadByAdmin ?? 0)
    }, 0)

  const selectConv = (id: string | number) => {
    setActiveId(id)
    setMobileView("chat")
    // Mark mock messages read
    setMockConvs(prev => prev.map(c =>
      c.id === id ? { ...c, messages: c.messages.map(m => ({ ...m, read: true })) } : c
    ))
    // Mark live sessions read
    if (typeof id === "string") {
      const sessions = getLiveSessions()
      const idx = sessions.findIndex(s => s.id === id)
      if (idx >= 0) { sessions[idx].unreadByAdmin = 0; saveLiveSessions(sessions) }
    }
  }

  const sendMessage = () => {
    if (!input.trim() || !activeId) return
    const text = input.trim()
    setInput("")

    if (active?.live && typeof activeId === "string") {
      // Write to localStorage so the customer widget picks it up
      const sessions = getLiveSessions()
      const idx = sessions.findIndex(s => s.id === activeId)
      if (idx >= 0) {
        sessions[idx].messages.push({
          id: Math.random().toString(36).substring(2),
          from: "admin", text, time: nowStr(), timestamp: Date.now(),
        })
        saveLiveSessions(sessions)
        syncLive()
      }
    } else {
      // Mock conversation — update local state
      setMockConvs(prev => prev.map(c =>
        c.id === activeId ? {
          ...c,
          messages: [...c.messages, { id: Date.now(), from: "admin", text, time: `Today, ${nowStr()}`, read: false }],
        } : c
      ))
    }
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const getLastMsg = (c: Conversation) => c.messages[c.messages.length - 1]
  const getUnread = (c: Conversation) => c.messages.filter(m => !m.read && m.from === "client").length

  return (
    <div className="min-h-screen flex" style={{ background: "#0A0705", fontFamily: "Poppins, sans-serif" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active="enquiries" />

      <div className="lg:ml-64 flex flex-col flex-1 min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5" style={{ background: "rgba(10,7,5,0.97)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">Enquiries</h1>
              {unreadTotal > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "#D4541E" }}>{unreadTotal}</span>
              )}
              {liveConvs.length > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.12)", color: "#34d399" }}>
                  <Radio className="h-2.5 w-2.5" /> {liveConvs.length} live
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Bell className="h-4 w-4" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#D4541E" }}>A</div>
          </div>
        </header>

        {/* Chat layout */}
        <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>

          {/* ── Conversation list ── */}
          <div
            className={`flex flex-col w-full sm:w-80 flex-shrink-0 ${mobileView === "chat" ? "hidden sm:flex" : "flex"}`}
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)", background: "#0D0906" }}
          >
            <div className="p-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                <input
                  type="text" placeholder="Search conversations..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-xl text-white text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
            </div>

            {/* Live section header */}
            {liveConvs.length > 0 && (
              <div className="px-4 pt-3 pb-1">
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#34d399" }}>● Live Visitors</p>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="py-12 text-center text-white/25 text-xs">No conversations yet.</div>
              )}
              {filtered.map((c, i) => {
                const last = getLastMsg(c)
                const unread = getUnread(c)
                const isActive = c.id === activeId
                const showDivider = i > 0 && filtered[i - 1].live && !c.live
                return (
                  <div key={c.id}>
                    {showDivider && (
                      <div className="px-4 pt-4 pb-1">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/25">Enquiries</p>
                      </div>
                    )}
                    <button
                      onClick={() => selectConv(c.id)}
                      className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all"
                      style={{
                        background: isActive ? "rgba(212,84,30,0.1)" : "transparent",
                        borderLeft: isActive ? "3px solid #D4541E" : "3px solid transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <Avatar av={c.avatar} online={c.online} live={c.live} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`text-sm truncate ${unread > 0 || (c.live && last?.from === "client") ? "font-bold text-white" : "font-medium text-white/65"}`}>{c.name}</span>
                            {c.live && (
                              <span className="text-[8px] font-bold px-1.5 rounded flex-shrink-0" style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}>LIVE</span>
                            )}
                          </div>
                          <span className="text-[10px] text-white/25 flex-shrink-0">{last?.time?.split(",")[0] ?? ""}</span>
                        </div>
                        <span className="text-[10px] text-white/30 block">{c.company}</span>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <span className="text-xs text-white/30 truncate">{last?.text ?? "No messages yet"}</span>
                          {(unread > 0) && (
                            <span className="text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ background: "#D4541E" }}>{unread}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Chat panel ── */}
          <div className={`flex-1 flex flex-col ${mobileView === "list" ? "hidden sm:flex" : "flex"}`}>
            {active ? (
              <>
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#0D0906" }}>
                  <button className="sm:hidden text-white/40 hover:text-white mr-1" onClick={() => setMobileView("list")}>
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <Avatar av={active.avatar} online={active.online} live={active.live} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{active.name}</span>
                      {active.live && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "rgba(52,211,153,0.12)", color: "#34d399" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live Chat
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/35">{active.company}{active.service && ` · ${active.service}`}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {active.phone && (
                      <a href={`tel:${active.phone}`} className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                    {active.email && (
                      <a href={`mailto:${active.email}`} className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3" style={{ background: "rgba(0,0,0,0.15)" }}>
                  {active.messages.map((msg) => {
                    const isAdmin = msg.from === "admin"
                    return (
                      <div key={msg.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"} gap-2.5`}>
                        {!isAdmin && <Avatar av={active.avatar} live={active.live} size="sm" />}
                        <div className={`max-w-[70%] flex flex-col ${isAdmin ? "items-end" : "items-start"} gap-1`}>
                          <div
                            className="px-4 py-2.5 text-sm leading-relaxed"
                            style={isAdmin
                              ? { background: "#D4541E", color: "#fff", borderRadius: "16px 4px 16px 16px" }
                              : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", borderRadius: "4px 16px 16px 16px", border: "1px solid rgba(255,255,255,0.08)" }
                            }
                          >
                            {msg.text}
                          </div>
                          <div className="flex items-center gap-1.5 px-1">
                            <span className="text-[10px] text-white/25">{msg.time}</span>
                            {isAdmin && (
                              msg.read
                                ? <CheckCheck className="h-3 w-3" style={{ color: "#D4541E" }} />
                                : <Check className="h-3 w-3 text-white/20" />
                            )}
                          </div>
                        </div>
                        {isAdmin && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: "#D4541E" }}>A</div>
                        )}
                      </div>
                    )
                  })}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="flex-shrink-0 px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0D0906" }}>
                  {active.live && (
                    <div className="flex items-center gap-1.5 mb-2 text-[10px]" style={{ color: "#34d399" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Customer is active on the website — your reply goes directly to their chat widget
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={active.live ? `Reply to ${active.name} on the website...` : `Reply to ${active.name}...`}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                      className="flex-1 h-11 px-4 rounded-2xl text-white text-sm focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#D4541E")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim()}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all disabled:opacity-40"
                      style={{ background: "#D4541E" }}
                    >
                      <Send className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(212,84,30,0.1)", border: "1px solid rgba(212,84,30,0.2)" }}>
                  <MessageSquare className="h-7 w-7" style={{ color: "#D4541E" }} />
                </div>
                <h2 className="text-base font-bold text-white mb-2">Select a conversation</h2>
                <p className="text-sm text-white/35 max-w-xs">Live website visitors appear at the top in green. Your replies go directly to their chat widget in real time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

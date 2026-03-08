"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MessageCircle, X, Send, ArrowLeft, ChevronRight, Zap, MapPin, Phone } from "lucide-react"

// ── Types & Storage ──────────────────────────────────────────────────────────
interface LiveMessage {
  id: string
  from: "client" | "admin"
  text: string
  time: string
  timestamp: number
}

interface LiveSession {
  id: string
  name: string
  company: string
  startTime: string
  lastActivity: number
  messages: LiveMessage[]
  unreadByAdmin: number
}

const STORAGE_KEY = "lmc_live_chats"
const SESSION_KEY = "lmc_chat_session_id"

function nowStr() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
}
function genId() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}
function getSessions(): LiveSession[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") } catch { return [] }
}
function saveSessions(s: LiveSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}
function getOrCreateSession(name = "", company = ""): LiveSession {
  const existingId = sessionStorage.getItem(SESSION_KEY)
  if (existingId) {
    const found = getSessions().find(s => s.id === existingId)
    if (found) return found
  }
  const id = genId()
  sessionStorage.setItem(SESSION_KEY, id)
  const session: LiveSession = {
    id, name: name || "Website Visitor", company,
    startTime: nowStr(), lastActivity: Date.now(),
    messages: [], unreadByAdmin: 0,
  }
  const sessions = getSessions()
  sessions.unshift(session)
  saveSessions(sessions)
  return session
}
function pushClientMessage(sessionId: string, text: string) {
  const sessions = getSessions()
  const idx = sessions.findIndex(s => s.id === sessionId)
  if (idx >= 0) {
    sessions[idx].messages.push({ id: genId(), from: "client", text, time: nowStr(), timestamp: Date.now() })
    sessions[idx].lastActivity = Date.now()
    sessions[idx].unreadByAdmin += 1
    saveSessions(sessions)
  }
}
function getMyMessages(sessionId: string): LiveMessage[] {
  return getSessions().find(s => s.id === sessionId)?.messages ?? []
}

// ── Quick replies ─────────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  { icon: "📍", label: "Available locations", text: "What billboard locations do you have available?" },
  { icon: "💰", label: "Pricing & rates", text: "Can you share your pricing and monthly rates?" },
  { icon: "🖥️", label: "LED screens", text: "I'm interested in your LED screen placements." },
  { icon: "📋", label: "Campaign planning", text: "I need help planning a nationwide OOH campaign." },
]

type Screen = "home" | "chat"

// ── Widget ────────────────────────────────────────────────────────────────────
export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [screen, setScreen] = useState<Screen>("home")
  const [messages, setMessages] = useState<LiveMessage[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const [nameStep, setNameStep] = useState(false)
  const [nameVal, setNameVal] = useState("")
  const [companyVal, setCompanyVal] = useState("")
  const [started, setStarted] = useState(false)
  const [pendingText, setPendingText] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const prevAdminCount = useRef(0)

  // Poll for admin replies
  useEffect(() => {
    if (!sessionId) return
    const iv = setInterval(() => {
      const msgs = getMyMessages(sessionId)
      setMessages(msgs)
      const adminMsgs = msgs.filter(m => m.from === "admin")
      if (!open && adminMsgs.length > prevAdminCount.current) {
        setUnread(c => c + adminMsgs.length - prevAdminCount.current)
      }
      prevAdminCount.current = adminMsgs.length
    }, 1500)
    return () => clearInterval(iv)
  }, [sessionId, open])

  useEffect(() => {
    if (open) { setUnread(0) }
    if (open && screen === "chat") { setTimeout(() => inputRef.current?.focus(), 300) }
  }, [open, screen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing, nameStep])

  // Badge pulse after 6s
  useEffect(() => {
    const t = setTimeout(() => { if (!open) setUnread(u => u || 1) }, 6000)
    return () => clearTimeout(t)
  }, [open])

  const startChat = (quickText?: string) => {
    const text = quickText || ""
    setPendingText(text)
    setScreen("chat")
    if (!started) setNameStep(true)
  }

  const submitName = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameVal.trim()) return
    const session = getOrCreateSession(nameVal.trim(), companyVal.trim())
    setSessionId(session.id)
    setStarted(true)
    setNameStep(false)
    // Send pending text if any
    if (pendingText) {
      pushClientMessage(session.id, pendingText)
      setMessages(getMyMessages(session.id))
      setPendingText("")
    }
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      // Admin greeting pushed to session
      const sessions = getSessions()
      const idx = sessions.findIndex(s => s.id === session.id)
      if (idx >= 0) {
        sessions[idx].messages.push({
          id: genId(), from: "admin",
          text: `Hi ${nameVal.trim()}! 👋 Thanks for reaching out to Landscape Media Concept. Our team will be with you shortly. In the meantime, feel free to share more details about your campaign.`,
          time: nowStr(), timestamp: Date.now(),
        })
        saveSessions(sessions)
        setMessages(getMyMessages(session.id))
      }
    }, 1800)
    setTimeout(() => inputRef.current?.focus(), 200)
  }

  const sendMessage = useCallback((text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg) return
    setInput("")
    if (!sessionId) return
    pushClientMessage(sessionId, msg)
    setMessages(getMyMessages(sessionId))
    setTyping(true)
    setTimeout(() => setTyping(false), 2000)
  }, [input, sessionId])

  return (
    <>
      {/* ── Widget panel ── */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-[9999] transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          width: "clamp(320px, 92vw, 376px)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.08)",
          fontFamily: "Poppins, sans-serif",
        }}
      >

        {/* ══ HOME SCREEN ══ */}
        {screen === "home" && (
          <div>
            {/* Header with gradient */}
            <div className="relative px-5 pt-8 pb-16" style={{ background: "linear-gradient(135deg, #C04010 0%, #D4541E 60%, #E8722A 100%)" }}>
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Brand */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2.2" fill="none" />
                    <circle cx="2" cy="20" r="3.2" fill="white" />
                    <text x="20" y="24.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Poppins, sans-serif">LMC</text>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-black text-sm leading-none">Landscape Media Concept</div>
                  <div className="text-white/70 text-[10px] mt-0.5">Customer Support</div>
                </div>
              </div>

              <h2 className="text-white font-black text-xl leading-snug mb-1">Hi there 👋</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Ask us anything about outdoor advertising in Nigeria. We're here to help.
              </p>

              {/* Online indicator */}
              <div className="flex items-center gap-1.5 mt-3">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-white/70 text-[11px]">Typically replies within a few hours</span>
              </div>
            </div>

            {/* Card overlapping the header */}
            <div style={{ background: "#fff", marginTop: -48 }}>
              <div className="mx-4 rounded-2xl overflow-hidden shadow-lg" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
                <button
                  onClick={() => startChat()}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,84,30,0.1)" }}>
                    <MessageCircle className="h-4 w-4" style={{ color: "#D4541E" }} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-bold text-gray-900">Send us a message</div>
                    <div className="text-xs text-gray-400 mt-0.5">We'll reply as soon as possible</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-orange-400 transition-colors" />
                </button>
              </div>

              {/* Quick options */}
              <div className="px-4 pt-5 pb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick questions</p>
                <div className="space-y-2">
                  {QUICK_REPLIES.map(q => (
                    <button
                      key={q.label}
                      onClick={() => startChat(q.text)}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all hover:bg-gray-50 group"
                      style={{ border: "1px solid rgba(0,0,0,0.07)" }}
                    >
                      <span className="text-base flex-shrink-0">{q.icon}</span>
                      <span className="text-sm text-gray-700 font-medium flex-1">{q.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-orange-400 flex-shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact row */}
              <div className="px-4 pt-3 pb-5 flex items-center gap-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 12 }}>
                <a href="tel:+2349028215501" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors">
                  <Phone className="h-3 w-3" /> +234 902 821 5501
                </a>
                <span className="text-gray-200">|</span>
                <a href="mailto:landscapemedia23@yahoo.com" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors truncate">
                  <Zap className="h-3 w-3" /> landscapemedia23@yahoo.com
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ══ CHAT SCREEN ══ */}
        {screen === "chat" && (
          <div className="flex flex-col" style={{ height: 500, background: "#f9f7f5" }}>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0" style={{ background: "linear-gradient(135deg, #C04010, #D4541E)" }}>
              <button onClick={() => setScreen("home")} className="text-white/70 hover:text-white transition-colors flex-shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </button>
              {/* Agent avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ background: "rgba(255,255,255,0.25)" }}>
                  LMC
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2" style={{ borderColor: "#C04010" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white leading-none">LMC Support</div>
                <div className="text-[10px] text-white/70 mt-0.5">Landscape Media Concept</div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white flex-shrink-0 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

              {/* Name collection */}
              {nameStep && (
                <>
                  {/* System bubble */}
                  <div className="flex justify-center">
                    <span className="text-[10px] text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">
                      Start your conversation
                    </span>
                  </div>
                  {/* Agent bubble */}
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black text-white flex-shrink-0" style={{ background: "#D4541E" }}>L</div>
                    <div className="max-w-[78%] px-4 py-3 text-sm text-gray-800 shadow-sm leading-relaxed" style={{ background: "#fff", borderRadius: "4px 18px 18px 18px", border: "1px solid rgba(0,0,0,0.07)" }}>
                      Before we begin, may I know your name? 😊
                    </div>
                  </div>
                  {/* Name form */}
                  <form onSubmit={submitName} className="ml-8 space-y-2 pt-1">
                    <input
                      type="text" placeholder="Your name *" value={nameVal}
                      onChange={e => setNameVal(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-xl text-sm text-gray-800 focus:outline-none"
                      style={{ background: "#fff", border: "1.5px solid #D4541E", fontFamily: "Poppins, sans-serif" }}
                      autoFocus required
                    />
                    <input
                      type="text" placeholder="Company (optional)" value={companyVal}
                      onChange={e => setCompanyVal(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-xl text-sm text-gray-700 focus:outline-none"
                      style={{ background: "#fff", border: "1.5px solid rgba(0,0,0,0.1)", fontFamily: "Poppins, sans-serif" }}
                    />
                    <button type="submit" className="w-full h-10 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: "#D4541E" }}>
                      Start Conversation
                    </button>
                  </form>
                </>
              )}

              {/* Chat messages */}
              {messages.map((msg) => {
                const isAdmin = msg.from === "admin"
                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${isAdmin ? "justify-start" : "justify-end"}`}>
                    {isAdmin && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black text-white flex-shrink-0" style={{ background: "#D4541E" }}>L</div>
                    )}
                    <div className={`max-w-[78%] flex flex-col ${isAdmin ? "items-start" : "items-end"} gap-1`}>
                      <div
                        className="px-4 py-2.5 text-sm leading-relaxed shadow-sm"
                        style={isAdmin
                          ? { background: "#fff", color: "#1a1a1a", borderRadius: "4px 18px 18px 18px", border: "1px solid rgba(0,0,0,0.07)" }
                          : { background: "#D4541E", color: "#fff", borderRadius: "18px 4px 18px 18px" }
                        }
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {typing && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black text-white flex-shrink-0" style={{ background: "#D4541E" }}>L</div>
                  <div className="px-4 py-3 shadow-sm flex items-center gap-1.5" style={{ background: "#fff", borderRadius: "4px 18px 18px 18px", border: "1px solid rgba(0,0,0,0.07)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            {!nameStep && started && (
              <div className="flex-shrink-0 px-3 py-3 bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text" placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                    className="flex-1 h-10 px-4 rounded-2xl text-sm text-gray-800 focus:outline-none"
                    style={{ background: "#f3f0ed", border: "1.5px solid transparent", fontFamily: "Poppins, sans-serif" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#D4541E")}
                    onBlur={e => (e.currentTarget.style.borderColor = "transparent")}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all disabled:opacity-40 hover:opacity-90"
                    style={{ background: "#D4541E" }}
                  >
                    <Send className="h-4 w-4 text-white" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-300 mt-2">Powered by LMC Support</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── FAB button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          width: 58, height: 58,
          background: open ? "#1a1a1a" : "#D4541E",
          boxShadow: open ? "0 4px 20px rgba(0,0,0,0.3)" : "0 8px 32px rgba(212,84,30,0.55)",
        }}
        aria-label={open ? "Close support chat" : "Open support chat"}
      >
        <div className="transition-all duration-300">
          {open
            ? <X className="h-5 w-5 text-white" />
            : <MessageCircle className="h-6 w-6 text-white" />
          }
        </div>

        {/* Unread badge */}
        {!open && unread > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
            style={{ background: "#16a34a" }}
          >
            {unread}
          </span>
        )}
      </button>
    </>
  )
}

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MessageCircle, X, Send, ChevronDown } from "lucide-react"

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

function saveSessions(sessions: LiveSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

function getOrCreateSession(name = "", company = ""): LiveSession {
  const existingId = sessionStorage.getItem(SESSION_KEY)
  if (existingId) {
    const sessions = getSessions()
    const found = sessions.find(s => s.id === existingId)
    if (found) return found
  }
  const newId = genId()
  sessionStorage.setItem(SESSION_KEY, newId)
  const session: LiveSession = {
    id: newId, name: name || "Website Visitor", company,
    startTime: nowStr(), lastActivity: Date.now(),
    messages: [], unreadByAdmin: 0,
  }
  const sessions = getSessions()
  sessions.unshift(session)
  saveSessions(sessions)
  return session
}

function pushMessage(sessionId: string, msg: Omit<LiveMessage, "id" | "timestamp">) {
  const sessions = getSessions()
  const idx = sessions.findIndex(s => s.id === sessionId)
  const full: LiveMessage = { ...msg, id: genId(), timestamp: Date.now() }
  if (idx >= 0) {
    sessions[idx].messages.push(full)
    sessions[idx].lastActivity = Date.now()
    if (msg.from === "client") sessions[idx].unreadByAdmin += 1
    saveSessions(sessions)
  }
}

function getMyMessages(sessionId: string): LiveMessage[] {
  const sessions = getSessions()
  return sessions.find(s => s.id === sessionId)?.messages ?? []
}

const QUICK_OPTIONS = [
  "I want to book a billboard",
  "What locations are available?",
  "I need pricing information",
  "Campaign consultation",
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<LiveMessage[]>([])
  const [input, setInput] = useState("")
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [typing, setTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [nameStep, setNameStep] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [companyInput, setCompanyInput] = useState("")
  const [userName, setUserName] = useState("")
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastAdminMsgCount = useRef(0)

  // Intro messages shown before user starts
  const introMessages: LiveMessage[] = [
    { id: "intro-1", from: "admin", text: "👋 Hi there! Welcome to Landscape Media Concept. How can we help you today?", time: nowStr(), timestamp: 0 },
    { id: "intro-2", from: "admin", text: "We specialise in premium outdoor advertising across Nigeria — LED screens, unipoles, gantries, wall drapes and more.", time: nowStr(), timestamp: 1 },
  ]

  // Poll for admin replies every 2 seconds
  useEffect(() => {
    if (!sessionId) return
    const interval = setInterval(() => {
      const msgs = getMyMessages(sessionId)
      setMessages(msgs)
      const adminMsgs = msgs.filter(m => m.from === "admin")
      if (!open && adminMsgs.length > lastAdminMsgCount.current) {
        setUnreadCount(c => c + (adminMsgs.length - lastAdminMsgCount.current))
      }
      lastAdminMsgCount.current = adminMsgs.length
    }, 1500)
    return () => clearInterval(interval)
  }, [sessionId, open])

  useEffect(() => {
    if (open) { setUnreadCount(0); setTimeout(() => inputRef.current?.focus(), 300) }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing, nameStep])

  // Trigger badge pulse after 5s
  useEffect(() => {
    const t = setTimeout(() => { if (!open) setUnreadCount(1) }, 5000)
    return () => clearTimeout(t)
  }, [open])

  const submitName = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameInput.trim()) return
    setUserName(nameInput.trim())
    const session = getOrCreateSession(nameInput.trim(), companyInput.trim())
    setSessionId(session.id)
    setNameStep(false)
    setStarted(true)
    // Push welcome
    const welcomeMsg: LiveMessage = {
      id: genId(), from: "admin",
      text: `Great to meet you, ${nameInput.trim()}! 😊 What kind of campaign are you planning, and which city are you targeting?`,
      time: nowStr(), timestamp: Date.now(),
    }
    const sessions = getSessions()
    const idx = sessions.findIndex(s => s.id === session.id)
    if (idx >= 0) { sessions[idx].messages.push(welcomeMsg); saveSessions(sessions) }
    setMessages([welcomeMsg])
    setTimeout(() => inputRef.current?.focus(), 200)
  }

  const send = useCallback((text: string) => {
    if (!text.trim()) return
    setInput("")

    if (!sessionId) {
      // First message — ask for name
      setNameStep(true)
      return
    }

    pushMessage(sessionId, { from: "client", text: text.trim(), time: nowStr() })
    setMessages(getMyMessages(sessionId))

    // Show "typing" shimmer — real admin will reply via localStorage
    setTyping(true)
    setTimeout(() => setTyping(false), 2500)
  }, [sessionId])

  const handleQuick = (opt: string) => send(opt)

  const displayMessages = started ? messages : []

  return (
    <>
      {/* ── Chat window ── */}
      <div
        className={`fixed bottom-24 right-4 sm:right-8 z-[9999] flex flex-col transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          width: "clamp(320px, 92vw, 375px)", height: 520,
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0" style={{ background: "#D4541E" }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2.2" fill="none" />
              <circle cx="2" cy="20" r="3.2" fill="white" />
              <text x="20" y="24.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Poppins, sans-serif">LMC</text>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white">Landscape Media Concept</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-[11px] text-white/80">Online · We reply fast</span>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: "#0D0906" }}>

          {/* Intro (before started) */}
          {!started && introMessages.map(msg => (
            <div key={msg.id} className="flex justify-start gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5" style={{ background: "#D4541E" }}>L</div>
              <div className="max-w-[80%]">
                <div className="px-3.5 py-2.5 text-sm leading-relaxed text-white/85" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px 16px 16px 16px" }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {/* Quick options before start */}
          {!started && !nameStep && (
            <div className="pt-1 space-y-2">
              <p className="text-[11px] text-white/30 px-1">Quick start:</p>
              {QUICK_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleQuick(opt)}
                  className="block w-full text-left px-3.5 py-2 rounded-xl text-xs text-white/70 hover:text-white transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Name collection step */}
          {nameStep && (
            <>
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5" style={{ background: "#D4541E" }}>L</div>
                <div className="max-w-[80%]">
                  <div className="px-3.5 py-2.5 text-sm leading-relaxed text-white/85" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px 16px 16px 16px" }}>
                    Before we begin — what's your name and company so our team can assist you properly?
                  </div>
                </div>
              </div>
              <form onSubmit={submitName} className="ml-9 space-y-2">
                <input
                  type="text" placeholder="Your name *" value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl text-white text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(212,84,30,0.4)" }}
                  autoFocus required
                />
                <input
                  type="text" placeholder="Company (optional)" value={companyInput}
                  onChange={e => setCompanyInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl text-white text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <button type="submit" className="w-full h-9 rounded-xl text-sm font-bold text-white" style={{ background: "#D4541E" }}>
                  Start Chat
                </button>
              </form>
            </>
          )}

          {/* Live messages */}
          {displayMessages.map(msg => {
            const isAdmin = msg.from === "admin"
            return (
              <div key={msg.id} className={`flex ${isAdmin ? "justify-start" : "justify-end"} gap-2`}>
                {isAdmin && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5" style={{ background: "#D4541E" }}>L</div>
                )}
                <div className={`max-w-[80%] flex flex-col ${isAdmin ? "items-start" : "items-end"} gap-1`}>
                  <div
                    className="px-3.5 py-2.5 text-sm leading-relaxed"
                    style={{
                      borderRadius: isAdmin ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                      background: isAdmin ? "rgba(255,255,255,0.07)" : "#D4541E",
                      color: isAdmin ? "rgba(255,255,255,0.85)" : "#fff",
                      border: isAdmin ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-white/25 px-1">{msg.time}</span>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background: "#D4541E" }}>L</div>
              <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {started && (
          <div className="flex-shrink-0 px-3 py-3" style={{ background: "#0D0906", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text" placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input) } }}
                className="flex-1 h-10 px-4 rounded-2xl text-white text-sm focus:outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#D4541E")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: "#D4541E" }}
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
            <p className="text-center text-[10px] text-white/20 mt-2">Landscape Media Concept · Lagos, Nigeria</p>
          </div>
        )}
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-4 sm:right-8 z-[9999] flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          width: 56, height: 56,
          background: open ? "rgba(255,255,255,0.12)" : "#D4541E",
          boxShadow: "0 8px 30px rgba(212,84,30,0.55)",
          border: open ? "1px solid rgba(255,255,255,0.15)" : "none",
        }}
        aria-label={open ? "Close chat" : "Chat with us"}
      >
        {open
          ? <ChevronDown className="h-5 w-5 text-white" />
          : <MessageCircle className="h-6 w-6 text-white" />
        }
        {!open && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-bounce" style={{ background: "#16a34a" }}>
            {unreadCount}
          </span>
        )}
      </button>
    </>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn } from "lucide-react"

const ADMIN_USER = "admin"
const ADMIN_PASS = "lmc@2026"

function LMCLogo() {
  return (
    <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#D4541E" strokeWidth="2.2" fill="rgba(212,84,30,0.1)" />
      <circle cx="2" cy="20" r="3.2" fill="#D4541E" />
      <text x="20" y="24.5" textAnchor="middle" fill="#D4541E" fontSize="11" fontWeight="800"
        fontFamily="Poppins, sans-serif" letterSpacing="0.5">LMC</text>
    </svg>
  )
}

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("lmc_admin_auth", "true")
        router.push("/admin")
      } else {
        setError("Invalid username or password.")
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0A0705", fontFamily: "Poppins, sans-serif" }}
    >
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,84,30,0.08) 0%, transparent 70%)"
      }} />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Logo + brand */}
          <div className="flex flex-col items-center mb-8">
            <LMCLogo />
            <div className="mt-4 text-center">
              <div className="text-xl font-black text-white">
                land<span style={{ color: "#D4541E" }}>scape</span>
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest">Media Concept — Admin</div>
            </div>
          </div>

          <h1 className="text-lg font-bold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-white/35 mb-7">Sign in to the admin dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                className="w-full h-11 px-4 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#D4541E")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full h-11 px-4 pr-11 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#D4541E")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all mt-2 disabled:opacity-60"
              style={{ background: "#D4541E" }}
            >
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/15 mt-6">
          © 2026 Landscape Media Concept
        </p>
      </div>
    </div>
  )
}

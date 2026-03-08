"use client"

import { useEffect, useState } from "react"

function LMCLogoMark() {
  return (
    <svg width="72" height="72" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#D4541E" strokeWidth="2.2" fill="rgba(212,84,30,0.08)" />
      <circle cx="2" cy="20" r="3.2" fill="#D4541E" />
      <text
        x="20"
        y="24.5"
        textAnchor="middle"
        fill="#D4541E"
        fontSize="11"
        fontWeight="800"
        fontFamily="Poppins, sans-serif"
        letterSpacing="0.5"
      >
        LMC
      </text>
    </svg>
  )
}

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 350)
          return 100
        }
        return prev + Math.random() * 14
      })
    }, 80)
    return () => clearInterval(timer)
  }, [])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-400 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#1A0E05" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,84,30,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo mark */}
        <div className="mb-7">
          <LMCLogoMark />
        </div>

        {/* Brand name */}
        <div className="text-3xl font-black text-white mb-1 tracking-tight">
          land<span style={{ color: "#D4541E" }}>scape</span>
        </div>
        <div className="text-xs text-white/40 uppercase tracking-[0.35em] mb-10 font-medium">
          Media Concept
        </div>

        {/* Progress bar */}
        <div className="w-44 h-0.5 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, #E8793A, #D4541E)",
            }}
          />
        </div>
        <div className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
          {Math.round(Math.min(progress, 100))}%
        </div>
      </div>
    </div>
  )
}

"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 rounded-full flex items-center justify-center border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
    </button>
  )
}

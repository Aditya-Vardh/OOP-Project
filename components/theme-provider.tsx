"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme") as Theme | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    let initialTheme = saved || defaultTheme
    if (initialTheme === "system" && enableSystem) {
      initialTheme = prefersDark ? "dark" : "light"
    }

    setThemeState(saved || defaultTheme)
    applyTheme(initialTheme)
  }, [defaultTheme, enableSystem])

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement
    let themeToApply = newTheme

    if (newTheme === "system" && enableSystem) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      themeToApply = prefersDark ? "dark" : "light"
    }

    if (attribute === "class") {
      if (themeToApply === "dark") {
        html.classList.add("dark")
      } else {
        html.classList.remove("dark")
      }
    }

    localStorage.setItem("theme", newTheme)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
  }

  const resolvedTheme = (() => {
    if (theme === "system" && enableSystem) {
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
      return "light"
    }
    return (theme as "light" | "dark") || "light"
  })()

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

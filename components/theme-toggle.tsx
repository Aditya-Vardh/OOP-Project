"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="sm" className="gap-2 bg-transparent" disabled />
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="gap-2 bg-transparent"
    >
      {theme === "light" || theme === "system" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      <span className="hidden sm:inline">{theme === "light" ? "Dark" : "Light"}</span>
    </Button>
  )
}

"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Wallet, LogOut, Users, TrendingUp, BarChart3 } from "lucide-react"
import { logout } from "@/lib/auth"

export function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/admin" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">SmartPay Admin</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button
              variant={isActive("/admin") ? "default" : "ghost"}
              size="sm"
              className={`gap-2 ${!isActive("/admin") ? "bg-transparent" : ""}`}
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button
              variant={isActive("/admin/users") ? "default" : "ghost"}
              size="sm"
              className={`gap-2 ${!isActive("/admin/users") ? "bg-transparent" : ""}`}
            >
              <Users className="w-4 h-4" />
              Users
            </Button>
          </Link>
          <Link href="/admin/transactions">
            <Button
              variant={isActive("/admin/transactions") ? "default" : "ghost"}
              size="sm"
              className={`gap-2 ${!isActive("/admin/transactions") ? "bg-transparent" : ""}`}
            >
              <TrendingUp className="w-4 h-4" />
              Transactions
            </Button>
          </Link>
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

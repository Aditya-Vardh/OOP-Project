"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { BalanceCard } from "@/components/balance-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, History, Plus, TrendingUp } from "lucide-react"
import { getUser } from "@/lib/auth"

interface User {
  id: string
  email: string
  name: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [balance, setBalance] = useState(12450.5)

  useEffect(() => {
    const userData = getUser()
    setUser(userData)
  }, [])

  const quickActions = [
    {
      icon: Send,
      title: "Send Money",
      description: "Transfer funds to another user",
      href: "/dashboard/send",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: History,
      title: "Transaction History",
      description: "View all your transactions",
      href: "/dashboard/history",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Plus,
      title: "Add Funds",
      description: "Top up your wallet",
      href: "/dashboard/add-funds",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "View spending insights",
      href: "/dashboard/analytics",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-muted-foreground">Manage your digital wallet and transactions</p>
        </div>
      </motion.div>

      {/* Balance Card */}
      <BalanceCard balance={balance} userName={user?.name} />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Link href={action.href}>
                <Card className="h-full hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Transfer to Suresh Kumar</p>
                  <p className="text-sm text-muted-foreground">Today at 2:30 PM</p>
                </div>
                <p className="font-semibold text-destructive">-₹50.00</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Received from Ramesh Sharma</p>
                  <p className="text-sm text-muted-foreground">Yesterday at 10:15 AM</p>
                </div>
                <p className="font-semibold text-green-600">+₹100.00</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Wallet Top-up</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
                <p className="font-semibold text-green-600">+₹500.00</p>
              </div>
            </div>
            <Link href="/dashboard/history">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Transactions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

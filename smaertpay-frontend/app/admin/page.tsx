"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/stats-card"
import { Users, TrendingUp, DollarSign, AlertCircle, IndianRupeeIcon } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      description: "Active users on platform",
      icon: Users,
      trend: 12,
    },
    {
      title: "Total Transactions",
      value: "5,678",
      description: "Completed transactions",
      icon: TrendingUp,
      trend: 8,
    },
    {
      title: "Total Volume",
      value: "₹234,567",
      description: "Transaction volume this month",
      icon: IndianRupeeIcon,
      trend: 15,
    },
    {
      title: "Pending Issues",
      value: "12",
      description: "Flagged transactions",
      icon: AlertCircle,
      trend: -5,
    },
  ]

  const recentUsers = [
    { id: 1, name: "Rohit Sharma", email: "rohit@example.com", joined: "2 hours ago", status: "active" },
    { id: 2, name: "Ramesh Sharma", email: "ramesh@example.com", joined: "5 hours ago", status: "active" },
    { id: 3, name: "Arjun Patel", email: "arjun@example.com", joined: "1 day ago", status: "active" },
  ]

  const recentTransactions = [
    { id: 1, from: "Suresh Kumar", to: "Ramesh Sharma", amount: 50.0, status: "completed", time: "2 hours ago" },
    { id: 2, from: "Shreyas Iyer", to: "Virat Kohli", amount: 100.0, status: "completed", time: "3 hours ago" },
    { id: 3, from: "Rohit Sharma", to: "MS Dhoni", amount: 75.5, status: "pending", time: "4 hours ago" },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform activity and manage users</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Recent Users and Transactions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{user.joined}</p>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-600/20 text-green-600 rounded">
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest platform transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">
                        {tx.from} → {tx.to}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{tx.amount.toFixed(2)}</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          tx.status === "completed"
                            ? "bg-green-600/20 text-green-600"
                            : "bg-yellow-600/20 text-yellow-600"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

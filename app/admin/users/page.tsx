"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Trash2, Ban } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  joined: string
  balance: number
  status: "active" | "suspended" | "inactive"
  transactions: number
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "suspended" | "inactive">("all")

  const users: User[] = [
    {
      id: 1,
      name: "Suresh Kumar",
      email: "suresh@example.com",
      joined: "Jan 15, 2025",
      balance: 1250.5,
      status: "active",
      transactions: 45,
    },
    {
      id: 2,
      name: "Ramesh Sharma",
      email: "ramesh@example.com",
      joined: "Jan 10, 2025",
      balance: 3450.0,
      status: "active",
      transactions: 78,
    },
    {
      id: 3,
      name: "Arjun Patel",
      email: "arjun@example.com",
      joined: "Jan 5, 2025",
      balance: 2100.75,
      status: "active",
      transactions: 32,
    },
    {
      id: 4,
      name: "Virat Kohli",
      email: "virat@example.com",
      joined: "Dec 28, 2024",
      balance: 0,
      status: "suspended",
      transactions: 12,
    },
    {
      id: 5,
      name: "Rohit Sharma",
      email: "rohit@example.com",
      joined: "Dec 20, 2024",
      balance: 500.0,
      status: "inactive",
      transactions: 5,
    },
  ]

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "all" || user.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [searchTerm, filterStatus])

  const statusColors = {
    active: "bg-green-600/20 text-green-600",
    suspended: "bg-destructive/20 text-destructive",
    inactive: "bg-muted text-muted-foreground",
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h1 className="text-4xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage and monitor all platform users</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Search and filter users by status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              {(["all", "active", "suspended", "inactive"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className={filterStatus === status ? "" : "bg-transparent"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">Joined</th>
                    <th className="text-right py-3 px-4 font-medium">Balance</th>
                    <th className="text-center py-3 px-4 font-medium">Transactions</th>
                    <th className="text-center py-3 px-4 font-medium">Status</th>
                    <th className="text-center py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
                      <td className="py-3 px-4 text-right font-medium">₹{user.balance.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">{user.transactions}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded ${statusColors[user.status]}`}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Ban className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No users found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

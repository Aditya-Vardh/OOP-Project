"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Transaction {
  id: number
  from: string
  to: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
  type: "transfer" | "deposit" | "withdrawal"
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending" | "failed">("all")

  const transactions: Transaction[] = [
    {
      id: 1,
      from: "Suresh Kumar",
      to: "Ramesh Sharma",
      amount: 50.0,
      date: "2 hours ago",
      status: "completed",
      type: "transfer",
    },
    {
      id: 2,
      from: "Shreyas Iyer",
      to: "Virat Kohli",
      amount: 100.0,
      date: "3 hours ago",
      status: "completed",
      type: "transfer",
    },
    {
      id: 3,
      from: "Rohit Sharma",
      to: "MS Dhoni",
      amount: 75.5,
      date: "4 hours ago",
      status: "pending",
      type: "transfer",
    },
    {
      id: 4,
      from: "System",
      to: "Rohit Sharma",
      amount: 500.0,
      date: "5 hours ago",
      status: "completed",
      type: "deposit",
    },
    {
      id: 5,
      from: "Yuvraj Singh",
      to: "System",
      amount: 200.0,
      date: "6 hours ago",
      status: "failed",
      type: "withdrawal",
    },
  ]

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "all" || tx.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [searchTerm, filterStatus])

  const statusIcons = {
    completed: <CheckCircle className="w-4 h-4 text-green-600" />,
    pending: <Clock className="w-4 h-4 text-yellow-600" />,
    failed: <AlertCircle className="w-4 h-4 text-destructive" />,
  }

  const statusColors = {
    completed: "bg-green-600/20 text-green-600",
    pending: "bg-yellow-600/20 text-yellow-600",
    failed: "bg-destructive/20 text-destructive",
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h1 className="text-4xl font-bold mb-2">Transaction Monitoring</h1>
          <p className="text-muted-foreground">Monitor and manage all platform transactions</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Search and filter transactions by status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by user name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              {(["all", "completed", "pending", "failed"] as const).map((status) => (
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

            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">From</th>
                    <th className="text-left py-3 px-4 font-medium">To</th>
                    <th className="text-right py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-center py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{tx.from}</td>
                      <td className="py-3 px-4">{tx.to}</td>
                      <td className="py-3 px-4 text-right font-medium">₹{tx.amount.toFixed(2)}</td>
                      <td className="py-3 px-4 capitalize text-muted-foreground">{tx.type}</td>
                      <td className="py-3 px-4 text-muted-foreground">{tx.date}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {statusIcons[tx.status]}
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded ${statusColors[tx.status]}`}
                          >
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

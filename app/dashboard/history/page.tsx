"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TransactionItem } from "@/components/transaction-item"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: string
  type: "sent" | "received"
  recipient: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
}

export default function TransactionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "sent" | "received">("all")

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "sent",
      recipient: "Virat Kohli",
      amount: 50.0,
      date: "Today at 2:30 PM",
      status: "completed",
    },
    {
      id: "2",
      type: "received",
      recipient: "Yuvraj Singh",
      amount: 100.0,
      date: "Yesterday at 10:15 AM",
      status: "completed",
    },
    {
      id: "3",
      type: "sent",
      recipient: "MS Dhoni",
      amount: 75.5,
      date: "2 days ago",
      status: "completed",
    },
    {
      id: "4",
      type: "received",
      recipient: "Suresh Kumar",
      amount: 200.0,
      date: "3 days ago",
      status: "completed",
    },
    {
      id: "5",
      type: "sent",
      recipient: "Rohit Sharma",
      amount: 25.0,
      date: "4 days ago",
      status: "pending",
    },
    {
      id: "6",
      type: "received",
      recipient: "Ajay Devgan",
      amount: 150.0,
      date: "5 days ago",
      status: "completed",
    },
    {
      id: "7",
      type: "sent",
      recipient: "Cristiano Ronaldo",
      amount: 300.0,
      date: "1 week ago",
      status: "failed",
    },
    {
      id: "8",
      type: "received",
      recipient: "Speed Singh",
      amount: 500.0,
      date: "1 week ago",
      status: "completed",
    },
  ]

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.recipient.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterType === "all" || tx.type === filterType
      return matchesSearch && matchesFilter
    })
  }, [searchTerm, filterType])

  const stats = {
    totalSent: transactions
      .filter((tx) => tx.type === "sent" && tx.status === "completed")
      .reduce((sum, tx) => sum + tx.amount, 0),
    totalReceived: transactions
      .filter((tx) => tx.type === "received" && tx.status === "completed")
      .reduce((sum, tx) => sum + tx.amount, 0),
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold mb-2">Transaction History</h1>
          <p className="text-muted-foreground">View all your transactions and activity</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">₹{stats.totalSent.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">₹{stats.totalReceived.toFixed(2)}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Filter and search your transaction history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by recipient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
                className={filterType === "all" ? "" : "bg-transparent"}
              >
                All Transactions
              </Button>
              <Button
                variant={filterType === "sent" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("sent")}
                className={filterType === "sent" ? "" : "bg-transparent"}
              >
                Sent
              </Button>
              <Button
                variant={filterType === "received" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("received")}
                className={filterType === "received" ? "" : "bg-transparent"}
              >
                Received
              </Button>
            </div>

            {/* Transactions List */}
            <div className="space-y-2 mt-6">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx, index) => <TransactionItem key={tx.id} {...tx} index={index} />)
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

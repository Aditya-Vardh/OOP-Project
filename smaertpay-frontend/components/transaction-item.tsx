"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface TransactionItemProps {
  id: string
  type: "sent" | "received"
  recipient: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
  index?: number
}

export function TransactionItem({ type, recipient, amount, date, status, index = 0 }: TransactionItemProps) {
  const isSent = type === "sent"
  const statusColors = {
    completed: "text-green-600",
    pending: "text-yellow-600",
    failed: "text-destructive",
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isSent ? "bg-destructive/10" : "bg-green-600/10"
          }`}
        >
          {isSent ? (
            <ArrowUpRight className={`w-5 h-5 ${isSent ? "text-destructive" : "text-green-600"}`} />
          ) : (
            <ArrowDownLeft className="w-5 h-5 text-green-600" />
          )}
        </div>
        <div>
          <p className="font-medium">
            {isSent ? "Sent to" : "Received from"} {recipient}
          </p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${isSent ? "text-destructive" : "text-green-600"}`}>
          {isSent ? "-" : "+"}₹{amount.toFixed(2)}
        </p>
        <p className={`text-xs capitalize ${statusColors[status]}`}>{status}</p>
      </div>
    </motion.div>
  )
}

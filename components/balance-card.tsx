"use client"

import { motion } from "framer-motion"
import { Eye, EyeOff, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface BalanceCardProps {
  balance: number
  cardNumber?: string
  userName?: string
}

export function BalanceCard({ balance, cardNumber = "8143 5839 1100 4829", userName = "User" }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 md:h-72"
    >
      {/* Gradient background blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />

      {/* Card */}
      <div className="relative glass dark:glass-dark rounded-3xl p-8 h-full flex flex-col justify-between overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl" />

        {/* Top section */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
              <div className="flex items-center gap-3">
                <motion.h2
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-4xl md:text-5xl font-bold gradient-text"
                >
                  {showBalance
                    ? `₹${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : "••••••"}
                </motion.h2>
                <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)} className="h-8 w-8 p-0">
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative z-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Card Number</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-mono">{cardNumber}</p>
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-6 w-6 p-0">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              {copied && <p className="text-xs text-primary mt-1">Copied!</p>}
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Cardholder</p>
              <p className="text-sm font-semibold">{userName}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"

interface WalletCardProps {
  balance: number
  userName: string
}

export default function WalletCard({ balance, userName }: WalletCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 md:h-72"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-3xl" />
      <div className="relative glass dark:glass-dark rounded-3xl p-8 h-full flex flex-col justify-between overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
        />

        <div className="relative z-10">
          <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
          <motion.h2
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="text-5xl font-bold gradient-text"
          >
            ₹{balance.toFixed(2)}
          </motion.h2>
        </div>

        <div className="relative z-10 flex justify-between items-end">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Card Holder</p>
            <p className="text-lg font-semibold">{userName}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
        </div>
      </div>
    </motion.div>
  )
}

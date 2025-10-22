"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: number
  index?: number
}

export function StatsCard({ title, value, description, icon: Icon, trend, index = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass dark:glass-dark rounded-2xl p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-2 ${trend >= 0 ? "text-green-600" : "text-destructive"}`}>
              {trend >= 0 ? "+" : ""}
              {trend}% from last month
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </motion.div>
  )
}

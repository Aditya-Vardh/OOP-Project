"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { generateRandomBalance } from "./randomizer"

interface BalanceContextType {
  balance: number
  updateBalance: (amount: number) => void
  addFunds: (amount: number) => void
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined)

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(12450.5)

  useEffect(() => {
    // Initialize with random balance for demo
    setBalance(generateRandomBalance())
  }, [])

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance)
  }

  const addFunds = (amount: number) => {
    setBalance(prev => prev + amount)
  }

  return (
    <BalanceContext.Provider value={{ balance, updateBalance, addFunds }}>
      {children}
    </BalanceContext.Provider>
  )
}

export function useBalance() {
  const context = useContext(BalanceContext)
  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider')
  }
  return context
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, CreditCard, Wallet } from "lucide-react"

export default function AddFundsPage() {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddFunds = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/transactions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number.parseFloat(amount) }),
      })

      if (response.ok) {
        alert("Funds added successfully!")
        setAmount("")
      } else {
        alert("Failed to add funds")
      }
    } catch (error) {
      console.error("Error adding funds:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const quickAmounts = [100, 500, 1000, 5000]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h1 className="text-4xl font-bold mb-2">Add Funds</h1>
          <p className="text-muted-foreground">Top up your wallet balance</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Add Funds Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Amount
              </CardTitle>
              <CardDescription>Enter the amount you want to add</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-lg font-semibold">₹</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Quick Add</label>
                <div className="grid grid-cols-2 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant={amount === quickAmount.toString() ? "default" : "outline"}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="bg-transparent"
                    >
                      ₹{quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <CreditCard className="w-4 h-4" />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Wallet className="w-4 h-4" />
                    <span>Bank Transfer</span>
                  </label>
                </div>
              </div>

              <Button onClick={handleAddFunds} disabled={isLoading} className="w-full">
                {isLoading ? "Processing..." : "Add Funds"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Processing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Processing Time</h4>
                <p className="text-muted-foreground">
                  Most transactions are processed instantly. Bank transfers may take 1-2 business days.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Fees</h4>
                <p className="text-muted-foreground">No fees for adding funds to your wallet.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Security</h4>
                <p className="text-muted-foreground">
                  All transactions are encrypted and secured with industry-standard protocols.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supported Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>✓ Visa & Mastercard</p>
              <p>✓ Bank Transfer</p>
              <p>✓ Digital Wallets</p>
              <p>✓ UPI Payments</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

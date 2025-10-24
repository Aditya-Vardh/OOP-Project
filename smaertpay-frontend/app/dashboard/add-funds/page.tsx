"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, CreditCard, Wallet, QrCode, CheckCircle } from "lucide-react"
import QRCode from "qrcode"
import { useBalance } from "@/lib/balance-context"

export default function AddFundsPage() {
  const { addFunds } = useBalance()
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isLoading, setIsLoading] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrCodeDataURL, setQrCodeDataURL] = useState("")
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [paymentId, setPaymentId] = useState("")

  const generateQRCode = async (amount: number) => {
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setPaymentId(paymentId)
    
    const paymentData = {
      amount: amount,
      paymentId: paymentId,
      timestamp: new Date().toISOString(),
      merchant: "SmartPay Wallet"
    }
    
    try {
      const qrDataURL = await QRCode.toDataURL(JSON.stringify(paymentData), {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      setQrCodeDataURL(qrDataURL)
      setShowQRCode(true)
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }

  const handleAddFunds = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    try {
      // Generate QR code for payment
      await generateQRCode(Number.parseFloat(amount))
    } catch (error) {
      console.error("Error generating payment:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentComplete = async () => {
    setPaymentCompleted(true)
    
    // Simulate payment processing
    setTimeout(async () => {
      try {
        const response = await fetch("/api/transactions/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            amount: Number.parseFloat(amount),
            paymentId: paymentId,
            type: "add_funds"
          }),
        })

        if (response.ok) {
          // Update the balance in the context
          addFunds(Number.parseFloat(amount))
          alert("Payment completed! Funds added to your wallet.")
          setAmount("")
          setShowQRCode(false)
          setPaymentCompleted(false)
          setQrCodeDataURL("")
          setPaymentId("")
        } else {
          alert("Payment failed. Please try again.")
        }
      } catch (error) {
        console.error("Error processing payment:", error)
        alert("Payment processing failed. Please try again.")
      }
    }, 2000)
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
                {isLoading ? "Generating Payment..." : "Generate Payment QR"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* QR Code Payment Section */}
        {showQRCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Payment QR Code
                </CardTitle>
                <CardDescription>
                  Scan this QR code with your payment app to complete the transaction
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-lg">
                    <img 
                      src={qrCodeDataURL} 
                      alt="Payment QR Code" 
                      className="w-64 h-64"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Amount: ₹{amount}</p>
                  <p className="text-sm text-muted-foreground">Payment ID: {paymentId}</p>
                </div>

                {!paymentCompleted ? (
                  <Button 
                    onClick={handlePaymentComplete}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Payment Done
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Payment Processing...</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Please wait while we process your payment
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

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

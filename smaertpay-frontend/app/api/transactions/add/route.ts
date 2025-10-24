import { type NextRequest, NextResponse } from "next/server"

// Mock database
const transactions: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { amount, paymentId, type } = await request.json()
    
    // For demo purposes, use a default userId
    const userId = "demo_user_123"

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 })
    }

    // Create transaction record
    const transaction = {
      _id: Math.random().toString(36).substr(2, 9),
      userId,
      type: type || "credit",
      amount,
      description: paymentId ? `Wallet top-up via QR payment (${paymentId})` : "Added to wallet",
      paymentId: paymentId || null,
      date: new Date(),
      status: "completed",
    }

    transactions.push(transaction)

    return NextResponse.json({
      message: "Money added successfully",
      transaction,
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

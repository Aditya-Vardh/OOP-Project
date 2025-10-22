import { type NextRequest, NextResponse } from "next/server"

// Mock database
const transactions: any[] = []

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Decode mock token (base64 encoded JSON)
    let userId: string
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"))
      userId = decoded.userId
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { amount } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 })
    }

    // Create transaction record
    const transaction = {
      _id: Math.random().toString(36).substr(2, 9),
      userId,
      type: "credit",
      amount,
      description: "Added to wallet",
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

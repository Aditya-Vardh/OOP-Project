import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { recipient, amount, description } = await request.json()

    // Validation
    if (!recipient || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const parsedAmount = Number.parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // In production, this would:
    // 1. Verify the sender has sufficient balance
    // 2. Find the recipient user
    // 3. Create transaction records
    // 4. Update both users' balances
    // 5. Log the transaction

    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      recipient,
      amount: parsedAmount,
      description,
      status: "completed",
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Send money error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

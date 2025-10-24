import { type NextRequest, NextResponse } from "next/server"

// Mock database
const transactions: any[] = []

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Decode mock token (base64 encoded JSON)
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"))

      // Return mock transactions
      const userTransactions = [
        {
          id: "1",
          type: "sent",
          recipient: "Suresh Kumar",
          amount: 50.0,
          date: "Today at 2:30 PM",
          status: "completed",
        },
        {
          id: "2",
          type: "received",
          recipient: "Ramesh Sharma",
          amount: 100.0,
          date: "Yesterday at 10:15 AM",
          status: "completed",
        },
      ]

      return NextResponse.json({
        transactions: userTransactions,
      })
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In production, this would:
    // 1. Get the authenticated user from the token
    // 2. Query the database for their transactions
    // 3. Apply filters and pagination

    const transactions = [
      {
        id: "1",
        type: "sent",
        recipient: "Vijay Singh",
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

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Get history error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

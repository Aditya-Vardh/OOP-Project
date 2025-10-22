import { type NextRequest, NextResponse } from "next/server"

// Mock database
const users: any[] = []

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

      // In production, find user from database
      // For now, return mock user data
      return NextResponse.json({
        user: {
          id: decoded.userId,
          email: decoded.email,
          name: "User",
          walletBalance: 12450.5,
        },
      })
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
}

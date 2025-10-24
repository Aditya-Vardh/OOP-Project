import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
const users: Array<{ id: string; email: string; password: string; name: string }> = []

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate mock token
    const token = Buffer.from(JSON.stringify({ userId: user.id, email })).toString("base64")

    return NextResponse.json({
      token,
      user: { id: user.id, email, name: user.name },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
const users: Array<{ id: string; email: string; password: string; name: string }> = []

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Create user
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password, // In production, hash this!
      name,
    }

    users.push(user)

    // Generate mock token
    const token = Buffer.from(JSON.stringify({ userId: user.id, email })).toString("base64")

    return NextResponse.json(
      {
        token,
        user: { id: user.id, email, name },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

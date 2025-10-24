import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await connectDB(); // 👈 This triggers connection
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB(); // 👈 This too
  const body = await req.json();
  const newUser = await User.create(body);
  return NextResponse.json(newUser);
}

import { NextResponse } from "next/server"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"



export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body



    const user = await prisma.user.findUnique({
      where: { email }
    })



    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    )

    console.log("toekn ", token)

    return NextResponse.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

  } catch (error) {
  console.error("LOGIN ERROR:", error) // 👈 terminal me dikhega

  return NextResponse.json(
    { error: "Server error", details: String(error) },
    { status: 500 }
  )
}
}
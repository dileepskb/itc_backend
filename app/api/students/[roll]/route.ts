import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ roll: string }> }
) {
  const { roll } = await context.params  // 🔥 important fix

  console.log("ROLL:", roll)

  if (!roll) {
    return NextResponse.json({ error: "Roll missing" }, { status: 400 })
  }

  const data = await prisma.student.findUnique({
    where: {
      roll: roll
    }
  })

  return NextResponse.json(data)
}
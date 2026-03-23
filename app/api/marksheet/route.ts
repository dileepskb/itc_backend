import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const data = await prisma.marksheet.findMany({
    include: {
      student: true,
    },
    orderBy: [
       { id: 'desc' },  // Primary sort by age ascending
    ],
  })
  return NextResponse.json(data)
}

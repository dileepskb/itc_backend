import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") || ""

  if (!query) {
    return NextResponse.json([])
  }

  const students = await prisma.student.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          roll: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          course: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 10, // 🔥 limit results
  })

  return NextResponse.json(students)
}
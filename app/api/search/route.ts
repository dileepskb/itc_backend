import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") || ""

  if (!query) {
    return NextResponse.json([])
  }


  console.log(query)

  const cleanQuery = query.trim()
  const students = await prisma.student.findMany({
    where: {
      OR: [
        {
          name: {
            contains: cleanQuery,
            mode: "insensitive",
          },
        },
        {
          roll: {
            contains: cleanQuery,
            mode: "insensitive",
          },
        }
      ],
    },
    take: 10, // 🔥 limit results
  })

  return NextResponse.json(students)
}
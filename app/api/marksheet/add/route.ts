import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 🔥 student find
    const student = await prisma.student.findUnique({
      where: { roll: body.roll }
    })

    if (!student) {
      return Response.json(
        { error: "Student not found" },
        { status: 404 }
      )
    }

    const marksheet = await prisma.marksheet.upsert({
      where: { roll: body.roll },
      update: {},
      create: {
        roll: body.roll,
        title: body.title,
        com: body.com,
        ms: body.ms,
        accounting: body.accounting,
        dtp: body.dtp,
        it: body.it,
        studentId: student.id
      }
    })

    return Response.json({
      success: true,
      data: marksheet
    })

  } catch (error) {
    console.error("MARKSHEET ERROR:", error)

    return Response.json(
      { error: "Failed to create marksheet" },
      { status: 500 }
    )
  }
}
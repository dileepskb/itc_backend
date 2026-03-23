import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log(body)
    // 🔥 student find
    const student = await prisma.student.findUnique({
      where: { id: body.studentId }
    })

    if (!student) {
      return Response.json(
        { error: "Student not found" },
        { status: 404 }
      )
    }

    const marksheet = await prisma.marksheet.create({
      data: {
        roll: student.roll,
        title: body.title,
        com: Number(body.com),
        ms:  Number(body.ms),
        accounting:  Number(body.accounting),
        dtp:  Number(body.dtp),
        it:  Number(body.it),
        studentId:  Number(student.id)
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
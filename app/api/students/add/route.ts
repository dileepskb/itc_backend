import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(body)

    const student = await prisma.student.upsert({
      where: { roll: body.roll },
      update: {},
      create: {
        name: body.name,
        roll: body.roll,
        course: body.course,
        so: body.so,
        session: body.session,
        studycentre: body.studycentre,
        issue: body.issue,
        birth: body.birth,
        during: body.during,
        endDate: body.end_date,
        pass: body.pass,
        image: body.image,
      }
    })

    return Response.json({
      success: true,
      data: student
    })

  } catch (error) {
    console.error("STUDENT CREATE ERROR:", error)

    return Response.json(
      { error: "Failed to create student" },
      { status: 500 }
    )
  }
}
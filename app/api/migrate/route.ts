import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const studentsData = body.students || []
    const marksheetsData = body.marksheets || []

    // 1️⃣ Insert Students
    for (const s of studentsData) {
      await prisma.student.upsert({
        where: { roll: s.roll },
        update: {},
        create: {
          name: s.title,
          roll: s.roll,
          course: s.course,
          so: s.so,
          session: s.session,
          issue: s.issue,
          birth: s.birth,
          during: s.during,
          endDate: s.end_date,
          pass: s.pass,
          image: s.image,
        }
      })
    }

    // 2️⃣ Insert Marksheet
    for (const m of marksheetsData) {
      const student = await prisma.student.findUnique({
        where: { roll: m.roll }
      })

      if (!student) continue

      await prisma.marksheet.upsert({
        where: { roll: m.roll },
        update: {},
        create: {
          roll: m.roll,
          title: m.title,
          com: m.com,
          ms: m.ms,
          accounting: m.accounting,
          dtp: m.dtp,
          it: m.it,
          studentId: student.id
        }
      })
    }

    return Response.json({ success: true })

  } catch (error) {
    console.error(error)
    return Response.json({ error: "Migration failed" }, { status: 500 })
  }
}
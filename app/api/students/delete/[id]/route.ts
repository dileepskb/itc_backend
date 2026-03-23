import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    // 🔥 delete related marksheet first (if exists)
    // await prisma.marksheet.deleteMany({
    //   where: { studentId: Number(id) }
    // })

    const student = await prisma.student.delete({
      where: { id: Number(id) }
    })

    return Response.json({
      success: true,
      data: student
    })

  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error)

    return Response.json(
      { error: "Failed to delete student" },
      { status: 500 }
    )
  }
}
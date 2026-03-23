import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const marksheet = await prisma.marksheet.delete({
      where: { id: Number(id) }
    })

    return Response.json({
      success: true,
      data: marksheet
    })

  } catch (error) {
    console.error("DELETE MARKSHEET ERROR:", error)

    return Response.json(
      { error: "Failed to delete marksheet" },
      { status: 500 }
    )
  }
}
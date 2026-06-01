import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Database query
  const student = await prisma.student.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json({
    success: true,
    student,
    message: "Property found",
  });
}





export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const student = await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        roll: body.roll,
        course: body.course,
        so: body.so,
        session: body.session,
        studycentre: body.studycentre,
        issue: body.issue,
        birth: body.birth,
        during: body.during,
        endDate: body.endDate,
        pass: body.pass,
        image: body.image,
      },
    });

    return NextResponse.json({
      success: true,
      student,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update student",
      },
      {
        status: 500,
      }
    );
  }
}
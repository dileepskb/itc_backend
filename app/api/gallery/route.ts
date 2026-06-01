import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

const uploadDir = path.join(
  process.cwd(),
  "public",
  "uploads"
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads"
    );

    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;

    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);


    await prisma.gallery.create({
        data: {
            imageUrl: `/uploads/${fileName}`,
        },
     });


    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await fs.mkdir(uploadDir, { recursive: true });

    const files = await fs.readdir(uploadDir);

    const images = await prisma.gallery.findMany()

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
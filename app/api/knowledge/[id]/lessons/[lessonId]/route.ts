import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string; lessonId: string }> }) {
  try {
    const { id, lessonId } = await params;
    const body = await req.json();

    const lesson = await prisma.knowledgeLesson.update({
      where: { id: lessonId, topicId: id },
      data: body,
    });

    return NextResponse.json({ success: true, lesson }, { status: 200 });
  } catch (error: any) {
    console.error("[PUT KNOWLEDGE LESSON ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string; lessonId: string }> }) {
  try {
    const { id, lessonId } = await params;
    await prisma.knowledgeLesson.delete({
      where: { id: lessonId, topicId: id },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[DELETE KNOWLEDGE LESSON ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

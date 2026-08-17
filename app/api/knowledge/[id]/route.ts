import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // We just update topic fields here. Lessons will have their own endpoints.
    const { lessons, ...topicFields } = body;

    const topic = await prisma.knowledgeTopic.update({
      where: { id },
      data: topicFields,
      include: {
        lessons: true,
      }
    });

    return NextResponse.json({ success: true, topic }, { status: 200 });
  } catch (error: any) {
    console.error("[PUT KNOWLEDGE TOPIC ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.knowledgeTopic.delete({
      where: { id },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[DELETE KNOWLEDGE TOPIC ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

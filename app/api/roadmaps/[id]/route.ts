import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // For simplicity, we just update roadmap fields. 
    // To update nodes, we'd delete and recreate them or do upserts.
    const { nodes, ...roadmapFields } = body;

    const roadmap = await prisma.roadmap.update({
      where: { id },
      data: roadmapFields,
      include: {
        nodes: true,
      }
    });

    return NextResponse.json({ success: true, roadmap }, { status: 200 });
  } catch (error: any) {
    console.error("[PUT ROADMAP ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.roadmap.delete({
      where: { id },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[DELETE ROADMAP ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

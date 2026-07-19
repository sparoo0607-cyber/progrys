import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const roadmaps = await prisma.roadmap.findMany({
      include: {
        nodes: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(roadmaps, { status: 200 });
  } catch (error: any) {
    console.error("[GET ROADMAPS ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, title, description, difficulty, estimatedTime, nodes } = body;

    const roadmap = await prisma.roadmap.create({
      data: {
        slug,
        title,
        description,
        difficulty,
        estimatedTime,
        nodes: {
          create: nodes.map((node: any) => ({
            title: node.title,
            description: node.description,
          })),
        },
      },
      include: {
        nodes: true,
      },
    });

    return NextResponse.json({ success: true, roadmap }, { status: 201 });
  } catch (error: any) {
    console.error("[POST ROADMAP ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

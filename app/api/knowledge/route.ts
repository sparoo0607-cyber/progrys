import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const topics = await prisma.knowledgeTopic.findMany({
      include: {
        lessons: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(topics, { status: 200 });
  } catch (error: any) {
    console.error("[GET KNOWLEDGE TOPICS ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, title, description, iconName, lessons } = body;

    const topic = await prisma.knowledgeTopic.create({
      data: {
        slug,
        title,
        description,
        iconName,
        lessons: {
          create: (lessons || []).map((lesson: any) => ({
            slug: lesson.slug,
            title: lesson.title,
            explanationHtml: lesson.explanationHtml,
            codeExample: lesson.codeExample,
            tryItDefault: lesson.tryItDefault,
          })),
        },
      },
      include: {
        lessons: true,
      },
    });

    return NextResponse.json({ success: true, topic }, { status: 201 });
  } catch (error: any) {
    console.error("[POST KNOWLEDGE TOPIC ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

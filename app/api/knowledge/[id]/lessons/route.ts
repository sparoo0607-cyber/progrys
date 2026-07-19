import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { slug, title, explanationHtml, codeExample, tryItDefault } = body;

    const lesson = await prisma.knowledgeLesson.create({
      data: {
        slug,
        title,
        explanationHtml,
        codeExample,
        tryItDefault,
        topicId: id,
      },
    });

    return NextResponse.json({ success: true, lesson }, { status: 201 });
  } catch (error: any) {
    console.error("[POST KNOWLEDGE LESSON ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

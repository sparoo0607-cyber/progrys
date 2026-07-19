import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const { status, title, excerpt, content, category, tags, readTime, likes } = body;

    const dataToUpdate: any = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (title !== undefined) dataToUpdate.title = title;
    if (excerpt !== undefined) dataToUpdate.excerpt = excerpt;
    if (content !== undefined) dataToUpdate.content = content;
    if (category !== undefined) dataToUpdate.category = category;
    if (tags !== undefined) dataToUpdate.tags = JSON.stringify(tags);
    if (readTime !== undefined) dataToUpdate.readTime = readTime;
    if (likes !== undefined) dataToUpdate.likes = likes;

    const blog = await prisma.blog.update({
      where: { id },
      data: dataToUpdate,
    });

    const formattedBlog = {
      ...blog,
      tags: JSON.parse(blog.tags),
    };

    return NextResponse.json({ success: true, blog: formattedBlog }, { status: 200 });
  } catch (error: any) {
    console.error("[PUT BLOG ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[DELETE BLOG ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

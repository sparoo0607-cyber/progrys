import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formattedBlogs = blogs.map(blog => ({
      ...blog,
      tags: JSON.parse(blog.tags),
    }));

    return NextResponse.json(formattedBlogs, { status: 200 });
  } catch (error: any) {
    console.error("[GET BLOGS ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, authorName, category, tags, readTime } = body;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        authorName,
        category,
        tags: JSON.stringify(tags || []),
        readTime: readTime || 5,
        status: "pending",
        likes: 0,
      },
    });

    const formattedBlog = {
      ...blog,
      tags: JSON.parse(blog.tags),
    };

    return NextResponse.json({ success: true, blog: formattedBlog }, { status: 201 });
  } catch (error: any) {
    console.error("[POST BLOG ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

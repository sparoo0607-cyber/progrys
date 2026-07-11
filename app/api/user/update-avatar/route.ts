import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// We'll receive a base64 image or form data.
// Since Next.js API routes with App Router support JSON easily, we'll accept base64 for now.
// For production, Uploadthing or S3 is better.
export async function POST(req: Request) {
  try {
    const { email, avatarBase64 } = await req.json();

    if (!email || !avatarBase64) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { avatar: avatarBase64 },
    });

    const { passwordHash: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error: any) {
    console.error("[UPDATE AVATAR ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

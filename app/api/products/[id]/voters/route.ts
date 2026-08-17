import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const votes = await prisma.productVote.findMany({
      where: { productId: id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    const likes = votes.filter(v => v.type === "like").map(v => v.user);
    const dislikes = votes.filter(v => v.type === "dislike").map(v => v.user);

    return NextResponse.json({ likes, dislikes }, { status: 200 });
  } catch (error: any) {
    console.error("[GET VOTERS ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

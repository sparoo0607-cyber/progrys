import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { userId, type } = await req.json(); // type is "like", "dislike", or "remove"

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 401 });
    }

    // 1. Get current vote if any
    const existingVote = await prisma.productVote.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: id
        }
      }
    });

    const previousType = existingVote?.type;

    // 2. Perform the update in a transaction
    await prisma.$transaction(async (tx) => {
      // Handle the Vote Record
      if (type === "remove") {
        if (existingVote) {
          await tx.productVote.delete({
            where: { id: existingVote.id }
          });
        }
      } else {
        await tx.productVote.upsert({
          where: {
            userId_productId: {
              userId,
              productId: id
            }
          },
          update: { type },
          create: {
            userId,
            productId: id,
            type
          }
        });
      }

      // Handle the Product Counts
      let likesIncrement = 0;
      let dislikesIncrement = 0;

      if (type === "remove") {
        if (previousType === "like") likesIncrement = -1;
        if (previousType === "dislike") dislikesIncrement = -1;
      } else if (type === "like") {
        if (previousType !== "like") likesIncrement = 1;
        if (previousType === "dislike") dislikesIncrement = -1;
      } else if (type === "dislike") {
        if (previousType !== "dislike") dislikesIncrement = 1;
        if (previousType === "like") likesIncrement = -1;
      }

      if (likesIncrement !== 0 || dislikesIncrement !== 0) {
        // Prevent negative values
        const product = await tx.product.findUnique({ where: { id } });
        if (product) {
          await tx.product.update({
            where: { id },
            data: {
              likes: Math.max(0, product.likes + likesIncrement),
              dislikes: Math.max(0, product.dislikes + dislikesIncrement)
            }
          });
        }
      }
    });

    // Return the fresh product
    const freshProduct = await prisma.product.findUnique({ where: { id } });

    return NextResponse.json({ success: true, product: freshProduct }, { status: 200 });
  } catch (error: any) {
    console.error("[POST VOTE ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

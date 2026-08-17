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

      // Handle the Product Counts by strictly counting the records
      const likeCount = await tx.productVote.count({ where: { productId: id, type: "like" } });
      const dislikeCount = await tx.productVote.count({ where: { productId: id, type: "dislike" } });

      await tx.product.update({
        where: { id },
        data: {
          likes: likeCount,
          dislikes: dislikeCount
        }
      });
    });

    // Return the fresh product
    const freshProduct = await prisma.product.findUnique({ where: { id } });

    return NextResponse.json({ success: true, product: freshProduct }, { status: 200 });
  } catch (error: any) {
    console.error("[POST VOTE ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.affiliateProduct.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("[GET AFFILIATES ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, originalPrice, imageUrl, url, platform, category } = body;

    const product = await prisma.affiliateProduct.create({
      data: {
        title,
        description,
        price,
        originalPrice,
        imageUrl,
        url,
        platform,
        category,
        rating: 0,
        reviewCount: 0,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("[POST AFFILIATE ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

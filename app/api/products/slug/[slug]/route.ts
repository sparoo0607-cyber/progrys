import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const product = await prisma.product.findFirst({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formattedProduct = {
      ...product,
      images: JSON.parse(product.images),
      tags: JSON.parse(product.tags),
      fileFormats: JSON.parse(product.fileFormats),
      features: product.features ? JSON.parse(product.features) : [],
      downloadFile: product.downloadFileName ? {
        name: product.downloadFileName,
        dataUrl: product.downloadFileUrl || "",
        size: product.downloadFileSize || 0,
        type: product.downloadFileType || "application/octet-stream",
      } : undefined
    };

    return NextResponse.json(formattedProduct, { status: 200 });
  } catch (error: any) {
    console.error("[GET PRODUCT BY SLUG ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

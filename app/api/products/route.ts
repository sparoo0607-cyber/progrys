import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    // Parse JSON strings back to arrays
    const formattedProducts = products.map((p: any) => ({
      ...p,
      images: JSON.parse(p.images),
      tags: JSON.parse(p.tags),
      fileFormats: JSON.parse(p.fileFormats),
      features: p.features ? JSON.parse(p.features) : [],
      downloadFile: p.downloadFileName ? {
        name: p.downloadFileName,
        dataUrl: p.downloadFileUrl || "",
        size: p.downloadFileSize || 0,
        type: p.downloadFileType || "application/octet-stream",
      } : undefined
    }));

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error: any) {
    console.error("[GET PRODUCTS ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { 
      title, slug, description, price, originalPrice, 
      images, coverImage, tags, rating, reviewCount, 
      isFree, category, fileFormats, downloadFile, features,
      likes, dislikes 
    } = body;

    const product = await prisma.product.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        description,
        price,
        originalPrice,
        coverImage,
        images: JSON.stringify(images || []),
        tags: JSON.stringify(tags || []),
        rating: rating || 0,
        reviewCount: reviewCount || 0,
        isFree: isFree || false,
        category,
        fileFormats: JSON.stringify(fileFormats || []),
        features: JSON.stringify(features || []),
        likes: likes || 0,
        dislikes: dislikes || 0,
        downloadFileName: downloadFile?.name,
        downloadFileUrl: downloadFile?.dataUrl,
        downloadFileSize: downloadFile?.size,
        downloadFileType: downloadFile?.type,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("[POST PRODUCT ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

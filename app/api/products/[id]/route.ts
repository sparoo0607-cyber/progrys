import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
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
    console.error("[GET PRODUCT ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Extract everything that can be updated
    const { 
      title, slug, description, price, originalPrice, 
      images, coverImage, tags, rating, reviewCount, 
      isFree, category, fileFormats, downloadFile, features 
    } = body;

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (slug !== undefined) dataToUpdate.slug = slug;
    if (description !== undefined) dataToUpdate.description = description;
    if (price !== undefined) dataToUpdate.price = price;
    if (originalPrice !== undefined) dataToUpdate.originalPrice = originalPrice;
    if (coverImage !== undefined) dataToUpdate.coverImage = coverImage;
    if (images !== undefined) dataToUpdate.images = JSON.stringify(images);
    if (tags !== undefined) dataToUpdate.tags = JSON.stringify(tags);
    if (rating !== undefined) dataToUpdate.rating = rating;
    if (reviewCount !== undefined) dataToUpdate.reviewCount = reviewCount;
    if (isFree !== undefined) dataToUpdate.isFree = isFree;
    if (category !== undefined) dataToUpdate.category = category;
    if (fileFormats !== undefined) dataToUpdate.fileFormats = JSON.stringify(fileFormats);
    if (features !== undefined) dataToUpdate.features = JSON.stringify(features);
    
    if (downloadFile !== undefined) {
      if (downloadFile === null) {
        dataToUpdate.downloadFileName = null;
        dataToUpdate.downloadFileUrl = null;
        dataToUpdate.downloadFileSize = null;
        dataToUpdate.downloadFileType = null;
      } else {
        dataToUpdate.downloadFileName = downloadFile.name;
        // Only update dataUrl if a new one is provided (not empty string which means keep existing or just metadata)
        if (downloadFile.dataUrl) dataToUpdate.downloadFileUrl = downloadFile.dataUrl;
        dataToUpdate.downloadFileSize = downloadFile.size;
        dataToUpdate.downloadFileType = downloadFile.type;
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error: any) {
    console.error("[PUT PRODUCT ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[DELETE PRODUCT ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

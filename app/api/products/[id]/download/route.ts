import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Fetch ONLY the download file url and name to save memory
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        downloadFileName: true,
        downloadFileUrl: true,
        downloadFileType: true,
        isFree: true,
      }
    });

    if (!product || !product.downloadFileUrl) {
      return NextResponse.json({ error: "Download file not found" }, { status: 404 });
    }

    return NextResponse.json({
      dataUrl: product.downloadFileUrl,
      fileName: product.downloadFileName,
      fileType: product.downloadFileType
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("[GET PRODUCT DOWNLOAD ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

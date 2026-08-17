import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { 
        firstName, 
        lastName 
      },
    });

    return NextResponse.json({ 
      success: true,
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error("[UPDATE PROFILE ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

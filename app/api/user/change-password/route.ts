import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, currentPassword, newPassword } = await req.json();

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "User not found or missing password" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { passwordHash: newPasswordHash },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[CHANGE PASSWORD ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

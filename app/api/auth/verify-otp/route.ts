import { NextResponse } from "next/server";
import { otpStore } from "@/lib/email/otpStore";
// POST /api/auth/verify-otp — verifies the submitted OTP
export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    const record = otpStore.get(email.toLowerCase());

    if (!record) {
      return NextResponse.json({ error: "No OTP found for this email. Please request a new one." }, { status: 404 });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email.toLowerCase());
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 410 });
    }

    if (record.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 401 });
    }

    // OTP valid — clean up and confirm
    otpStore.delete(email.toLowerCase());
    return NextResponse.json({ success: true, firstName: record.firstName });
  } catch (err) {
    console.error("[verify-otp]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email/sendVerification";
import { otpStore } from "@/lib/email/otpStore";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/send-otp — sends OTP to email
export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: "Email and name are required." }, { status: 400 });
    }

    // Check API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
      console.error("[send-otp] RESEND_API_KEY is not configured.");
      return NextResponse.json({ error: "Email service is not configured. Please contact support." }, { status: 503 });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(email.toLowerCase(), { otp, firstName, expiresAt });

    const result = await sendVerificationEmail(email, firstName, otp);

    if (!result.success) {
      // Return the actual Resend error message to help debug
      const resendError = (result.error as any)?.message || JSON.stringify(result.error);
      console.error("[send-otp] Resend error:", resendError);
      return NextResponse.json(
        { error: `Failed to send email: ${resendError}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[send-otp] Unexpected error:", err);
    return NextResponse.json({ error: err?.message || "Internal server error." }, { status: 500 });
  }
}

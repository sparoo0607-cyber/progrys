import { Resend } from "resend";

export async function sendVerificationEmail(
  email: string,
  firstName: string,
  otp: string
) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "PROGRYS <noreply@progrys.in>",
      to: [email],
      subject: "Verify your PROGRYS account",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verify your email</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 0; }
            .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
            .header { background: #0A0A0A; padding: 32px 40px; }
            .logo { color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
            .logo span { color: #2563EB; }
            .body { padding: 40px; }
            h1 { color: #0A0A0A; font-size: 24px; font-weight: 700; margin: 0 0 8px; }
            p { color: #71717A; font-size: 15px; line-height: 1.6; margin: 0 0 24px; }
            .otp-box { background: #F4F4F5; border-radius: 12px; padding: 24px; text-align: center; margin: 32px 0; }
            .otp { font-size: 48px; font-weight: 800; letter-spacing: 12px; color: #0A0A0A; font-family: monospace; }
            .otp-note { font-size: 13px; color: #A1A1AA; margin-top: 8px; }
            .footer { background: #F4F4F5; padding: 24px 40px; text-align: center; }
            .footer p { font-size: 12px; color: #A1A1AA; margin: 0; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo">PROG<span>RYS</span></div>
            </div>
            <div class="body">
              <h1>Verify your email, ${firstName}! 👋</h1>
              <p>Thanks for signing up. Enter the code below to verify your email address and get started on your learning journey.</p>
              <div class="otp-box">
                <div class="otp">${otp}</div>
                <div class="otp-note">This code expires in 10 minutes</div>
              </div>
              <p>If you didn't create a PROGRYS account, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} PROGRYS. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("[Resend] Failed to send verification email:", err);
    return { success: false, error: err };
  }
}

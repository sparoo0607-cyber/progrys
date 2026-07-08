// Shared in-memory OTP store across API routes.
// Uses a module-level singleton so that both send-otp and verify-otp
// share the same Map instance within a single server process.
// In production, replace this with Redis, Upstash, or a database.

export interface OTPRecord {
  otp: string;
  firstName: string;
  expiresAt: number;
}

export const otpStore = new Map<string, OTPRecord>();

"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type Step = "details" | "verify";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [step, setStep] = React.useState<Step>("details");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(0);

  // Form fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const otpRefs = Array.from({ length: 6 }, () => React.useRef<HTMLInputElement>(null));

  // ── OTP auto-focus logic ──
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs[index + 1].current?.focus();
    if (!value && index > 0) otpRefs[index - 1].current?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs[5].current?.focus();
    }
    e.preventDefault();
  };

  // ── Resend timer ──
  React.useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // ── Step 1: Submit details → send OTP ──
  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    setIsLoading(true);
    try {
      // 1. Register the user in the database
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const regData = await regRes.json();
      if (!regRes.ok) {
        if (regData.error === "Email already in use") {
           // We can just proceed to send OTP if they are registering again?
           // Actually, throw the error
           throw new Error(regData.error);
        }
        throw new Error(regData.error || "Failed to register.");
      }

      // 2. Send OTP
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP.");
      setStep("verify");
      setResendTimer(60);
      toast.success("Verification code sent! Check your inbox.");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Step 2: Verify OTP → create account ──
  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { toast.error("Please enter all 6 digits."); return; }
    setIsLoading(true);
    try {
      // 1. Verify OTP
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed.");

      // 2. Login the user to get the DB user object
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.error || "Failed to login after verification.");

      // ── Account created — log the user in ──
      login(loginData.user);
      toast.success(`Welcome to PROGRYS, ${firstName}! 🎉`);
      router.push("/library");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOtp(["", "", "", "", "", ""]);
      setResendTimer(60);
      toast.success("New code sent!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center items-center min-h-[80vh]">
      <AnimatedSection className="w-full max-w-md">

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {(["details", "verify"] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === s ? "text-[var(--foreground)]" : step === "verify" && s === "details" ? "text-[#2563EB]" : "text-[var(--text-muted)]"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === s ? "bg-[#2563EB] text-white" : step === "verify" && s === "details" ? "bg-green-500 text-white" : "bg-[var(--alt-section)] text-[var(--text-muted)]"}`}>
                  {step === "verify" && s === "details" ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s === "details" ? "Your Details" : "Verify Email"}</span>
              </div>
              {i === 0 && <div className={`flex-1 h-px max-w-[60px] transition-colors ${step === "verify" ? "bg-[#2563EB]" : "bg-[var(--border-color)]"}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: Details ── */}
            {step === "details" && (
              <motion.div key="details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight mb-2">Create your account</h1>
                  <p className="text-[var(--text-secondary)] text-sm">Join thousands of students leveling up their careers.</p>
                </div>

                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="firstName">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                        <input id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 text-sm"
                          placeholder="Alex" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="lastName">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                        <input id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 text-sm"
                          placeholder="Chen" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="email">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                      <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 text-sm"
                        placeholder="you@example.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="password">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                      <input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 text-sm"
                        placeholder="Min. 8 characters" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Password strength indicator */}
                    {password.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {[8, 12, 16].map((threshold, i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${password.length >= threshold ? ["bg-red-400", "bg-yellow-400", "bg-green-500"][i] : "bg-[var(--border-color)]"}`} />
                        ))}
                        <span className="text-xs text-[var(--text-muted)] ml-1">{password.length < 8 ? "Weak" : password.length < 12 ? "Fair" : "Strong"}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-muted)]">
                    By signing up, you agree to our{" "}
                    <Link href="#" className="text-[#2563EB] hover:underline">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="#" className="text-[#2563EB] hover:underline">Privacy Policy</Link>.
                  </p>

                  <Button type="submit" variant="primary" className="w-full gap-2 mt-2" disabled={isLoading}>
                    {isLoading ? <><Loader2 size={16} className="animate-spin" /> Sending code...</> : <>Continue <ArrowRight size={16} /></>}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="font-medium text-[#2563EB] hover:underline">Sign in</Link>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Verify OTP ── */}
            {step === "verify" && (
              <motion.div key="verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#2563EB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail size={28} className="text-[#2563EB]" />
                  </div>
                  <h1 className="text-2xl font-bold text-[var(--foreground)] tracking-tight mb-2">Check your inbox</h1>
                  <p className="text-[var(--text-secondary)] text-sm">
                    We sent a 6-digit code to <strong className="text-[var(--foreground)]">{email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifySubmit} className="space-y-6">
                  {/* OTP Input Boxes */}
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={otpRefs[i]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onPaste={i === 0 ? handleOtpPaste : undefined}
                        onKeyDown={(e) => { if (e.key === "Backspace" && !digit && i > 0) otpRefs[i - 1].current?.focus(); }}
                        className={`w-12 h-14 text-center text-2xl font-bold bg-[var(--input-bg)] border-2 rounded-xl text-[var(--foreground)] focus:outline-none transition-all ${digit ? "border-[#2563EB] bg-[#2563EB]/5" : "border-[var(--border-color)] focus:border-[#2563EB]"}`}
                      />
                    ))}
                  </div>

                  <Button type="submit" variant="primary" className="w-full gap-2" disabled={isLoading || otp.join("").length < 6}>
                    {isLoading ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : <>Verify & Create Account <CheckCircle2 size={16} /></>}
                  </Button>

                  <div className="text-center text-sm text-[var(--text-secondary)]">
                    Didn't receive a code?{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendTimer > 0 || isLoading}
                      className={`font-medium transition-colors ${resendTimer > 0 ? "text-[var(--text-muted)] cursor-not-allowed" : "text-[#2563EB] hover:underline"}`}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
                    </button>
                  </div>

                  <button type="button" onClick={() => setStep("details")} className="w-full text-sm text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
                    ← Change email address
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </AnimatedSection>
    </div>
  );
}

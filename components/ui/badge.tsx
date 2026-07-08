import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "category" | "new" | "free" | "trending" | "beginner" | "intermediate" | "advanced" | "secondary";
}

export function Badge({ className, variant = "category", ...props }: BadgeProps) {
  const variants = {
    category: "bg-[#0A0A0A] text-[#FFFFFF]",
    new: "bg-[#0A0A0A] text-[#FFFFFF]",
    free: "bg-[#DCFCE7] text-[#16A34A]",
    trending: "bg-[#FEF9C3] text-[#CA8A04]",
    beginner: "bg-[#F0FDF4] text-[#16A34A]",
    intermediate: "bg-[#FFF7ED] text-[#EA580C]",
    advanced: "bg-[#FFF1F2] text-[#E11D48]",
    secondary: "bg-[var(--alt-section)] text-[var(--foreground)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

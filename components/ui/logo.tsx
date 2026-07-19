import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg h-6",
    md: "text-2xl h-8",
    lg: "text-4xl h-12"
  };

  return (
    <div className={cn(
      "flex items-stretch font-heading font-black tracking-widest uppercase select-none border-2 border-[var(--foreground)] overflow-hidden",
      sizeClasses[size],
      className
    )}>
      {/* PRO - White background, Black text (in light mode) */}
      <div className="bg-[var(--background)] text-[var(--foreground)] px-2 flex items-center justify-center">
        PRO
      </div>
      {/* GRYS - Black background, White text (in light mode) */}
      <div className="bg-[var(--foreground)] text-[var(--background)] px-2 flex items-center justify-center">
        GRYS
      </div>
    </div>
  );
}

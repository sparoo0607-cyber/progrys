"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", disabled, ...props }, ref) => {
    
    const variants = {
      primary: "bg-[var(--color-brand)] text-[var(--background)] hover:bg-[var(--text-secondary)] hover:shadow-md hover:shadow-black/10 dark:hover:shadow-white/5 shadow-sm",
      secondary: "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border-color)] hover:bg-[var(--alt-section)] shadow-sm",
      outline: "bg-transparent text-[var(--foreground)] border border-[var(--border-color)] hover:bg-[var(--alt-section)]",
      ghost: "bg-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--alt-section)]",
      danger: "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-sm",
      success: "bg-[#10B981] text-white hover:bg-[#059669] shadow-sm",
    };

    const sizes = {
      default: "h-11 px-6 py-2", 
      sm: "h-9 px-4 text-xs",
      lg: "h-14 px-8 text-base",
      icon: "h-11 w-11",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 active:scale-[0.97] hover:scale-[1.02] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100 disabled:hover:-translate-y-0",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

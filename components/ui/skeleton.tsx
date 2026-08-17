"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "avatar" | "image";
}

export function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton-shimmer rounded-md",
        {
          "h-4 w-full": variant === "text",
          "h-48 w-full rounded-xl": variant === "card" || variant === "image",
          "h-12 w-12 rounded-full": variant === "avatar",
        },
        className
      )}
      {...props}
    />
  );
}

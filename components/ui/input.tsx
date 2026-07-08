import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="w-full relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full rounded-lg bg-[#FFFFFF] px-4 py-3 text-sm text-[#0A0A0A] border transition-colors",
            "placeholder:text-[#A1A1AA]",
            "focus-visible:outline-none focus-visible:border-[1.5px] focus-visible:border-[#0A0A0A] focus-visible:ring-3 focus-visible:ring-black/8",
            "disabled:cursor-not-allowed disabled:opacity-40",
            "min-h-[48px]", // Mobile touch target size
            icon && "pl-10",
            error ? "border-[1.5px] border-[#EF4444]" : "border-[#E4E4E7]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-sm text-[#EF4444] mt-1 block">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

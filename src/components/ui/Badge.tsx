import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "cyan" | "blue" | "orange" | "green";
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        {
          "bg-white/10 text-white/80": variant === "default",
          "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30":
            variant === "cyan",
          "bg-blue-500/20 text-blue-400 border border-blue-500/30":
            variant === "blue",
          "bg-orange-500/20 text-orange-400 border border-orange-500/30":
            variant === "orange",
          "bg-green-500/20 text-green-400 border border-green-500/30":
            variant === "green",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

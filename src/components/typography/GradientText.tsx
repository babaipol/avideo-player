"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  from?: string;
  via?: string;
  to?: string;
}

export function GradientText({
  children,
  className,
  animated = false,
  from = "#00d4ff",
  via,
  to = "#6366f1",
}: GradientTextProps) {
  const gradient = via
    ? `linear-gradient(135deg, ${from}, ${via}, ${to})`
    : `linear-gradient(135deg, ${from}, ${to})`;

  if (animated) {
    return (
      <motion.span
        className={cn("inline-block", className)}
        style={{
          backgroundImage: `linear-gradient(135deg, ${from}, ${to}, ${from})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        animate={{
          backgroundPosition: ["0% center", "200% center", "0% center"],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span
      className={cn("inline-block", className)}
      style={{
        backgroundImage: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

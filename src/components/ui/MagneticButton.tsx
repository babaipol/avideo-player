"use client";

import { useRef, useCallback, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export function MagneticButton({
  children,
  className,
  strength = 0.25,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  fullWidth = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const btn = ref.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      posRef.current = { x: x * strength, y: y * strength };
      btn.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    },
    [strength, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    const btn = ref.current;
    if (!btn) return;
    btn.style.transition =
      "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    btn.style.transform = "translate(0, 0)";
    setTimeout(() => {
      if (btn) btn.style.transition = "";
    }, 500);
    posRef.current = { x: 0, y: 0 };
  }, []);

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
    outline:
      "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white",
    ghost: "text-gray-300 hover:text-white hover:bg-white/10",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ripple-effect",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/5 to-white/10 pointer-events-none" />
    </motion.button>
  );
}

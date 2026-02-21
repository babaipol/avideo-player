"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  );
}

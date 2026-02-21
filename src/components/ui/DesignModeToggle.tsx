"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSettingsStore } from "@/stores/settings-store";

export function DesignModeToggle() {
  const { designMode, setDesignMode } = useSettingsStore();

  return (
    <button
      onClick={() =>
        setDesignMode(designMode === "maximal" ? "minimal" : "maximal")
      }
      className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-xs font-medium text-gray-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      aria-label={`Switch to ${designMode === "maximal" ? "minimal" : "maximal"} mode`}
    >
      <AnimatePresence mode="wait">
        {designMode === "maximal" ? (
          <motion.span
            key="max"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center gap-1.5"
          >
            <span className="text-[10px]">⚡</span>
            <span className="hidden sm:inline">MAX</span>
          </motion.span>
        ) : (
          <motion.span
            key="min"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center gap-1.5"
          >
            <span className="text-[10px]">◦</span>
            <span className="hidden sm:inline">MIN</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

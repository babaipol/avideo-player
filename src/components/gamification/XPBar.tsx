"use client";

import { motion } from "framer-motion";
import { useGamificationStore } from "@/stores/gamification-store";

const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2000];

export function XPBar() {
  const { xp, level, achievements } = useGamificationStore();

  const currentThreshold = levelThresholds[Math.min(level - 1, levelThresholds.length - 1)] ?? 0;
  const nextThreshold = levelThresholds[Math.min(level, levelThresholds.length - 1)] ?? xp + 500;
  const progress =
    nextThreshold > currentThreshold
      ? ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100
      : 100;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-black">
          {level}
        </div>
        <div className="hidden sm:block">
          <div className="text-xs text-gray-400 leading-none">Level {level}</div>
          <div className="text-xs text-cyan-400 font-medium leading-none mt-0.5">
            {xp} XP
          </div>
        </div>
      </div>

      <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {unlockedCount > 0 && (
        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
          <span>🏆</span>
          <span>{unlockedCount}</span>
        </div>
      )}
    </div>
  );
}

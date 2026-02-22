"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore, type Achievement } from "@/stores/gamification-store";

export function AchievementToast() {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const [current, setCurrent] = useState<Achievement | null>(null);
  const achievements = useGamificationStore((s) => s.achievements);
  const prevAchievementsRef = useRef<Achievement[]>(achievements);

  useEffect(() => {
    const prev = prevAchievementsRef.current;
    const newlyUnlocked = achievements.filter(
      (a) => a.unlocked && !prev.find((p) => p.id === a.id && p.unlocked)
    );
    if (newlyUnlocked.length > 0) {
      setQueue((q) => [...q, ...newlyUnlocked]);
    }
    prevAchievementsRef.current = achievements;
  }, [achievements]);

  useEffect(() => {
    if (current || queue.length === 0) return;
    const next = queue[0];
    setCurrent(next);
    setQueue((q) => q.slice(1));

    const timer = setTimeout(() => {
      setCurrent(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, queue]);

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3"
      aria-live="polite"
    >
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative flex items-center gap-4 px-5 py-4 rounded-2xl bg-gray-900/95 border border-cyan-500/30 shadow-2xl shadow-black/50 backdrop-blur-xl max-w-xs"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent" />
            </div>

            <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-2xl achievement-pop">
              {current.icon}
            </div>

            <div className="relative flex-1 min-w-0">
              <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-0.5">
                Achievement Unlocked!
              </div>
              <div className="text-white font-semibold text-sm truncate">
                {current.title}
              </div>
              <div className="text-gray-400 text-xs mt-0.5 truncate">
                {current.description}
              </div>
              <div className="text-cyan-400 text-xs font-medium mt-1">
                +{current.xp} XP
              </div>
            </div>

            <button
              onClick={() => setCurrent(null)}
              className="relative flex-shrink-0 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-xs"
              aria-label="Dismiss achievement"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

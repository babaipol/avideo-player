"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useGamificationStore } from "@/stores/gamification-store";

export function KonamiEasterEgg() {
  const [show, setShow] = useState(false);
  const { unlockAchievement, konamiUnlocked, setKonamiUnlocked } =
    useGamificationStore();

  const activate = () => {
    if (!konamiUnlocked) {
      unlockAchievement("konami-master");
      setKonamiUnlocked(true);
    }
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  };

  useKonamiCode(activate);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="relative z-10 p-10 rounded-3xl bg-gray-900/95 border border-cyan-500/30 text-center max-w-sm mx-4 pointer-events-auto"
          >
            <div className="text-6xl mb-4 animate-bounce">🕵️</div>
            <h2 className="text-2xl font-black text-white mb-2">
              Secret Agent!
            </h2>
            <p className="text-gray-400 mb-4">
              You&apos;ve discovered the Konami Code easter egg! +500 XP awarded!
            </p>
            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ↑↑↓↓←→←→BA
            </div>
            <p className="text-xs text-gray-600 mt-3">
              The classic cheat code, reimagined for democracy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

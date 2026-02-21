"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useGamificationStore } from "@/stores/gamification-store";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AchievementsPanel() {
  const { achievements, xp, level } = useGamificationStore();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progressPct = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gray-900 overflow-hidden"
      id="achievements"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Gamification"
            title="Your Journey"
            description="Explore the site, take quizzes, and unlock achievements as you learn about I-PAC's impact on India's democracy."
            className="mb-12"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { label: "Level", value: level, icon: "⭐" },
            { label: "XP Earned", value: `${xp}`, icon: "⚡" },
            { label: "Badges", value: `${unlockedCount}/${achievements.length}`, icon: "🏆" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2 max-w-lg mx-auto">
            <span>Overall Progress</span>
            <span className="text-cyan-400 font-medium">{progressPct}%</span>
          </div>
          <div className="max-w-lg mx-auto h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: `${progressPct}%` } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className={`relative p-5 rounded-2xl border transition-all duration-300 text-center group ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
                  : "bg-white/3 border-white/8 opacity-60"
              }`}
            >
              {achievement.unlocked && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                </div>
              )}

              <div
                className={`text-4xl mb-3 transition-transform duration-300 ${
                  achievement.unlocked ? "group-hover:scale-110" : "grayscale opacity-40"
                }`}
              >
                {achievement.unlocked ? achievement.icon : "🔒"}
              </div>

              <div
                className={`text-sm font-bold mb-1 ${
                  achievement.unlocked ? "text-white" : "text-gray-500"
                }`}
              >
                {achievement.unlocked ? achievement.title : "???"}
              </div>

              {achievement.unlocked ? (
                <>
                  <p className="text-xs text-gray-400 leading-relaxed mb-2">
                    {achievement.description}
                  </p>
                  <div className="text-xs text-cyan-400 font-medium">
                    +{achievement.xp} XP
                  </div>
                  {achievement.unlockedAt && (
                    <div className="text-xs text-gray-600 mt-1">
                      {new Date(achievement.unlockedAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-xs text-gray-600">
                  Keep exploring to unlock
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-xs text-gray-600">
            💡 Try the Konami Code (↑↑↓↓←→←→BA) for a secret achievement!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

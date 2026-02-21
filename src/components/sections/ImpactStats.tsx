"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiUsers,
  FiBookOpen,
  FiBriefcase,
  FiMap,
  FiAward,
  FiPhone,
} from "react-icons/fi";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { impactStats } from "@/data/impact";
import { useGamificationStore } from "@/stores/gamification-store";
import { useSettingsStore } from "@/stores/settings-store";

const iconMap: Record<string, React.ElementType> = {
  users: FiUsers,
  graduation: FiBookOpen,
  briefcase: FiBriefcase,
  map: FiMap,
  trophy: FiAward,
  phone: FiPhone,
};

export function ImpactStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { unlockAchievement, visitSection } = useGamificationStore();
  const { designMode } = useSettingsStore();

  useEffect(() => {
    if (inView) {
      unlockAchievement("data-analyst");
      visitSection("impact");
    }
  }, [inView, unlockAchievement, visitSection]);

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>

      {designMode === "maximal" && <FloatingBlobs />}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Impact"
          title="Numbers That Define Our Scale"
          description="A decade of political consulting has resulted in measurable outcomes that have transformed India's electoral landscape."
          className="mb-16"
        />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {impactStats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || FiUsers;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/8 transition-all duration-300 overflow-hidden hover-lift"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-500/5 -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/10 transition-colors duration-300" />

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)",
                  }}
                />

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors duration-300">
                    <Icon className="text-cyan-400" size={20} />
                  </div>

                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>

                  <div className="text-sm font-semibold text-white mt-1 mb-2">
                    {stat.label}
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

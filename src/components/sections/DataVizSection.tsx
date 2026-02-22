"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useGamificationStore } from "@/stores/gamification-store";

interface BarData {
  label: string;
  value: number;
  color: string;
}

const electionData: BarData[] = [
  { label: "Bengal '24", value: 87, color: "#00d4ff" },
  { label: "Telangana '23", value: 92, color: "#6366f1" },
  { label: "Karnataka '23", value: 79, color: "#00d4ff" },
  { label: "Gujarat '22", value: 68, color: "#6366f1" },
  { label: "AP '24", value: 74, color: "#00d4ff" },
];

const timelineEvents = [
  { year: 2013, event: "I-PAC Founded", icon: "🚀" },
  { year: 2015, event: "First Major State Campaign", icon: "🗳️" },
  { year: 2017, event: "Expanded to 10+ States", icon: "🗺️" },
  { year: 2019, event: "1M+ Cohort Members", icon: "👥" },
  { year: 2021, event: "Bengal Historic Victory", icon: "🏆" },
  { year: 2023, event: "Multiple State Successes", icon: "🌟" },
  { year: 2024, event: "20+ States Footprint", icon: "🇮🇳" },
];

function AnimatedBar({ data, delay = 0, inView }: { data: BarData; delay?: number; inView: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">{data.label}</span>
        <span className="text-white font-semibold tabular-nums">{data.value}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: data.color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${data.value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function DataVizSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { visitSection } = useGamificationStore();

  useEffect(() => {
    if (inView) visitSection("data-viz");
  }, [inView, visitSection]);

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gray-950 overflow-hidden"
      id="data"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Analytics Dashboard"
          title="Data at the Core"
          description="Real-time analytics and measurable outcomes define every I-PAC campaign strategy."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/20 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
              Campaign Performance Index
            </h3>
            <div className="space-y-4">
              {electionData.map((data, i) => (
                <AnimatedBar
                  key={data.label}
                  data={data}
                  delay={0.2 + i * 0.1}
                  inView={inView}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/20 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
              Growth Timeline
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/30 to-transparent" />
              <div className="space-y-4">
                {timelineEvents.map((event, i) => (
                  <motion.div
                    key={event.year}
                    className="relative flex items-start gap-4 pl-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  >
                    <div className="absolute left-2 w-5 h-5 rounded-full bg-gray-950 border-2 border-cyan-500/50 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                    <div>
                      <span className="text-xs text-cyan-400 font-bold">
                        {event.year}
                      </span>
                      <p className="text-sm text-gray-300 flex items-center gap-1.5">
                        <span>{event.icon}</span>
                        {event.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/20 transition-colors flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Key Metrics
            </h3>

            {[
              { value: 2800000, label: "Rally Attendees", suffix: "+", prefix: "" },
              { value: 3600, label: "Crore Allocated", suffix: "Cr+", prefix: "₹" },
              { value: 50, label: "Campaigns Won", suffix: "+", prefix: "" },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              >
                <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    prefix={metric.prefix}
                    duration={2000}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="mt-auto p-4 rounded-xl bg-white/5 border border-white/10"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Voter Engagement Rate</span>
                <span className="text-cyan-400 font-semibold">94.2%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "94.2%" } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { FiTarget, FiEye, FiZap, FiShield } from "react-icons/fi";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrambleText } from "@/components/typography/ScrambleText";
import { useGamificationStore } from "@/stores/gamification-store";

const values = [
  {
    icon: FiTarget,
    title: "Data-Driven",
    description:
      "Every strategy is backed by rigorous data analysis, predictive modeling, and real-time insights.",
    color: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-500/20",
  },
  {
    icon: FiEye,
    title: "Transparent",
    description:
      "We maintain the highest standards of integrity and transparency in all our campaign operations.",
    color: "from-indigo-500/20 to-blue-600/10",
    border: "border-indigo-500/20",
  },
  {
    icon: FiZap,
    title: "Innovative",
    description:
      "We pioneer new methodologies in political consulting, combining technology with ground intelligence.",
    color: "from-blue-500/20 to-cyan-600/10",
    border: "border-blue-500/20",
  },
  {
    icon: FiShield,
    title: "Committed",
    description:
      "Dedicated to strengthening India's democracy through ethical and effective campaign strategies.",
    color: "from-cyan-500/20 to-indigo-600/10",
    border: "border-cyan-500/20",
  },
];

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { visitSection } = useGamificationStore();

  useEffect(() => {
    if (inView) visitSection("about");
  }, [inView, visitSection]);

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] grid-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading
                eyebrow="About I-PAC"
                title="Redefining Political Consulting in India"
                centered={false}
                className="mb-8"
              />

              <p className="text-gray-400 leading-relaxed mb-6">
                I-PAC (Indian Political Action Committee) is India&apos;s
                pioneering political consulting firm that combines cutting-edge
                data analytics, digital strategy, and deep grassroots
                intelligence to deliver winning electoral campaigns.
              </p>

              <p className="text-gray-400 leading-relaxed mb-8">
                With a track record spanning 20+ states and 50+ campaigns,
                we&apos;ve built the nation&apos;s largest network of trained
                political workers while maintaining our commitment to democratic
                values and ethical campaigning.
              </p>

              <Link href="/about">
                <MagneticButton variant="primary">
                  Learn Our Story
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${value.color} border ${value.border} hover:scale-[1.02] transition-all duration-300 group overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300">
                    <value.icon className="text-cyan-400" size={20} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    <ScrambleText text={value.title} duration={800} />
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

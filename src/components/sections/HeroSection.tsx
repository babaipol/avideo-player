"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { TypewriterText } from "@/components/typography/TypewriterText";
import { SplitText } from "@/components/typography/SplitText";
import { GradientText } from "@/components/typography/GradientText";
import { useGamificationStore } from "@/stores/gamification-store";
import { useSettingsStore } from "@/stores/settings-store";

const stats = [
  { value: "1.1M+", label: "Cohort Members" },
  { value: "82K+", label: "Youth Engaged" },
  { value: "400+", label: "Expert Team" },
  { value: "20+", label: "States Covered" },
];

const typewriterWords = [
  "Through Data",
  "Through Strategy",
  "Through Democracy",
  "Through Innovation",
];

export function HeroSection() {
  const { unlockAchievement, visitSection } = useGamificationStore();
  const { designMode } = useSettingsStore();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    unlockAchievement("first-visit");
    visitSection("hero");
  }, [unlockAchievement, visitSection]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950"
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 grid-bg opacity-100" aria-hidden="true" />

      {designMode === "maximal" && (
        <>
          <FloatingBlobs />
          <ParticleCanvas count={50} mouseInteract connected />
        </>
      )}

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        style={{ y: yText, opacity: opacityText }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              India&apos;s Premier Political Strategy Firm
            </span>
          </motion.div>

          <div className="mb-6 overflow-hidden">
            <SplitText
              text="Shaping India's"
              as="h1"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight block"
              mode="words"
              stagger={0.06}
              delay={0.1}
            />
            <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight block mt-2">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <GradientText animated from="#00d4ff" to="#6366f1">
                  Political Future
                </GradientText>
              </motion.span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight mt-2 h-[1.2em]">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TypewriterText
                  words={typewriterWords}
                  className="text-gray-300"
                  typingSpeed={70}
                  deletingSpeed={35}
                  pauseDuration={2000}
                />
              </motion.span>
            </div>
          </div>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I-PAC is India&apos;s foremost data-driven political consulting firm,
            combining cutting-edge analytics with deep grassroots intelligence to
            deliver winning campaign strategies across the nation.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/our-work">
              <MagneticButton size="lg" variant="primary">
                Explore Our Work <FiArrowRight />
              </MagneticButton>
            </Link>
            <Link href="/about">
              <MagneticButton size="lg" variant="secondary">
                About I-PAC
              </MagneticButton>
            </Link>
          </motion.div>

          <motion.div
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="relative text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover-lift"
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          Scroll
        </span>
        <div className="relative w-5 h-8 rounded-full border border-white/20 flex justify-center">
          <motion.div
            className="w-1 h-2 rounded-full bg-cyan-400 mt-1"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

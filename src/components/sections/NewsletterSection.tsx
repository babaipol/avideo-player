"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMail, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGamificationStore } from "@/stores/gamification-store";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { unlockAchievement } = useGamificationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    unlockAchievement("newsletter");
  };

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="absolute inset-0 grid-bg opacity-50" />

      <div
        ref={ref}
        className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6">
            <FiMail size={24} className="text-cyan-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Informed
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Subscribe to receive updates on our campaigns, political insights,
            and opportunities to contribute to India&apos;s democratic journey.
            <span className="block mt-2 text-cyan-400 text-sm">
              🎯 Unlock the Engaged Citizen achievement + 75 XP
            </span>
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3 text-green-400"
            >
              <FiCheckCircle size={32} />
              <span className="text-lg font-semibold">You&apos;re subscribed! Thank you.</span>
              <span className="text-sm text-cyan-400">🏅 Achievement unlocked: Engaged Citizen!</span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <MagneticButton
                type="submit"
                disabled={loading}
                variant="primary"
              >
                {loading ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <FiArrowRight size={16} />
                  </>
                )}
              </MagneticButton>
            </form>
          )}

          <p className="text-xs text-gray-600 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

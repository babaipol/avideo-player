"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { FiTarget, FiEye, FiZap, FiShield } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    icon: FiTarget,
    title: "Data-Driven",
    description:
      "Every strategy is backed by rigorous data analysis, predictive modeling, and real-time insights.",
  },
  {
    icon: FiEye,
    title: "Transparent",
    description:
      "We maintain the highest standards of integrity and transparency in all our campaign operations.",
  },
  {
    icon: FiZap,
    title: "Innovative",
    description:
      "We pioneer new methodologies in political consulting, combining technology with ground intelligence.",
  },
  {
    icon: FiShield,
    title: "Committed",
    description:
      "Dedicated to strengthening India's democracy through ethical and effective campaign strategies.",
  },
];

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                eyebrow="About I-PAC"
                title="Redefining Political Consulting in India"
                description="Founded with the mission to bring scientific rigor to political campaigns, I-PAC has transformed how elections are won in India."
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
                <Button variant="primary">Learn Our Story</Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <value.icon className="text-cyan-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

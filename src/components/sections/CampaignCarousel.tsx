"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiMapPin, FiCalendar } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { campaigns } from "@/data/campaigns";

export function CampaignCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i === 0 ? campaigns.length - 1 : i - 1));
  };

  const next = () => {
    setDirection(1);
    setActiveIndex((i) => (i === campaigns.length - 1 ? 0 : i + 1));
  };

  const campaign = campaigns[activeIndex];

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Campaigns That Changed India"
          description="Explore our portfolio of transformative electoral campaigns across India's states and constituencies."
          className="mb-16"
        />

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={campaign.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-900">
                <Image
                  src={campaign.imageUrl}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {campaign.tags.map((tag) => (
                    <Badge key={tag} variant="cyan">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1.5 text-sm text-gray-400">
                      <FiMapPin size={14} className="text-cyan-400" />
                      {campaign.state}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-400">
                      <FiCalendar size={14} className="text-cyan-400" />
                      {campaign.year}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {campaign.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {campaign.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                    >
                      <div className="text-xl font-bold text-cyan-400">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <span className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                    Outcome
                  </span>
                  <p className="text-white text-sm mt-1">{campaign.outcome}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-cyan-500 border border-white/10 hover:border-cyan-500 flex items-center justify-center text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Previous campaign"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-cyan-500 border border-white/10 hover:border-cyan-500 flex items-center justify-center text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Next campaign"
              >
                <FiChevronRight size={20} />
              </button>
            </div>

            <div className="flex gap-2">
              {campaigns.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    i === activeIndex
                      ? "w-8 h-2 bg-cyan-400"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to campaign ${i + 1}`}
                />
              ))}
            </div>

            <span className="text-sm text-gray-500">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(campaigns.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

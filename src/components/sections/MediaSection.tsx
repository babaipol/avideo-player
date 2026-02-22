"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiExternalLink, FiPlay, FiFileText, FiBookmark } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newsItems } from "@/data/news";
import type { NewsItem } from "@/types";
import { useGamificationStore } from "@/stores/gamification-store";

type Category = "all" | "news" | "press" | "video";

const categoryIcons: Record<string, React.ElementType> = {
  news: FiFileText,
  press: FiBookmark,
  video: FiPlay,
};

export function MediaSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { visitSection } = useGamificationStore();

  useEffect(() => {
    if (inView) visitSection("media");
  }, [inView, visitSection]);

  const filtered =
    activeCategory === "all"
      ? newsItems
      : newsItems.filter((n) => n.category === activeCategory);

  const categories: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "News", value: "news" },
    { label: "Press", value: "press" },
    { label: "Video", value: "video" },
  ];

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Media"
          title="In the News"
          description="Coverage of I-PAC's work from India's leading media outlets and political publications."
          className="mb-12"
        />

        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                activeCategory === cat.value
                  ? "bg-cyan-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {filtered.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({
  item,
  index,
  inView,
}: {
  item: NewsItem;
  index: number;
  inView: boolean;
}) {
  const Icon = categoryIcons[item.category] || FiFileText;

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/8 transition-all duration-300 hover-lift"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
          <Icon size={14} className="text-cyan-400" />
        </div>
        <FiExternalLink
          size={14}
          className="text-gray-600 group-hover:text-cyan-400 transition-colors mt-1"
        />
      </div>

      <div className="flex-1">
        <p className="text-xs text-cyan-400 font-medium mb-2 uppercase tracking-wider">
          {item.source}
        </p>
        <h3 className="text-white text-sm font-semibold leading-snug mb-2 group-hover:text-cyan-100 transition-colors line-clamp-3">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
            {item.excerpt}
          </p>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-600">
        {new Date(item.date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </motion.a>
  );
}

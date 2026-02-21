"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { HiX } from "react-icons/hi";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navVariants: Variants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 2rem) 2.5rem)",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 2rem) 2.5rem)",
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const itemVariants: Variants = {
  closed: { y: 30, opacity: 0 },
  open: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSwipe = (e: React.TouchEvent) => {
    const startY = e.touches[0].clientY;
    const handleEnd = (ev: TouchEvent) => {
      if (ev.changedTouches[0].clientY - startY > 80) onClose();
      document.removeEventListener("touchend", handleEnd);
    };
    document.addEventListener("touchend", handleEnd);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/20"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={overlayRef}
            variants={navVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onTouchStart={handleSwipe}
            className="fixed inset-0 z-[91] bg-gray-950 flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="absolute inset-0 opacity-[0.03] grid-bg pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

            <div className="relative flex items-center justify-between px-6 sm:px-12 h-20">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-sm">
                  I
                </div>
                <span className="font-bold text-xl text-white">
                  I-<span className="text-cyan-400">PAC</span>
                </span>
              </Link>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Close menu"
              >
                <HiX size={20} />
              </button>
            </div>

            <nav
              className="flex-1 flex flex-col justify-center px-6 sm:px-12"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="border-b border-white/8 py-1"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center justify-between py-4 sm:py-5 transition-colors duration-200",
                      pathname === item.href
                        ? "text-cyan-400"
                        : "text-white hover:text-cyan-400"
                    )}
                  >
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none">
                      {item.label}
                    </span>
                    <motion.span
                      className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="relative px-6 sm:px-12 pb-8"
            >
              <div className="flex items-center gap-4">
                {[
                  { icon: FaFacebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
                  { icon: FaTwitter, href: SOCIAL_LINKS.twitter, label: "Twitter" },
                  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
                  { icon: FaYoutube, href: SOCIAL_LINKS.youtube, label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-cyan-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

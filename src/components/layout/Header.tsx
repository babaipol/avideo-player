"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DesignModeToggle } from "@/components/ui/DesignModeToggle";
import { XPBar } from "@/components/gamification/XPBar";
import { NavOverlay } from "@/components/navigation/NavOverlay";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export function Header() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const scrollY = useScrollPosition();
  const pathname = usePathname();
  const isScrolled = scrollY > 20;

  useEffect(() => {
    setOverlayOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="I-PAC Home"
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                I
              </motion.div>
              <span className="font-bold text-xl text-white">
                I-<span className="text-cyan-400">PAC</span>
              </span>
            </Link>

            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 overflow-hidden",
                    pathname === item.href
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-cyan-500/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <XPBar />
              </div>
              <DesignModeToggle />
              <ThemeToggle />
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                onClick={() => setOverlayOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={overlayOpen}
                aria-haspopup="true"
              >
                <HiMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <NavOverlay isOpen={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  );
}

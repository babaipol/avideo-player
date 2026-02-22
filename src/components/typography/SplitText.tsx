"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useMemo } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "chars" | "words" | "lines";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

const variants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
};

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  mode = "chars",
  as: Tag = "span",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  const parts = useMemo(() => {
    if (mode === "words") return text.split(" ");
    if (mode === "chars") return text.split("");
    return text.split("\n");
  }, [text, mode]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
      aria-label={text}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom" }}
        >
          <motion.span
            className="inline-block"
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: "easeOut",
            }}
          >
            {part === " " ? "\u00A0" : part}
            {mode === "words" && i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

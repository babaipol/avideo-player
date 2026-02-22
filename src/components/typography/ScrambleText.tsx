"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  chars?: string;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function ScrambleText({
  text,
  className = "",
  delay = 0,
  duration = 1200,
  chars = DEFAULT_CHARS,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const { ref, inView } = useInView({ triggerOnce: true });
  const animatingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || animatingRef.current) return;

    const startTime = performance.now() + delay;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      animatingRef.current = true;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedCount) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        animatingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, text, delay, duration, chars]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayText}
    </span>
  );
}

"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FloatingBlobsProps {
  count?: number;
  className?: string;
}

const BLOB_CONFIGS = [
  {
    size: "w-72 h-72",
    color: "bg-cyan-500/8",
    position: "top-1/4 left-1/4",
    delay: "0s",
    duration: "12s",
  },
  {
    size: "w-96 h-96",
    color: "bg-blue-600/6",
    position: "bottom-1/3 right-1/4",
    delay: "3s",
    duration: "15s",
  },
  {
    size: "w-64 h-64",
    color: "bg-indigo-500/8",
    position: "top-1/2 right-1/3",
    delay: "6s",
    duration: "10s",
  },
];

export function FloatingBlobs({ className = "" }: FloatingBlobsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {BLOB_CONFIGS.map((blob, i) => (
        <div
          key={i}
          className={`absolute ${blob.size} ${blob.color} ${blob.position} blur-3xl ${!reducedMotion ? "blob-morph" : "rounded-full"}`}
          style={
            !reducedMotion
              ? {
                  animationDelay: blob.delay,
                  animationDuration: blob.duration,
                }
              : {}
          }
        />
      ))}
    </div>
  );
}

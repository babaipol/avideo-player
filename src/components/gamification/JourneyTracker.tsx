"use client";

import { useEffect } from "react";
import { useGamificationStore } from "@/stores/gamification-store";

const REQUIRED_SECTIONS = [
  "hero",
  "campaigns",
  "map",
  "impact",
  "about",
  "team",
  "media",
  "contact",
];

export function JourneyTracker() {
  const { sectionsVisited, unlockAchievement } = useGamificationStore();

  useEffect(() => {
    const allVisited = REQUIRED_SECTIONS.every((s) =>
      sectionsVisited.includes(s)
    );
    if (allVisited) {
      unlockAchievement("full-journey");
    }
  }, [sectionsVisited, unlockAchievement]);

  return null;
}

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  xp: number;
}

interface GamificationState {
  xp: number;
  level: number;
  achievements: Achievement[];
  quizScore: number;
  sectionsVisited: string[];
  konamiUnlocked: boolean;
  unlockAchievement: (id: string) => void;
  addXP: (amount: number) => void;
  setQuizScore: (score: number) => void;
  visitSection: (section: string) => void;
  setKonamiUnlocked: (value: boolean) => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: "first-visit",
    title: "Democracy Pioneer",
    description: "Welcome to I-PAC's next-gen platform",
    icon: "🏛️",
    unlocked: false,
    xp: 50,
  },
  {
    id: "map-explorer",
    title: "Map Explorer",
    description: "Hovered over 5 states on the India map",
    icon: "🗺️",
    unlocked: false,
    xp: 100,
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Scored 80% or higher on the political quiz",
    icon: "🧠",
    unlocked: false,
    xp: 200,
  },
  {
    id: "campaign-scholar",
    title: "Campaign Scholar",
    description: "Explored all 6 campaign stories",
    icon: "📚",
    unlocked: false,
    xp: 150,
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Viewed all impact statistics",
    icon: "📊",
    unlocked: false,
    xp: 100,
  },
  {
    id: "konami-master",
    title: "Secret Agent",
    description: "You found the Konami code easter egg!",
    icon: "🕵️",
    unlocked: false,
    xp: 500,
  },
  {
    id: "full-journey",
    title: "Full Journey",
    description: "Visited every section of the website",
    icon: "🌟",
    unlocked: false,
    xp: 300,
  },
  {
    id: "newsletter",
    title: "Engaged Citizen",
    description: "Subscribed to I-PAC updates",
    icon: "📬",
    unlocked: false,
    xp: 75,
  },
];

function calculateLevel(xp: number): number {
  if (xp < 100) return 1;
  if (xp < 300) return 2;
  if (xp < 600) return 3;
  if (xp < 1000) return 4;
  if (xp < 1500) return 5;
  return Math.floor(xp / 300) + 1;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      achievements: defaultAchievements,
      quizScore: 0,
      sectionsVisited: [],
      konamiUnlocked: false,

      unlockAchievement: (id: string) => {
        const { achievements, xp } = get();
        const achievement = achievements.find((a) => a.id === id);
        if (!achievement || achievement.unlocked) return;

        const newXP = xp + achievement.xp;
        set({
          achievements: achievements.map((a) =>
            a.id === id ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
          ),
          xp: newXP,
          level: calculateLevel(newXP),
        });
      },

      addXP: (amount: number) => {
        const { xp } = get();
        const newXP = xp + amount;
        set({ xp: newXP, level: calculateLevel(newXP) });
      },

      setQuizScore: (score: number) => {
        set({ quizScore: score });
      },

      visitSection: (section: string) => {
        const { sectionsVisited } = get();
        if (!sectionsVisited.includes(section)) {
          set({ sectionsVisited: [...sectionsVisited, section] });
        }
      },

      setKonamiUnlocked: (value: boolean) => {
        set({ konamiUnlocked: value });
      },
    }),
    {
      name: "ipac-gamification",
    }
  )
);

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DesignMode = "minimal" | "maximal";
export type MotionLevel = "full" | "reduced" | "none";

interface SettingsState {
  designMode: DesignMode;
  motionLevel: MotionLevel;
  cursorEffect: boolean;
  soundEnabled: boolean;
  setDesignMode: (mode: DesignMode) => void;
  setMotionLevel: (level: MotionLevel) => void;
  setCursorEffect: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      designMode: "maximal",
      motionLevel: "full",
      cursorEffect: true,
      soundEnabled: false,

      setDesignMode: (mode) => set({ designMode: mode }),
      setMotionLevel: (level) => set({ motionLevel: level }),
      setCursorEffect: (enabled) => set({ cursorEffect: enabled }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
    }),
    {
      name: "ipac-settings",
    }
  )
);

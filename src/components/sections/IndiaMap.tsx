"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { campaigns } from "@/data/campaigns";

const statePositions: Record<string, { x: number; y: number; label: string }> =
  {
    "Jammu & Kashmir": { x: 22, y: 8, label: "J&K" },
    Himachal: { x: 25, y: 12, label: "HP" },
    Punjab: { x: 20, y: 14, label: "PB" },
    Uttarakhand: { x: 30, y: 15, label: "UK" },
    Haryana: { x: 24, y: 18, label: "HR" },
    Delhi: { x: 27, y: 20, label: "DL" },
    Rajasthan: { x: 20, y: 25, label: "RJ" },
    "Uttar Pradesh": { x: 35, y: 22, label: "UP" },
    Bihar: { x: 45, y: 24, label: "BR" },
    Sikkim: { x: 57, y: 18, label: "SK" },
    "West Bengal": { x: 55, y: 28, label: "WB" },
    "Arunachal Pradesh": { x: 72, y: 16, label: "AR" },
    Assam: { x: 67, y: 22, label: "AS" },
    Nagaland: { x: 74, y: 24, label: "NL" },
    Manipur: { x: 73, y: 27, label: "MN" },
    Mizoram: { x: 69, y: 30, label: "MZ" },
    Tripura: { x: 66, y: 29, label: "TR" },
    Meghalaya: { x: 65, y: 24, label: "ML" },
    Gujarat: { x: 12, y: 32, label: "GJ" },
    "Madhya Pradesh": { x: 27, y: 32, label: "MP" },
    Jharkhand: { x: 48, y: 30, label: "JH" },
    Odisha: { x: 50, y: 36, label: "OD" },
    Chhattisgarh: { x: 40, y: 36, label: "CG" },
    Maharashtra: { x: 22, y: 42, label: "MH" },
    Telangana: { x: 34, y: 45, label: "TS" },
    "Andhra Pradesh": { x: 38, y: 52, label: "AP" },
    Karnataka: { x: 26, y: 54, label: "KA" },
    Goa: { x: 18, y: 52, label: "GA" },
    Kerala: { x: 24, y: 64, label: "KL" },
    "Tamil Nadu": { x: 34, y: 62, label: "TN" },
  };

const statesWithCampaigns = new Set(campaigns.map((c) => c.state));

export function IndiaMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const relatedCampaigns = hoveredState
    ? campaigns.filter((c) => c.state === hoveredState)
    : [];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Presence Across India"
          title="Our National Footprint"
          description="I-PAC has delivered campaign strategies across 20+ states, shaping electoral outcomes from the Himalayas to the southern tip of India."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="relative w-full max-w-md mx-auto">
              <svg
                viewBox="0 0 100 85"
                className="w-full"
                aria-label="Map of India showing I-PAC campaign presence"
              >
                {Object.entries(statePositions).map(([state, pos]) => {
                  const hasCampaign = statesWithCampaigns.has(state);
                  const isHovered = hoveredState === state;
                  return (
                    <g
                      key={state}
                      onMouseEnter={() => setHoveredState(state)}
                      onMouseLeave={() => setHoveredState(null)}
                      className="cursor-pointer"
                      aria-label={state}
                      role="button"
                      tabIndex={0}
                      onFocus={() => setHoveredState(state)}
                      onBlur={() => setHoveredState(null)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setHoveredState(state)
                      }
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered ? 3.5 : hasCampaign ? 2.8 : 2}
                        fill={
                          isHovered
                            ? "#22d3ee"
                            : hasCampaign
                              ? "#0891b2"
                              : "#374151"
                        }
                        stroke={
                          isHovered
                            ? "#67e8f9"
                            : hasCampaign
                              ? "#164e63"
                              : "#1f2937"
                        }
                        strokeWidth="0.5"
                        className="transition-all duration-200"
                      />
                      {(hasCampaign || isHovered) && (
                        <text
                          x={pos.x}
                          y={pos.y + 5.5}
                          textAnchor="middle"
                          fontSize="2.5"
                          fill={isHovered ? "#67e8f9" : "#94a3b8"}
                          className="font-bold pointer-events-none select-none"
                        >
                          {pos.label}
                        </text>
                      )}
                      {isHovered && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="6"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="0.5"
                          opacity="0.5"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="mt-4 flex items-center gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="text-xs text-gray-400">Active Campaign</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-600" />
                  <span className="text-xs text-gray-400">Other States</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresenceWrapper>
              {hoveredState ? (
                <motion.div
                  key={hoveredState}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {hoveredState}
                  </h3>
                  {relatedCampaigns.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-sm text-cyan-400 font-medium">
                        {relatedCampaigns.length} campaign
                        {relatedCampaigns.length > 1 ? "s" : ""} in this state
                      </p>
                      {relatedCampaigns.map((c) => (
                        <div
                          key={c.id}
                          className="p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="font-semibold text-white text-sm mb-1">
                            {c.title}
                          </div>
                          <div className="text-xs text-gray-400 mb-3">
                            {c.year}
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {c.stats.slice(0, 3).map((s) => (
                              <div key={s.label} className="text-center">
                                <div className="text-sm font-bold text-cyan-400">
                                  {s.value}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {s.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Strategic presence in this state.
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-cyan-400 text-xl">🗺️</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Hover over a state to see our campaign presence and impact
                    metrics.
                  </p>
                  <div className="mt-4 text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    20+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    States Covered
                  </div>
                </motion.div>
              )}
            </AnimatePresenceWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatePresenceWrapper({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

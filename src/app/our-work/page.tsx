import type { Metadata } from "next";
import { CampaignCarousel } from "@/components/sections/CampaignCarousel";
import { IndiaMap } from "@/components/sections/IndiaMap";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore I-PAC's portfolio of transformative electoral campaigns across India's states and constituencies.",
};

export default function OurWorkPage() {
  return (
    <>
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              Portfolio
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
              Campaigns That{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Changed India
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              From state assemblies to parliamentary constituencies, I-PAC has
              managed campaigns that have redefined electoral politics across
              the subcontinent.
            </p>
          </div>
        </div>
      </div>
      <CampaignCarousel />
      <IndiaMap />
    </>
  );
}

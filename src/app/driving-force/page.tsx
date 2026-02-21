import type { Metadata } from "next";
import { TeamSection } from "@/components/sections/TeamSection";

export const metadata: Metadata = {
  title: "Driving Force",
  description:
    "Meet the directors and experts who drive I-PAC's vision of data-driven political consulting.",
};

export default function DrivingForcePage() {
  return (
    <>
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              Our Team
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
              The{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Driving Force
              </span>{" "}
              Behind I-PAC
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Our team brings together the best minds in political strategy,
              data science, digital communication, and grassroots organizing to
              deliver exceptional campaign outcomes.
            </p>
          </div>
        </div>
      </div>
      <TeamSection />
    </>
  );
}

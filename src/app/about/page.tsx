import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ImpactStats } from "@/components/sections/ImpactStats";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about I-PAC's history, mission, and the team behind India's foremost political consulting firm.",
};

export default function AboutPage() {
  return (
    <>
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              About I-PAC
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
              Built to Transform{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Indian Politics
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              I-PAC was founded with a singular vision: to bring the precision
              of data science to the art of political campaigns, creating a new
              paradigm for democratic participation in India.
            </p>
          </div>
        </div>
      </div>
      <AboutSection />
      <ImpactStats />
    </>
  );
}

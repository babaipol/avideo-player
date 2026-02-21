import type { Metadata } from "next";
import { MediaSection } from "@/components/sections/MediaSection";

export const metadata: Metadata = {
  title: "Media",
  description:
    "News, press coverage, and media mentions of I-PAC's work in Indian electoral politics.",
};

export default function MediaPage() {
  return (
    <>
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              Media Coverage
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
              I-PAC in the{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                News
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Read what India&apos;s leading journalists, analysts, and media
              outlets are saying about I-PAC&apos;s transformative work in
              Indian politics.
            </p>
          </div>
        </div>
      </div>
      <MediaSection />
    </>
  );
}

import type { Metadata } from "next";
import { ImpactStats } from "@/components/sections/ImpactStats";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "Discover the scale of I-PAC's impact across India — from cohort members trained to elections influenced.",
};

export default function OurImpactPage() {
  return (
    <>
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              Impact
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
              Our Impact,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                By the Numbers
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Over a decade of political consulting, I-PAC has created
              measurable, lasting change in India&apos;s democratic landscape
              through training, innovation, and scale.
            </p>
          </div>
        </div>
      </div>
      <ImpactStats />
      <div className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1.1 Million+ Cohort Members",
                description:
                  "Our signature cohort program has trained over 1.1 million political workers across India in data-driven campaign methodologies, creating the largest political training network in the country.",
              },
              {
                title: "82,000+ Youth Engaged",
                description:
                  "The I-PAC Youth Initiative has brought over 82,000 young Indians into democratic participation, training them as the next generation of political strategists and community organizers.",
              },
              {
                title: "20+ States, 100M+ Voter Contacts",
                description:
                  "Operating across 20+ Indian states, our ground and digital campaigns have directly contacted over 100 million voters, making I-PAC one of India's largest political outreach organizations.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Join Us — Careers",
  description:
    "Join India's foremost political consulting firm. Explore career opportunities at I-PAC.",
};

const openings = [
  {
    id: "data-analyst",
    title: "Senior Data Analyst",
    department: "Analytics",
    location: "Kolkata / Remote",
    type: "Full-time",
    description:
      "Lead data analysis initiatives for state-level electoral campaigns, building predictive models for voter behavior and campaign optimization.",
    requirements: [
      "5+ years in data analytics",
      "Python/R proficiency",
      "Experience with large datasets",
      "Political interest preferred",
    ],
  },
  {
    id: "digital-strategist",
    title: "Digital Campaign Strategist",
    department: "Digital",
    location: "New Delhi / Remote",
    type: "Full-time",
    description:
      "Design and execute digital campaign strategies across social media platforms for state and national electoral campaigns.",
    requirements: [
      "3+ years in digital marketing",
      "Campaign management experience",
      "Strong analytical skills",
      "Knowledge of Indian political landscape",
    ],
  },
  {
    id: "ground-coordinator",
    title: "State Ground Coordinator",
    department: "Operations",
    location: "Multiple States",
    type: "Contract",
    description:
      "Coordinate ground-level campaign operations across assigned districts, managing volunteer networks and booth-level activities.",
    requirements: [
      "Experience in community organizing",
      "Strong leadership skills",
      "Local language proficiency",
      "Willingness to travel extensively",
    ],
  },
  {
    id: "communications-manager",
    title: "Communications Manager",
    department: "Communications",
    location: "New Delhi",
    type: "Full-time",
    description:
      "Lead external communications, media relations, and brand positioning for I-PAC's campaign clients and organizational messaging.",
    requirements: [
      "Journalism or PR background",
      "Political communication experience",
      "Media network in India",
      "Bilingual (Hindi + English)",
    ],
  },
  {
    id: "junior-researcher",
    title: "Research Associate",
    department: "Research",
    location: "Kolkata / Remote",
    type: "Full-time",
    description:
      "Conduct voter surveys, political research, and constituency-level analysis to support campaign decision-making.",
    requirements: [
      "Graduate in social sciences or statistics",
      "Research methodology knowledge",
      "Survey design experience",
      "Proficiency in data tools",
    ],
  },
  {
    id: "youth-coordinator",
    title: "Youth Program Coordinator",
    department: "Youth Engagement",
    location: "Pan-India",
    type: "Full-time",
    description:
      "Drive recruitment and engagement of youth into I-PAC's cohort programs, building the next generation of political workers.",
    requirements: [
      "Youth advocacy experience",
      "Strong networking skills",
      "College/university networks",
      "Passion for democracy",
    ],
  },
];

const departmentColors: Record<string, "cyan" | "blue" | "orange" | "green"> = {
  Analytics: "cyan",
  Digital: "blue",
  Operations: "orange",
  Communications: "green",
  Research: "cyan",
  "Youth Engagement": "blue",
};

export default function CareersPage() {
  return (
    <>
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              Join Our Team
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
              Build India&apos;s{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Political Future
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              At I-PAC, you&apos;ll work at the intersection of data, strategy,
              and democracy. Join a team of passionate professionals shaping
              India&apos;s electoral landscape.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Competitive compensation
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Meaningful work
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Pan-India exposure
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Growth opportunities
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">
            Open Positions ({openings.length})
          </h2>
          <div className="grid gap-4">
            {openings.map((job) => (
              <GlassCard key={job.id} padding="md" hover>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {job.title}
                      </h3>
                      <Badge variant={departmentColors[job.department] || "cyan"}>
                        {job.department}
                      </Badge>
                      {job.type === "Contract" && (
                        <Badge variant="orange">Contract</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <FiMapPin size={13} className="text-cyan-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiBriefcase size={13} className="text-cyan-400" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiClock size={13} className="text-cyan-400" />
                        {job.type}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req) => (
                        <span
                          key={req}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:ml-4 flex-shrink-0">
                    <Link href="/contact">
                      <Button variant="outline" size="sm">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Don&apos;t see a role that fits?
            </h3>
            <p className="text-gray-400 mb-6">
              We&apos;re always looking for exceptional talent. Send us your
              profile and let&apos;s explore how you can contribute to
              India&apos;s democratic process.
            </p>
            <Link href="/contact">
              <Button variant="primary">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

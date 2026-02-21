import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with I-PAC for campaign consulting, career inquiries, or media questions.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              Contact
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Whether you&apos;re looking for campaign consulting services, want
              to join our team, or have a media inquiry — our team is ready to
              hear from you.
            </p>
          </div>
        </div>
      </div>
      <ContactSection />
    </>
  );
}

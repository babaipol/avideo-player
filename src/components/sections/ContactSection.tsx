"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SOCIAL_LINKS } from "@/lib/constants";
import { offices } from "@/data/offices";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 bg-gray-900" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          description="Whether you're interested in our services, want to join our team, or have a media inquiry, we'd love to hear from you."
          className="mb-16"
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <FiCheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  Thank you for reaching out. Our team will get back to you
                  within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      placeholder="Rahul"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      placeholder="Sharma"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="rahul@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-gray-900">
                      Select a subject
                    </option>
                    <option value="consulting" className="bg-gray-900">
                      Campaign Consulting
                    </option>
                    <option value="careers" className="bg-gray-900">
                      Career Opportunities
                    </option>
                    <option value="media" className="bg-gray-900">
                      Media Inquiry
                    </option>
                    <option value="other" className="bg-gray-900">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <FiSend size={16} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {offices.map((office) => (
              <div
                key={office.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-white font-bold text-lg mb-4">
                  {office.city} Office
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3 text-sm text-gray-400">
                    <FiMapPin className="text-cyan-400 flex-shrink-0 mt-0.5" size={16} />
                    <span>{office.address}</span>
                  </div>
                  {office.phone && (
                    <div className="flex gap-3 text-sm text-gray-400">
                      <FiPhone className="text-cyan-400 flex-shrink-0" size={16} />
                      <a
                        href={`tel:${office.phone}`}
                        className="hover:text-white transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex gap-3 text-sm text-gray-400">
                    <FiMail className="text-cyan-400 flex-shrink-0" size={16} />
                    <a
                      href={`mailto:${office.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {[
                  {
                    icon: FaFacebook,
                    href: SOCIAL_LINKS.facebook,
                    label: "Facebook",
                    color: "hover:bg-blue-600",
                  },
                  {
                    icon: FaTwitter,
                    href: SOCIAL_LINKS.twitter,
                    label: "Twitter",
                    color: "hover:bg-sky-500",
                  },
                  {
                    icon: FaInstagram,
                    href: SOCIAL_LINKS.instagram,
                    label: "Instagram",
                    color: "hover:bg-pink-600",
                  },
                  {
                    icon: FaYoutube,
                    href: SOCIAL_LINKS.youtube,
                    label: "YouTube",
                    color: "hover:bg-red-600",
                  },
                  {
                    icon: FaLinkedin,
                    href: SOCIAL_LINKS.linkedin,
                    label: "LinkedIn",
                    color: "hover:bg-blue-700",
                  },
                ].map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-10 h-10 rounded-full bg-white/10 ${color} flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

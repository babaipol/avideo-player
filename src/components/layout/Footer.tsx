import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { NAV_ITEMS, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-sm">
                I
              </div>
              <span className="font-bold text-xl text-white">
                I-<span className="text-cyan-400">PAC</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Indian Political Action Committee — A data-driven political
              consulting firm committed to strengthening India&apos;s democracy
              through strategic campaign management and grassroots mobilization.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  icon: FaFacebook,
                  href: SOCIAL_LINKS.facebook,
                  label: "Facebook",
                },
                {
                  icon: FaTwitter,
                  href: SOCIAL_LINKS.twitter,
                  label: "Twitter",
                },
                {
                  icon: FaInstagram,
                  href: SOCIAL_LINKS.instagram,
                  label: "Instagram",
                },
                {
                  icon: FaYoutube,
                  href: SOCIAL_LINKS.youtube,
                  label: "YouTube",
                },
                {
                  icon: FaLinkedin,
                  href: SOCIAL_LINKS.linkedin,
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-cyan-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>PS Srijan Tech Park</p>
              <p>Salt Lake City, Kolkata</p>
              <p>West Bengal 700091</p>
              <a
                href="mailto:contact@indianpac.com"
                className="block text-cyan-400 hover:text-cyan-300 transition-colors mt-2"
              >
                contact@indianpac.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

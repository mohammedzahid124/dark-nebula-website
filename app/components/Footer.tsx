"use client";

import { Instagram, Linkedin, Twitter } from "lucide-react";
import FuturisticLogo from "./FuturisticLogo";
import { useState } from "react";
type FooterLink = {
  label: string;
  href?: string;
  target?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const footerLinks: FooterColumn[] = [
    {
      title: "Services",
      links: [
        { label: "Web Development", target: "services" },
        { label: "UI/UX Design", target: "services" },
        { label: "Cloud & DevOps", target: "services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", target: "home" },
        {
          label:
            "BHIVE, Mahalakshmi Chambers, 29, Mahatma Gandhi Rd, next to Trinity Metro Station, opp. Kotak Bank, Sivanchetti Gardens, Bengaluru, Karnataka 560001",
          href: "https://maps.google.com/?q=BHIVE+Mahalakshmi+Chambers+MG+Road+Bengaluru",
        },
      ],
    },

    {
      title: "Resources",
      links: [
        { label: "Documentation" },
        { label: "Support" },
        { label: "Contact", target: "contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy" },
        { label: "Terms of Service" },
        { label: "Cookie Policy" },
      ],
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
  className="relative border-t border-white/10 overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/birth_of_star.jpg')" }}
>
    {/* Nebula Wave Divider */}
<div className="absolute -top-[180px] left-0 w-full overflow-hidden leading-none rotate-180 z-20">

  <svg
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    className="w-[200%] h-[180px] animate-wave"
  >
    {/* Layer 1 */}
    <path
      d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
      fill="rgba(0,0,0,0.95)"
    />

    {/* Glow Layer */}
    <path
      d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86"
      fill="none"
      stroke="rgba(139,92,246,0.4)"
      strokeWidth="2"
    />
  </svg>
</div>


      {/* Curved Section Divider */}
      
      {/* Futuristic animated background */}
      
      <div className="absolute inset-0 bg-black/20">


        

        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-linear-to-r from-cyan-400 to-purple-400 animate-pulse"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.1,
                animationDelay: Math.random() * 3 + "s",
                animationDuration: Math.random() * 3 + 2 + "s",
              }}
            />
          ))}
        </div>

        {/* Glowing gradient orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

        <div className="absolute top-1/2 right-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

        {/* Energy flow lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-transparent to-purple-500/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">


        <div className="max-w-6xl mx-auto rounded-3xl p-10

 bg-clip-padding
 bg-white/3 backdrop-blur-[2px]

 backdrop-saturate-100
 border border-white/10
 shadow-xl">


          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 mb-8 md:mb-0">
              <button
                onClick={() => scrollToSection("home")}
                className="text-2xl font-bold mb-4 hover:opacity-80 transition-opacity"
              >
                <span className="bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  DarkNebula
                </span>
              </button>
              <p className="text-gray-200 text-sm">
                Pioneering the future with advanced technology, innovation, and
                transformative solutions.
              </p>
            </div>

            {/* Footer Links */}
            {/* Footer Links */}
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h4 className="text-white/90 font-semibold mb-4 text-sm uppercase tracking-wider">

                  {column.title}
                </h4>

                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      {link.href ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-200 hover:text-cyan-400 transition-colors text-sm text-left leading-relaxed block max-w-xs"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            if (link.target) scrollToSection(link.target);
                            else setActiveModal(link.label);
                          }}
                          className="text-gray-200 hover:text-cyan-400 transition-colors text-sm text-left"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-gray-200 text-sm">
                &copy; {currentYear} Dark Nebula. All rights reserved.
              </p>
            </div>

            {/* Social Links with icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/darknebulabs/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-purple-600 hover:to-purple-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 group"
              >
                <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/dark-nebula-1418723a9/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-cyan-600 hover:to-cyan-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 group"
              >
                <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://x.com/darknebulabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-pink-600 hover:to-pink-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50 group"
              >
                <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="mt-8 pt-8 border-t border-white/10 text-center"></div>
        </div>
      </div>
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center px-4">
          <div className="relative max-w-2xl w-full bg-black border border-white/20 rounded-2xl p-8">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-cyan-400">
              {activeModal}
            </h2>

            <div className="text-gray-300 text-sm leading-relaxed space-y-4">
              {activeModal === "Documentation" && (
                <>
                  <p>
                    Welcome to the{" "}
                    <strong>Dark Nebula Documentation Center</strong>. This
                    section provides structured technical resources covering our
                    AI systems, cybersecurity methodologies, DevOps pipelines,
                    and full‑stack development practices.
                  </p>
                  <p>
                    You will find clear architecture overviews, API references,
                    deployment guidelines, and integration walkthroughs designed
                    to help clients and partners understand, implement, and
                    maintain solutions delivered by
                    <span className="text-cyan-400 font-semibold">
                      {" "}
                      darknebulabs.com
                    </span>
                    .
                  </p>
                  <p>
                    All documentation is continuously updated to reflect best
                    practices, security standards, and system improvements.
                  </p>
                </>
              )}

              {activeModal === "Support" && (
                <>
                  <p>
                    Our technical support team is available for deployment
                    issues, security incidents, system upgrades, and performance
                    optimization.
                  </p>
                  <p>
                    Email: darknebulabs.com
                    <br />
                    Response time: under 24 hours.
                  </p>
                </>
              )}

              {activeModal === "Contact" && (
                <>
                  <p>Let’s build something powerful together.</p>
                  <p>
                    Email: contact@darknebula.tech
                    <br />
                    Location: Remote‑first global team.
                  </p>
                </>
              )}

              {activeModal === "Privacy Policy" && (
                <>
                  <p>
                    At{" "}
                    <span className="font-semibold text-cyan-400">
                      darknebulabs.com
                    </span>
                    , we are committed to protecting your privacy and ensuring
                    transparency in how your information is handled.
                  </p>

                  <p className="mt-3">
                    We collect only essential information, such as contact
                    details submitted through our forms and limited usage
                    analytics, solely to respond to inquiries, improve our
                    services, and enhance user experience.
                  </p>

                  <p className="mt-3">
                    Your personal data is never sold, rented, or shared with
                    third parties for marketing purposes. All information is
                    safeguarded using industry‑standard security measures to
                    prevent unauthorized access, disclosure, or misuse.
                  </p>

                  <p className="mt-3">
                    By using{" "}
                    <span className="font-semibold text-cyan-400">
                      darknebulabs.com
                    </span>
                    , you consent to this Privacy Policy. If you have any
                    questions or concerns regarding data usage, please contact
                    us directly.
                  </p>
                </>
              )}

              {activeModal === "Terms of Service" && (
                <>
                  <p>
                    By accessing or using the services provided by{" "}
                    <strong>Dark Nebula</strong>, you agree to comply with these
                    Terms of Service and all applicable laws and regulations.
                  </p>

                  <p>
                    Our services must be used responsibly and solely for lawful
                    purposes. Any misuse, unauthorized access, or attempt to
                    disrupt our systems is strictly prohibited.
                  </p>

                  <p>
                    All intellectual property, methodologies, and pre‑existing
                    tools used by Dark Nebula remain our property unless
                    explicitly agreed otherwise in writing.
                  </p>

                  <p>
                    Upon full project completion and payment, all
                    custom‑developed deliverables are owned by the client,
                    unless otherwise stated in a formal agreement.
                  </p>

                  <p>
                    Dark Nebula reserves the right to update or modify these
                    terms at any time. Continued use of our services constitutes
                    acceptance of any changes.
                  </p>
                </>
              )}

              {activeModal === "Cookie Policy" && (
                <>
                  <p>
                    <strong>darknebulabs.com</strong> uses cookies and similar
                    technologies strictly for analytics, performance monitoring,
                    and essential functionality.
                  </p>

                  <p>
                    These cookies help us understand how visitors interact with
                    our website, allowing us to improve usability, performance,
                    and overall reliability. We do <strong>not</strong> use
                    cookies for advertising or tracking across third‑party
                    websites.
                  </p>

                  <p>
                    You have full control over cookie preferences and may
                    disable or delete cookies at any time through your browser
                    settings. Please note that disabling cookies may affect
                    certain features or functionality of the website.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

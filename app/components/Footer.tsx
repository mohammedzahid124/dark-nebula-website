"use client";

import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: ["Web Development", "UI/UX Design", "Cloud & DevOps"],
    },
    {
      title: "Company",
      links: ["About Us", "Blog", "Careers"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Support", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Futuristic animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cosmic gradient background */}
        <div className="absolute inset-0 bg-linear-to-b from-purple-900/20 via-black to-cyan-900/20" />
        
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
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
              <p className="text-gray-300 text-sm">
                Pioneering the future with advanced technology, innovation, and transformative solutions.
              </p>
            </div>

            {/* Footer Links */}
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} Dark Nebula. All rights reserved.
              </p>
            </div>

            {/* Social Links with icons */}
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-purple-600 hover:to-purple-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 group"
              >
                <Github className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-cyan-600 hover:to-cyan-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 group"
              >
                <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-pink-600 hover:to-pink-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50 group"
              >
                <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-semibold uppercase tracking-wider"
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
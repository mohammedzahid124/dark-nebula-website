"use client";

import { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "What We Do" },
    { id: "why-choose", label: "Why Choose Us" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Animated Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="shrink-0 hover:opacity-80 transition-opacity"
          >
            <AnimatedLogo />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  activeSection === item.id
                    ? "bg-purple-500/30 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute inset-0 rounded-lg border border-purple-400/50 pointer-events-none" />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="relative px-6 py-2 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all font-semibold overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 py-4">
            <div className="flex flex-col gap-3 px-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-300 hover:text-white text-left py-2 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-300 hover:text-white text-left py-2 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-300 hover:text-white text-left py-2 transition-colors"
              >
                What We Do
              </button>
              <button
                onClick={() => scrollToSection("why-choose")}
                className="text-gray-300 hover:text-white text-left py-2 transition-colors"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-300 hover:text-white text-left py-2 transition-colors"
              >
                Contact
              </button>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-left py-2 transition-colors"
              >
                LinkedIn
              </a>
              <button className="w-full px-4 py-2 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all font-semibold">
                Become a Partner
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import { useState, useRef } from "react";
import { Users, MessageSquare, Zap, CheckCircle, Shield, Rocket, ChevronLeft, ChevronRight } from "lucide-react";

const carouselStyles = `
  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 10px rgba(34, 211, 238, 0.3), 0 0 20px rgba(139, 92, 246, 0.2), inset 0 0 10px rgba(34, 211, 238, 0.1);
    }
    50% {
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.2);
    }
  }

  @keyframes lightningStrike {
    0%, 100% {
      border-color: rgba(34, 211, 238, 0.3);
      filter: drop-shadow(0 0 2px rgba(34, 211, 238, 0.3));
    }
    50% {
      border-color: rgba(139, 92, 246, 0.6);
      filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 15px rgba(34, 211, 238, 0.4));
    }
  }

  @keyframes iconGlow {
    0%, 100% {
      filter: drop-shadow(0 0 5px rgba(34, 211, 238, 0.3));
    }
    50% {
      filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 25px rgba(139, 92, 246, 0.6));
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }

  .glow-border {
    border-width: 2px;
    border-image: linear-gradient(135deg, rgba(34, 211, 238, 0.4), rgba(139, 92, 246, 0.4)) 1;
    animation: glowPulse 3s ease-in-out infinite;
  }

  .icon-glow {
    animation: iconGlow 2s ease-in-out infinite;
  }

  .lightning-effect {
    animation: lightningStrike 2.5s ease-in-out infinite;
  }
`;

export default function Impact() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const reasons = [
    {
      title: "Expert Team",
      description: "Highly skilled engineers with proven track records in delivering enterprise-grade solutions.",
      icon: Users,
    },
    {
      title: "Transparent Communication",
      description: "Clear, honest communication throughout the entire project lifecycle with regular updates.",
      icon: MessageSquare,
    },
    {
      title: "Agile Approach",
      description: "Flexible methodologies that adapt to your changing needs and market demands.",
      icon: Zap,
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and code reviews to ensure your product meets the highest standards.",
      icon: CheckCircle,
    },
    {
      title: "Continuous Support",
      description: "Dedicated support team available 24/7 to ensure your systems run smoothly.",
      icon: Shield,
    },
    {
      title: "Innovation First",
      description: "Staying ahead of the curve with latest technologies and best practices.",
      icon: Rocket,
    },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    const distance = Math.abs(touchStartRef.current - touchEndRef.current);
    const isHorizontalSwipe = distance > 50;

    if (isHorizontalSwipe) {
      e.preventDefault();
      e.stopPropagation();
    }
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentCardIndex((prev) => (prev + 1) % reasons.length);
    } else if (isRightSwipe) {
      setCurrentCardIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
    }
  };

  const goToPrevious = () => {
    setCurrentCardIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  };

  const goToNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % reasons.length);
  };

  return (
    <>
      <style>{carouselStyles}</style>
    <section id="why-choose" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're committed to delivering excellence in every project. Here's what sets us apart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="group relative bg-linear-to-b from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hidden md:block"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-500 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              {/* Icon with Light Emission */}
              <div className="mb-4 flex justify-center icon-glow">
                <reason.icon className="w-12 h-12 text-cyan-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 text-center">{reason.title}</h3>
              <p className="text-gray-400 leading-relaxed text-center">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Swipeable Carousel */}
        <div className="md:hidden mb-12 w-full">
          <div
            className="relative w-full select-none"
            style={{ touchAction: "pan-y" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Current Card Display */}
            <div className="relative min-h-[500px] flex items-center justify-center">
              {(() => {
                const currentReason = reasons[currentCardIndex];
                const IconComponent = currentReason.icon;
                return (
                  <div key={currentCardIndex} className="w-full px-2 slide-in">
                    <div className="relative bg-linear-to-b from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 sm:p-8 lightning-effect glow-border min-h-[420px] flex flex-col justify-center">
                      {/* Icon with Light Emission */}
                      <div className="mb-6 flex justify-center">
                        <div className="icon-glow">
                          <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">{currentReason.title}</h3>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed text-center">{currentReason.description}</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6 text-cyan-400" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6 text-cyan-400" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {reasons.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCardIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentCardIndex
                      ? "bg-cyan-400 w-6"
                      : "bg-white/30 w-2 hover:bg-white/50"
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mt-20 pt-20 border-t border-white/10">
          <h3 className="text-3xl font-bold text-center mb-12 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Why Work With Dark Nebula?
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-bold text-white mb-6">What You Get</h4>
              <ul className="space-y-4">
                {[
                  "Custom-built solutions tailored to your business",
                  "Transparent pricing with no hidden costs",
                  "Regular communication and progress updates",
                  "Post-launch support and maintenance",
                  "Scalable architecture for future growth",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold text-xl mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-6">Our Process</h4>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Discovery", desc: "We understand your business, goals, and challenges." },
                  { step: "02", title: "Strategy", desc: "We create a comprehensive plan tailored to your needs." },
                  { step: "03", title: "Execution", desc: "Our team builds your solution with precision and care." },
                  { step: "04", title: "Launch", desc: "We deploy and ensure everything runs perfectly." },
                  { step: "05", title: "Support", desc: "Ongoing support to keep your systems thriving." },
                ].map((process, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 text-white font-bold">
                        {process.step}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-white">{process.title}</h5>
                      <p className="text-gray-400 text-sm">{process.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
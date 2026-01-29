"use client";
import { useEffect } from "react";

import { useState, useRef } from "react";
import {
  Users,
  MessageSquare,
  Zap,
  CheckCircle,
  Shield,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import Iridescence from "@/components/Iridescence";

const carouselStyles = `
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 10px rgba(34,211,238,0.3), 0 0 20px rgba(139,92,246,0.2), inset 0 0 10px rgba(34,211,238,0.1); }
    50% { box-shadow: 0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(139,92,246,0.4), inset 0 0 20px rgba(34,211,238,0.2); }
  }

  @keyframes iconGlow {
    0%,100%{ filter: drop-shadow(0 0 5px rgba(34,211,238,0.3)); }
    50%{ filter: drop-shadow(0 0 15px rgba(34,211,238,0.8)) drop-shadow(0 0 25px rgba(139,92,246,0.6)); }
  }
  .flip-card {
 perspective: 1200px;
}

.flip-inner {
 transition: transform 0.6s ease;
 transform-style: preserve-3d;
 height: 100%;
}


.flip-active {
 transform: rotateY(180deg);
}

.flip-front,
.flip-back {
 backface-visibility: hidden;
 position: absolute;
 inset: 0;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 padding: 2rem;
 text-align: center;
}

.flip-card:hover .flip-inner {
 transform: rotateY(180deg);
}


.flip-back {
 transform: rotateY(180deg);
}

  .icon-glow { animation: iconGlow 2s ease-in-out infinite; }
  .slide-in { animation: slideIn 0.3s ease-out; }
  .cyber-dune {
    background:
      radial-gradient(circle at 20% 20%, rgba(34,211,238,.25), transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(139,92,246,.25), transparent 45%),
      linear-gradient(135deg, rgba(255,180,80,.08), rgba(0,0,0,.9)),
      repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0px, rgba(255,255,255,.03) 1px, transparent 1px, transparent 6px);
    backdrop-filter: blur(12px);
  }
`;

export default function Impact() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);

  const [flipped, setFlipped] = useState<number | null>(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const reasons = [
    {
      title: "Expert Team",
      description:
        "Highly skilled engineers with proven track records in delivering enterprise-grade solutions.",
      icon: Users,
    },
    {
      title: "Transparent Communication",
      description:
        "Clear, honest communication throughout the entire project lifecycle with regular updates.",
      icon: MessageSquare,
    },
    {
      title: "Agile Approach",
      description:
        "Flexible methodologies that adapt to your changing needs and market demands.",
      icon: Zap,
    },
    {
      title: "Quality Assurance",
      description:
        "Rigorous testing and code reviews to ensure your product meets the highest standards.",
      icon: CheckCircle,
    },
    {
      title: "Continuous Support",
      description:
        "Dedicated support team available 24/7 to ensure your systems run smoothly.",
      icon: Shield,
    },
    {
      title: "Innovation First",
      description:
        "Staying ahead of the curve with latest technologies and best practices.",
      icon: Rocket,
    },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    if (Math.abs(touchStartRef.current - touchEndRef.current) > 50)
      handleSwipe();
  };
  const handleSwipe = () => {
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > 50)
      setCurrentCardIndex((prev) => (prev + 1) % reasons.length);
    else if (distance < -50)
      setCurrentCardIndex(
        (prev) => (prev - 1 + reasons.length) % reasons.length,
      );
  };
  const goToPrevious = () =>
    setCurrentCardIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  const goToNext = () =>
    setCurrentCardIndex((prev) => (prev + 1) % reasons.length);

  return (
    <>
      <style>{carouselStyles}</style>
      <section
        id="why-choose"
        className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-gray-200 text-sm drop-shadow-md text-lg max-w-2xl mx-auto">
              We're committed to delivering excellence in every project. Here's
              what sets us apart.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 hidden md:grid">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                
                className="relative flip-card overflow-hidden border border-white/20 rounded-2xl cursor-pointer h-[320px]"


              >
                {!isMobile && (
<Iridescence
className="absolute inset-0"
color={[0.05, 0.17, 0.18]}
mouseReact
amplitude={0.08}
speed={0.9}
/>
)}


                <div
                  className="relative z-10 flip-inner"
                >
                  {/* FRONT */}
                  <div className="flip-front">
                    <div className="mb-4 icon-glow">
                      <reason.icon className="w-12 h-12 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">
                      {reason.title}
                    </h3>
                  </div>

                  {/* BACK */}
                  <div className="flip-back text-center">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-12 w-full">
            <div
              className="relative w-full select-none"
              style={{ touchAction: "pan-y" }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative min-h-[500px] flex items-center justify-center">
                {(() => {
                  const currentReason = reasons[currentCardIndex];
                  const IconComponent = currentReason.icon;
                  return (
                    <div
                      key={currentCardIndex}
                      className="w-full px-2 slide-in"
                    >
                      <div className="relative overflow-hidden border border-white/20 rounded-2xl min-h-[380px] p-8 flex flex-col justify-center items-center text-center bg-black/60 backdrop-blur">

                       
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">

<IconComponent className="w-20 h-20 text-cyan-400 mb-4 icon-glow" />

<h3 className="text-xl font-bold text-white mb-3">
{currentReason.title}
</h3>

<p className="text-gray-400 text-sm max-w-xs">
{currentReason.description}
</p>

</div>

                      </div>
                    </div>
                  );
                })()}
              </div>

              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-cyan-400" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-cyan-400" />
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {reasons.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCardIndex(idx)}
                    className={`h-2 rounded-full transition-all ${idx === currentCardIndex ? "bg-cyan-400 w-6" : "bg-white/30 w-2 hover:bg-white/50"}`}
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
              {/* What You Get */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">
                  What You Get
                </h4>
                <div className="grid gap-6">
                  {[
                    "Custom-built solutions tailored to your business",
                    "Transparent pricing with no hidden costs",
                    "Regular communication and progress updates",
                    "Post-launch support and maintenance",
                    "Scalable architecture for future growth",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 min-h-[80px]"
                    >
                      <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-cyan-400/20 text-cyan-400 icon-glow">
                        <Award className="w-5 h-5" />
                      </span>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Process */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">
                  Our Process
                </h4>
                <div className="grid gap-6">
                  {[
                    {
                      step: "01",
                      title: "Layout & Wireframe",
                      desc: "Plan structure, layout and wireframes for web/app.",
                    },
                    {
                      step: "02",
                      title: "UI/UX Design",
                      desc: "Design visuals, interfaces and user experience.",
                    },
                    {
                      step: "03",
                      title: "Development",
                      desc: "Build website & app with clean, maintainable code.",
                    },
                    {
                      step: "04",
                      title: "Deployment & QA",
                      desc: "Deploy live and test rigorously for quality assurance.",
                    },
                    {
                      step: "05",
                      title: "Security & Maintenance",
                      desc: "Ensure robust security and ongoing maintenance.",
                    },
                  ].map((process, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 min-h-[80px]"
                    >
                      <div className="shrink-0 flex items-center justify-center">
                        <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 text-white font-bold icon-glow">
                          {process.step}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm sm:text-base font-semibold text-white">
                          {process.title}
                        </h5>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {process.desc}
                        </p>
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

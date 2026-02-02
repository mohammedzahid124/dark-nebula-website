"use client";

import Hyperspeed from "@/components/Hyperspeed";
import Balatro from "@/components/Balatro";
import LiquidChrome from "@/components/LiquidChrome";
import PrismaticBurst from "@/components/PrismaticBurst";
import Beams from "@/components/Beams";
import Prism from "@/components/Prism";

import { useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);

    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

export default function FeaturedProject() {
  const isMobile = useIsMobile();

  const partnershipPlans = [
    {
      name: "Web Starter",
      priceLabel: "Starting",
      priceValue: "@ $99",
      description: "Best for portfolios & basic business websites",
      features: [
        "Up to 5 pages",
        "Responsive UI",
        "Contact form",
        "Basic SEO",
        "Deployment support",
      ],
    },
    {
      name: "Business Pro",
      priceLabel: "Starting",
      priceValue: "@ $150",
      description: "For growing brands & startups",
      features: [
        "Up to 10 pages",
        "Admin panel",
        "UI/UX design",
        "API integrations",
        "Performance optimization",
      ],
    },
    {
      name: "Enterprise / Custom",
      price: "Custom",
      period: "pricing",
      description: "Large scale applications",
      features: [
        "Full-stack development",
        "Dedicated team",
        "Cloud deployment",
        "Security setup",
        "Long-term support",
      ],
    },
    {
      name: "ERP / Internal Systems",
      priceLabel: "---------------------------------",
      priceValue: "Custom",
      description: "Custom ERP & dashboards",
      features: [
        "Role based access",
        "Reports & analytics",
        "Employee modules",
        "Cloud deployment",
      ],
    },
    {
      name: "Multi-Vendor Platform",
      price: "Custom",
      period: "pricing",
      description: "Multi seller ecommerce systems",
      features: [
        "Vendor dashboards",
        "Payment gateway",
        "Order management",
        "Admin controls",
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
       <div className="text-center mb-16">
  <h2 className="
    text-4xl md:text-6xl font-extrabold
    bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400
    bg-clip-text text-transparent
    drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]
  ">
    Become a Partner
  </h2>

  <p className="mt-4 text-gray-400 text-lg">
    Let’s build something extraordinary together
  </p>
</div>


        <div className="grid md:grid-cols-3 gap-10">
          {partnershipPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl border border-white/15
                min-h-[520px] md:min-h-[620px]
                shadow-2xl backdrop-blur-sm
                md:scale-[1.05]

                ${plan.name === "ERP / Internal Systems"
                  ? "md:col-start-2 md:-translate-x-55"
                  : ""
                }

                ${plan.name === "Multi-Vendor Platform"
                  ? "md:col-start-3 md:-translate-x-55"
                  : ""
                }
              `}
            >
              {/* 🔴 Web Starter */}
              {plan.name === "Web Starter" && (
                <>
                  {!isMobile ? (
                    <>
                      <div className="absolute inset-0 z-0">
                        <Balatro
                          isRotate={false}
                          mouseInteraction
                          pixelFilter={745}
                          color1="#DE443B"
                          color2="#006BB4"
                          color3="#162325"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/45 z-10" />
                    </>
                  ) : (
                    <>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        src="cosmic.mp4"
                      />
                      <div className="absolute inset-0 bg-black/55 z-10" />
                    </>
                  )}
                </>
              )}


              {/* 🌊 Business Pro */}
              {plan.name === "Business Pro" && (
                <>
                  {!isMobile ? (
                    <>
                      <div className="absolute inset-0 z-0">
                        <LiquidChrome
                          baseColor={[0.25, 0.05, 0.15]}
                          speed={1}
                          amplitude={0.6}
                          interactive
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/45 z-10" />
                    </>
                  ) : (
                    <>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        src="business.mp4"
                      />
                      <div className="absolute inset-0 bg-black/55 z-10" />
                    </>
                  )}
                </>
              )}

              {/* 🚀 Enterprise */}
              {plan.name === "Enterprise / Custom" && (
                <>
                  {!isMobile ? (
                    <>
                      <div className="absolute inset-0 z-0">
                        <Hyperspeed />
                      </div>
                      <div className="absolute inset-0 bg-black/40 z-10" />
                    </>
                  ) : (
                    <>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        src="enterprise.mp4"
                      />
                      <div className="absolute inset-0 bg-black/55 z-10" />
                    </>
                  )}
                </>
              )}

              {/* 🌈 ERP */}
              {plan.name === "ERP / Internal Systems" && (
                <>
                  {!isMobile ? (
                    <>
                      <div className="absolute inset-0 z-0">
                        <Beams
                          beamWidth={3}
                          beamHeight={30}
                          beamNumber={20}
                          lightColor="#ffffff"
                          speed={2}
                          noiseIntensity={1.75}
                          scale={0.2}
                          rotation={30}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/55 z-10" />
                    </>
                  ) : (
                    <>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        src="erp.mp4"
                      />
                      <div className="absolute inset-0 bg-black/55 z-10" />
                    </>
                  )}
                </>
              )}

              {/* 🔮 Multi-Vendor */}
              {plan.name === "Multi-Vendor Platform" && (
                <>
                  {!isMobile ? (
                    <>
                  <div className="absolute inset-0 z-0">
                    <Prism
                      animationType="rotate"
                      timeScale={0.5}
                      height={3.5}
                      baseWidth={5.5}
                      scale={3.6}
                      hueShift={0}
                      colorFrequency={1}
                      noise={0}
                      glow={1}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/55 z-10" />
                </>
              ): (
                    <>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        src="vendor.mp4"
                      />
                      <div className="absolute inset-0 bg-black/55 z-10" />
                    </>
                  )}
                </>
              )}

              {/* ✨ CONTENT */}
              <div className="relative z-20 p-10 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {plan.name}
                </h3>

                <p className="text-gray-400 text-base md:text-lg mb-8">
                  {plan.description}
                </p>

                <div className="mb-10">
                  {plan.priceLabel ? (
                    <>
                      <div className="text-base text-gray-400">
                        {plan.priceLabel}
                      </div>
                      <div className="text-5xl md:text-6xl font-bold text-white">
                        {plan.priceValue}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-5xl md:text-6xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-2 text-lg">
                        {plan.period}
                      </span>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-4 text-gray-300 text-base md:text-lg"
                    >
                      <span className="text-cyan-400">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

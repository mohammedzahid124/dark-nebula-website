"use client";

import Hyperspeed from "@/components/Hyperspeed";
import Balatro from "@/components/Balatro";
import LiquidChrome from "@/components/LiquidChrome";


const starterBasePrice = "$240";
const starterBase1Price = "$600";

export default function FeaturedProject() {
  const partnershipPlans = [
{
 name: "Web Starter",
 priceLabel: "Starting",
 priceValue: "@ $90",
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

// 4 — matches Enterprise background
{
 name: "ERP / Internal Systems",
 priceLabel: "Starting",
 priceValue: "@ $900",
 period: "pricing",
 description: "Custom ERP & dashboards",
 features: [
   "Role based access",
   "Reports & analytics",
   "Employee modules",
   "Cloud deployment",
 ],
},

// 5 — matches Professional background
{
 name: "Multi‑Vendor Platform",
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

// 6 — matches Starter background
{
 name: "E‑Commerce Launch",
 priceLabel: "Starting",
 priceValue: "@ $550",
 description: "Online stores & product platforms",
 features: [
   "Product listings",
   "Cart & checkout",
   "Payment integration",
   "Admin panel",
 ],
},
];


  return (
    <section
      id="partnership"
      className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Become a Partner
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Work with us on a long-term basis. Choose a partnership plan that
            aligns with your business needs.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {partnershipPlans.map((plan, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl transition-all duration-300"
            >
              {/* 🔴 BALATRO — Starter background */}
              {["Web Starter","E‑Commerce Launch"].includes(plan.name) && (

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
              )}

              {/* 🌊 LIQUIDCHROME — Professional background */}
              {["Business Pro","Multi‑Vendor Platform"].includes(plan.name) && (

                <>
                  <div className="absolute inset-0 z-0">
                    <LiquidChrome
                      baseColor={[0.3, 0.0, 0.1]}
                      speed={1}
                      amplitude={0.6}
                      interactive={true}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/45 z-10" />
                </>
              )}

              {/* 🚀 HYPERSPEED — Enterprise background */}
              {["Enterprise / Custom","ERP / Internal Systems"].includes(plan.name) && (

                <>
                  <div className="absolute inset-0 z-0">
                    <Hyperspeed
                      effectOptions={{
                        distortion: "turbulentDistortion",
                        length: 400,
                        roadWidth: 10,
                        islandWidth: 2,
                        lanesPerRoad: 3,
                        fov: 90,
                        fovSpeedUp: 150,
                        speedUp: 2,
                        carLightsFade: 0.4,
                        totalSideLightSticks: 20,
                        lightPairsPerRoadWay: 40,
                        shoulderLinesWidthPercentage: 0.05,
                        brokenLinesWidthPercentage: 0.1,
                        brokenLinesLengthPercentage: 0.5,
                        lightStickWidth: [0.12, 0.5],
                        lightStickHeight: [1.3, 1.7],
                        movingAwaySpeed: [60, 80],
                        movingCloserSpeed: [-120, -160],
                        carLightsLength: [12, 80],
                        carLightsRadius: [0.05, 0.14],
                        carWidthPercentage: [0.3, 0.5],
                        carShiftX: [-0.8, 0.8],
                        carFloorSeparation: [0, 5],
                        colors: {
                          roadColor: 526344,
                          islandColor: 657930,
                          background: 0,
                          shoulderLines: 1250072,
                          brokenLines: 1250072,
                          leftCars: [14177983, 6770850, 12732332],
                          rightCars: [242627, 941733, 3294549],
                          sticks: 242627,
                        },
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 z-10" />
                </>
              )}

              {/* Card content */}
              <div className="relative z-20 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  {plan.priceLabel ? (
                    <div className="leading-tight">
                      <div className="text-sm text-gray-400">
                        {plan.priceLabel}
                      </div>
                      <div className="text-4xl font-bold text-white">
                        {plan.priceValue}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-cyan-400">✓</span>
                      <span className="text-gray-300 text-sm">{feature}</span>
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

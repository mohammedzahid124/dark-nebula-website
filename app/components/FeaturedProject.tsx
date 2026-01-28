"use client";

const starterBasePrice = "$240";
const starterBase1Price = "$600";

export default function FeaturedProject() {
  const partnershipPlans = [
    {
      name: "Starter",
      priceLabel: "Starting",
      priceValue: `@ ${starterBasePrice}`,
      period: "",
      description: "Perfect for early-stage startups",
      features: [
        "Up to 40 hours/month",
        "2 dedicated developers",
        "Bi-weekly check-ins",
        "Technical consultations",
        "Bug fixes & support",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      priceLabel: "Starting",
      priceValue: `@ ${starterBase1Price}`,
      description: "Ideal for growing businesses",
      features: [
        "Up to 80 hours/month",
        "4 dedicated developers",
        "Weekly check-ins",
        "Priority support",
        "Feature development",
        "Performance optimization",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large-scale projects",
      features: [
        "Unlimited hours",
        "Dedicated full team",
        "Daily coordination",
        "24/7 support",
        "Custom solutions",
        "SLA guaranteed",
      ],
      highlighted: false,
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
            Work with us on a long-term basis. Choose a partnership plan that aligns with your business needs.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {partnershipPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "md:scale-105 bg-linear-to-b from-purple-900/30 to-cyan-900/30 border border-purple-500/50 shadow-2xl shadow-purple-500/30"
                  : "bg-linear-to-b from-white/10 to-white/5 border border-white/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                {/* PRICE SECTION (UPDATED) */}
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
                      <span className="text-gray-400 ml-2">
                        {plan.period}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-cyan-400">✓</span>
                      <span className="text-gray-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Vision?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how Dark Nebula can help you build the future. Schedule a free consultation with our team.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all font-semibold"
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
}

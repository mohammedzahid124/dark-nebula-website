"use client";

import { Users, MessageSquare, Zap, CheckCircle, Shield, Rocket } from "lucide-react";

export default function Impact() {
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

  return (
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
              className="group relative bg-linear-to-b from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-500 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              {/* Icon */}
              <div className="mb-4 group-hover:scale-125 transition-transform duration-300">
                <reason.icon className="w-10 h-10 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-gray-400 leading-relaxed">{reason.description}</p>
            </div>
          ))}
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
  );
}
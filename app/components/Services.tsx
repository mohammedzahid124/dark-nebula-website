"use client";

import { Shield, Brain, BarChart3, Code, Palette, Server, Mail, TrendingUp, Share2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Web Development",
      icon: Code,
      color: "from-blue-500 to-cyan-600",
      lightColor: "text-blue-400",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/70",
      features: [
        "Full-stack development",
        "React & Next.js apps",
        "RESTful API design",
        "Database architecture",
        "Backend optimization",
        "Real-time features",
        "Progressive web apps",
        "API integration",
        "Performance tuning",
        "Code quality assurance",
      ],
      description: "Modern, scalable web applications built with cutting-edge technologies and best practices.",
    },
    {
      id: 2,
      title: "Web Design & UX",
      icon: Palette,
      color: "from-pink-500 to-rose-600",
      lightColor: "text-pink-400",
      borderColor: "border-pink-500/30",
      hoverBorder: "hover:border-pink-500/70",
      features: [
        "UI/UX design",
        "Responsive design",
        "Figma prototyping",
        "User research",
        "Accessibility (A11y)",
        "Design systems",
        "Brand identity",
        "Landing pages",
        "Animation & interactions",
        "Mobile-first approach",
      ],
      description: "Beautiful, intuitive interfaces that engage users and drive conversions with seamless experiences.",
    },
    {
      id: 3,
      title: "DevOps & Infrastructure",
      icon: Server,
      color: "from-green-500 to-emerald-600",
      lightColor: "text-green-400",
      borderColor: "border-green-500/30",
      hoverBorder: "hover:border-green-500/70",
      features: [
        "Cloud deployment (AWS, GCP)",
        "Docker containerization",
        "Kubernetes orchestration",
        "CI/CD pipelines",
        "Infrastructure as Code",
        "Monitoring & logging",
        "Auto-scaling setup",
        "Database management",
        "Security hardening",
        "Disaster recovery",
      ],
      description: "Robust infrastructure solutions ensuring reliability, security, and optimal application performance.",
    },
    {
      id: 4,
      title: "Cybersecurity & Offensive Security",
      icon: Shield,
      color: "from-red-500 to-red-600",
      lightColor: "text-red-400",
      borderColor: "border-red-500/30",
      hoverBorder: "hover:border-red-500/70",
      features: [
        "Antivirus solutions",
        "Honeypot security systems",
        "CEH-based methodologies",
        "DDoS protection",
        "Network security & monitoring",
        "Penetration testing",
        "Footprinting & reconnaissance",
        "Network scanning & enumeration",
        "Vulnerability assessment",
        "System threat analysis",
        "Sniffing & social engineering analysis",
        "Cryptography solutions",
        "VPNs for websites & infrastructure",
      ],
      description: "Enterprise-grade security solutions protecting your infrastructure from advanced threats and vulnerabilities.",
    },
    {
      id: 5,
      title: "Agentic AI & Generative AI",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      lightColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      hoverBorder: "hover:border-purple-500/70",
      features: [
        "Autonomous AI agents",
        "Task-oriented agent workflows",
        "LLM-powered systems",
        "Generative AI for content",
        "Code generation & automation",
        "AI-driven decision intelligence",
        "Custom AI tools for businesses",
        "Neural network optimization",
        "Model fine-tuning & deployment",
      ],
      description: "Cutting-edge AI solutions that automate complex tasks and unlock new business possibilities.",
    },
    {
      id: 6,
      title: "Data Analytics & Data Engineering",
      icon: BarChart3,
      color: "from-cyan-500 to-blue-600",
      lightColor: "text-cyan-400",
      borderColor: "border-cyan-500/30",
      hoverBorder: "hover:border-cyan-500/70",
      features: [
        "Data pipelines & ETL",
        "Data warehousing",
        "Analytics dashboards",
        "Business intelligence systems",
        "Data visualization",
        "Scalable data architecture",
        "Real-time data streaming",
        "Data governance & quality",
        "Predictive analytics",
      ],
      description: "Transform raw data into actionable intelligence with our advanced analytics and engineering services.",
    },
    {
      id: 7,
      title: "Email Services",
      icon: Mail,
      color: "from-orange-500 to-amber-600",
      lightColor: "text-orange-400",
      borderColor: "border-orange-500/30",
      hoverBorder: "hover:border-orange-500/70",
      features: [
        "Email marketing campaigns",
        "Newsletter automation",
        "Drip campaigns & sequences",
        "Segmentation & personalization",
        "A/B testing & optimization",
        "Responsive email templates",
        "List management & hygiene",
        "Deliverability optimization",
        "Email analytics & reporting",
        "Integration with CRM systems",
      ],
      description: "Comprehensive email marketing solutions designed to nurture leads, engage customers, and drive conversions through targeted campaigns.",
    },
    {
      id: 8,
      title: "Digital Marketing & Growth",
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-600",
      lightColor: "text-indigo-400",
      borderColor: "border-indigo-500/30",
      hoverBorder: "hover:border-indigo-500/70",
      features: [
        "SEO & search marketing",
        "PPC & paid advertising",
        "Email marketing campaigns",
        "Content marketing strategy",
        "Brand awareness building",
        "Marketing automation",
        "Performance analytics",
        "Customer journey mapping",
        "Growth hacking strategies",
        "Market segmentation",
      ],
      description: "Comprehensive digital marketing solutions driving sustainable growth and brand visibility.",
    },
    {
      id: 9,
      title: "Social Media Marketing",
      icon: Share2,
      color: "from-fuchsia-500 to-pink-600",
      lightColor: "text-fuchsia-400",
      borderColor: "border-fuchsia-500/30",
      hoverBorder: "hover:border-fuchsia-500/70",
      features: [
        "Social media strategy",
        "Content creation & curation",
        "Community management",
        "Influencer partnerships",
        "Social advertising",
        "Engagement optimization",
        "Social listening tools",
        "Trend analysis",
        "Platform-specific expertise",
        "Crisis management",
      ],
      description: "Strategic social media management building authentic engagement and brand loyalty.",
    },
  ];

  return (
    <section id="services" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
            What We Do
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Complete technology solutions from security and AI to web development and infrastructure management. Your success is our mission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative h-full overflow-hidden rounded-2xl border ${service.borderColor} ${service.hoverBorder} transition-all duration-300 hover:shadow-2xl`}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Dark background */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                
                {/* Glowing border animation */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.color} rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                />

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-block p-4 rounded-xl bg-linear-to-br ${service.color} bg-opacity-10`}>
                      <IconComponent className={`w-8 h-8 ${service.lightColor} group-hover:scale-125 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold mb-3 bg-linear-to-r ${service.color} bg-clip-text text-transparent`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6">{service.description}</p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 grow">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 group/feature">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-linear-to-r ${service.color}`} />
                        <span className="text-xs text-gray-300 group-hover/feature:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`mt-6 w-full py-2 px-4 bg-linear-to-r ${service.color} text-white rounded-lg opacity-80 group-hover:opacity-100 transition-all font-semibold text-sm`}>
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Security Audits" },
              { number: "200+", label: "AI Projects" },
              { number: "1M+", label: "Data Points Processed" },
              { number: "99.9%", label: "System Uptime" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  Shield,
  Brain,
  BarChart3,
  Code,
  Palette,
  Server,
  Building2,
  TrendingUp,
  Layers,
} from "lucide-react";
import { useState } from "react";

export default function Services() {
  const [activeService, setActiveService] = useState<any>(null);

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
      description:
        "Modern, scalable web applications built with cutting-edge technologies and best practices.",
      details: `
We build scalable, production‑ready web platforms using React, Next.js, and modern backend stacks.

Our process includes system architecture planning, REST & realtime APIs, database design, authentication, performance optimization, and cloud deployment.


`,
      example: `
Imagine you want to open a lemonade stand online.

We build the website (the stand), payment system (the cash box), inventory (how many lemons you have), and make sure customers can easily order without spills.

Basically: we build your digital shop from scratch and make sure it doesn’t crash on opening day.
`,
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
        "Conversion-focused user experiences",
"Flawless multi-device performance",
"Interactive prototypes before development",
"Research-backed design decisions",
"Inclusive and accessible interfaces",
"Scalable brand-consistent systems",
"Memorable brand identities",
"High-converting landing experiences",
"Engaging micro-animations",
"Mobile-first digital experiences",
      ],
      description:
        "Beautiful, intuitive interfaces that engage users and drive conversions with seamless experiences.",
      details: `
We craft beautiful, user‑centered interfaces that convert visitors into customers.

Our UX process includes research, wireframing, prototyping in Figma, accessibility audits, and responsive design systems.


`,
      example: `
This is like arranging furniture in your house.

Sure, everything can fit — but we make sure people don’t trip over chairs, find the bathroom easily, and actually enjoy being inside.

Pretty + easy = happy users.
`,
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
      description:
        "Robust infrastructure solutions ensuring reliability, security, and optimal application performance.",
      details: `
We design secure, highly‑available cloud infrastructure using AWS/GCP with automated deployments.

Our DevOps workflows include Docker, Kubernetes, CI/CD pipelines, monitoring, logging, and disaster recovery.


`,
      example: `
Think of this as building roads, power lines, and water pipes for your app.

You don’t see them — but without them nothing works.  
We make sure your website doesn’t faint when lots of visitors show up.
`,
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
        "Vulnerability Assessment and Penetration Testing",
        "Web application penetration testing",
        "Network security & monitoring",
        "Penetration testing",
        "Secure internet access (VPNs)",
        "Bot manager & Cyber Resilience",
        "App and API protector",
        "Footprinting & reconnaissance",
        "Network scanning & enumeration",
        "Vulnerability assessment",
        "System threat analysis",
        "Sniffing & social engineering analysis",
        "Cryptography solutions",
        "VPNs for websites & infrastructure",
      ],
      description:
        "Enterprise-grade security solutions protecting your infrastructure from advanced threats and vulnerabilities.",
      details: `
We protect your systems using enterprise‑grade cybersecurity and offensive security practices.

Our services include penetration testing, vulnerability assessment, network security, honeypots, DDoS protection, VPNs, and cryptographic solutions.


`,
      example: `
You lock your house. You install cameras. You don’t give strangers your keys.

We do exactly that for your digital business — except hackers don’t knock first.
`,
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
      description:
        "Cutting-edge AI solutions that automate complex tasks and unlock new business possibilities.",
      details: `
We build intelligent AI agents and generative systems powered by LLMs and neural networks.

Solutions include autonomous workflows, task automation, custom AI tools, model fine‑tuning, and deployment pipelines.


`,
      example: `
Imagine hiring a super‑smart robot intern.

It writes content, answers customers, analyzes data, and works 24/7 without coffee breaks.

That’s what we build.
`,
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
      description:
        "Transform raw data into actionable intelligence with our advanced analytics and engineering services.",
      details: `
We transform raw data into actionable intelligence through scalable pipelines and analytics platforms.

Our solutions cover ETL pipelines, data warehouses, dashboards, real‑time streaming, and predictive analytics.


`,
      example: `
You have thousands of puzzle pieces (data).

We organize them and show you the picture — so you know what customers like, what’s broken, and what’s making money.
`,
    },
    {
  id: 7,
  title: "Business Management Systems",
  icon: Building2, // or Settings / Layers / Database
  color: "from-indigo-500 to-purple-600",
  lightColor: "text-indigo-400",
  borderColor: "border-indigo-500/30",
  hoverBorder: "hover:border-indigo-500/70",
  features: [
    "Restaurant management systems",
    "School management systems",
    "Inventory & purchasing systems",
    "ERP-style internal systems",
    "Role-based access control",
    "Workflow automation",
    "Reporting & analytics",
    "Multi-branch & multi-user support",
    "Secure data management",
    "Custom modules & integrations",
  ],
  description:
    "Custom-built business management systems designed to streamline operations, improve visibility, and scale with your organization.",
  details: `
We build tailored business management platforms that simplify complex operations.

From restaurants and schools to inventory, purchasing, and ERP-style internal systems, our solutions are designed to automate workflows, centralize data, and provide real-time insights — all built to match your exact business processes.
`,
  example: `
Instead of juggling spreadsheets, tools, and manual processes…

You get one intelligent system that runs your business smoothly — organized, automated, and ready to scale.
`,
},

    {
      id: 8,
      title: "Digital Marketing & Growth",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      lightColor: "text-orange-400",
      borderColor: "border-orange-500/30",
      hoverBorder: "hover:border-orange-500/70",
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
      description:
        "Comprehensive digital marketing solutions driving sustainable growth and brand visibility.",
      details: `
We drive measurable growth using SEO, paid ads, marketing automation, and performance analytics.

Our growth strategies focus on customer journeys, acquisition funnels, and brand visibility.

`,
      example: `
You built something awesome — but nobody knows.

We’re the megaphone 📣 that tells the internet you exist and helps the right customers find you.
`,
    },
   {
  id: 9,
  title: "Customized Applications",
  icon: Layers, // or Code / AppWindow / Settings
  color: "from-amber-400 to-yellow-600",
lightColor: "text-amber-400",
borderColor: "border-amber-500/30",
hoverBorder: "hover:border-amber-500/70",

  features: [
    "Custom web applications",
    "Internal business tools",
    "Industry‑specific solutions",
    "Workflow automation",
    "Role‑based access systems",
    "Scalable backend architecture",
    "Third‑party API integrations",
    "Secure data handling",
    "Performance optimization",
    "Ongoing enhancements & support",
  ],
  description:
    "Tailor‑made applications designed to solve unique business challenges with precision, scalability, and performance.",
  details: `
We design and build fully customized applications that align perfectly with your business processes.

From internal tools and dashboards to industry‑specific platforms, every solution is engineered for usability, security, and long‑term scalability — not one‑size‑fits‑all software.
`,
  example: `
Instead of forcing your business to fit generic software…

We build software that fits your business — custom, efficient, and built exactly the way you need it.
`,
},

  ];

  return (
    <section
      id="services"
      className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
            What We Do
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Complete technology solutions from security and AI to web
            development and infrastructure management. Your success is our
            mission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative h-full overflow-hidden rounded-2xl border
${service.borderColor} ${service.hoverBorder}
transition-all duration-300
bg-black/40 backdrop-blur-lg
shadow-[0_10px_40px_rgba(0,0,0,0.3)]
hover:shadow-[0_25px_80px_rgba(0,0,0,0.6)]
hover:scale-105`}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
                />

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
                    <div
                      className={`inline-block p-4 rounded-xl bg-linear-to-br ${service.color} bg-opacity-10`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${service.lightColor} group-hover:scale-125 transition-transform duration-300`}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl font-bold mb-3 bg-linear-to-r ${service.color} bg-clip-text text-transparent`}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6">
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 grow">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 group/feature"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-linear-to-r ${service.color}`}
                        />
                        <span className="text-xs text-gray-300 group-hover/feature:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => setActiveService(service)}
                    className={`mt-6 w-full py-2 px-4 bg-linear-to-r ${service.color} text-white rounded-lg opacity-80 group-hover:opacity-100 transition-all font-semibold text-sm`}
                  >
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
              { number: "15+", label: "Projects Completed" },
              { number: "5+", label: "Active Clients" },
              { number: "3+", label: "Core Services" },
              { number: "100%", label: "Client Satisfaction" },
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
      {activeService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center px-3 sm:px-6">
          <div className="relative w-full max-w-3xl h-[90vh] bg-black border border-white/20 rounded-xl sm:rounded-2xl flex flex-col">
            {/* Close */}
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-3 right-3 z-50 h-10 w-10 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center text-lg hover:bg-white/10"
            >
              ✕
            </button>

            <div className="flex-1 overflow-y-auto p-6 sm:p-10 overscroll-contain">


              <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {activeService.title}
              </h2>

              <p className="text-gray-300 mb-6">{activeService.description}</p>

              <h4 className="text-white font-semibold mb-2">How we deliver</h4>

              <ul className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                {activeService.features.map((f: string, i: number) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>

              <div className="mt-6 text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {activeService.details}
              </div>
              <div className="mt-8 relative rounded-xl p-[1px] bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500">
                <div className="bg-black/90 rounded-xl p-5 backdrop-blur">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">💡</span>
                    <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">
                      Real‑life example
                    </span>
                  </div>

                  <p className="text-sm text-gray-200 italic leading-relaxed whitespace-pre-line">
                    {activeService.example}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </section>
  );
}
 
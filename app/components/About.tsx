"use client";

export default function About() {
  const team = [
    {
      name: "Nashrat Jahan",
      role: "Full Stack Developer",
      bio: "Building scalable web solutions with modern technologies.",
      skills: ["React", "TypeScript", "Next.js", "Node.js", "Web3"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "TS Mohammed Zahid",
      role: "Full Stack Developer",
      bio: "Crafting elegant code and seamless user experiences.",
      skills: ["React", "Python", "AWS", "GraphQL", "DevOps"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  ];

  return (
    <section id="about" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            We're a team of passionate engineers dedicated to building innovative solutions that drive real business impact. With years of experience across the full stack, we transform ideas into reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="group relative bg-linear-to-b from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-cyan-500 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              <div className="mb-6">
                <div className="w-20 h-20 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-purple-400 font-semibold">{member.role}</p>
              </div>

              <p className="text-gray-400 mb-6">{member.bio}</p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-gray-300 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-cyan-500/30 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.949v5.418h-3.554s.05-8.79 0-9.714h3.554v1.375c.425-.656 1.185-1.589 2.882-1.589 2.105 0 3.684 1.375 3.684 4.331v5.597zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.951.77-1.71 1.916-1.71 1.144 0 1.915.759 1.915 1.71 0 .951-.771 1.71-1.915 1.71zm1.6 11.597H3.738V9.538h3.199v10.914zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Section */}
        <div className="mt-20 pt-20 border-t border-white/10">
          <h3 className="text-3xl font-bold mb-12 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((project) => (
              <div
                key={project}
                className="bg-linear-to-b from-white/10 to-white/5 border border-white/20 rounded-xl p-6 hover:border-purple-500/50 transition-all group cursor-pointer"
              >
                <div className="w-full h-40 bg-linear-to-br from-purple-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-white/50 text-4xl font-bold">{project}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Project {project}</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Innovative solution delivering real impact and transforming the way businesses operate.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">React</span>
                  <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">TypeScript</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
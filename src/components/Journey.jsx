import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Code2, Rocket, GitCommit, CheckCircle2 } from 'lucide-react';

const journeyMilestones = [
  {
    year: "Education",
    title: "Higher Secondary (Plus Two)",
    subtitle: "Kerala, India",
    description: "Completed higher secondary education, laying strong foundations in mathematics and science.",
    icon: GraduationCap,
    color: "text-blue-400 bg-blue-500/20 border-blue-500/30",
    tags: ["Plus Two", "Foundation"],
  },
  {
    year: "Certification",
    title: "NCVT Certification",
    subtitle: "National Council for Vocational Training",
    description: "Earned official NCVT certification, validating technical discipline and practical skill sets.",
    icon: Award,
    color: "text-violet-400 bg-violet-500/20 border-violet-500/30",
    tags: ["NCVT", "Vocational Training"],
  },
  {
    year: "Training",
    title: "Full Stack Development Mastery",
    subtitle: "Entri App Program",
    description: "Immersed in full-stack web development training with special emphasis on the MERN stack (MongoDB, Express.js, React, Node.js). Built frontend interfaces and backend APIs.",
    icon: Code2,
    color: "text-cyan-accent bg-cyan-accent/20 border-cyan-accent/30",
    tags: ["MERN Stack", "JavaScript ES6+", "REST APIs"],
  },
  {
    year: "Projects",
    title: "Real-World MERN Applications",
    subtitle: "Project Portfolio",
    description: "Architected and deployed full-stack applications including FilmoraX Movie Streaming Platform and MERN E-Commerce Platform with JWT authentication and Redux state management.",
    icon: GitCommit,
    color: "text-emerald-accent bg-emerald-accent/20 border-emerald-accent/30",
    tags: ["FilmoraX", "MERN E-Commerce", "Portfolio"],
  },
  {
    year: "Goal",
    title: "Junior / Fresher Developer Role",
    subtitle: "Current Career Objective",
    description: "Actively seeking a Junior MERN Stack Developer role where I can contribute to production software, collaborate with experienced engineers, and continuously expand my skill set.",
    icon: Rocket,
    color: "text-teal-400 bg-teal-500/20 border-teal-500/30",
    tags: ["Available for Hire", "Full-Time / Remote"],
  },
];

const Journey = () => {
  return (
    <section id="journey" className="py-24 relative bg-dark-bg/95 bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-cyan-accent text-xs font-mono">
            <GitCommit className="w-3.5 h-3.5" /> Career Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            My <span className="text-gradient">Journey</span> & Milestones
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            The progression of my education, technical training, project development, and future goals.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-accent via-violet-accent to-emerald-accent opacity-40" />

          <div className="space-y-12">
            {journeyMilestones.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Timeline Node Icon Center */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-full ${item.color} border flex items-center justify-center shadow-lg shadow-black/50 backdrop-blur-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pl-12' : 'sm:pr-12'} w-full`}>
                    <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-accent/40 transition-all duration-300 relative group shadow-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-cyan-accent bg-cyan-accent/10 px-2.5 py-0.5 rounded-full border border-cyan-accent/20">
                          {item.year}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">{item.subtitle}</span>
                      </div>

                      <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-accent transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;

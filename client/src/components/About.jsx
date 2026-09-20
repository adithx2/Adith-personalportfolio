import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Code, Rocket, CheckCircle, Terminal, Cpu } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "Plus Two",
    description: "Completed higher secondary education in Kerala, building a strong analytical foundation.",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-cyan-500/30",
    badge: "Completed",
  },
  {
    icon: Award,
    title: "Vocational Certification",
    subtitle: "NCVT Certification",
    description: "Earned NCVT certification, validating technical skills and practical domain expertise.",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    badge: "Certified",
  },
  {
    icon: Code,
    title: "Specialized Training",
    subtitle: "Full Stack Development (MERN)",
    description: "Mastered full stack web development using MongoDB, Express.js, React, and Node.js through intensive hands-on project training.",
    color: "from-cyan-500/20 to-emerald-500/20",
    borderColor: "border-emerald-500/30",
    badge: "MERN Stack Specialist",
  },
  {
    icon: Rocket,
    title: "Current Focus & Goal",
    subtitle: "Junior Developer Opportunity",
    description: "Seeking a Junior / Fresher MERN Stack Developer role in an agile engineering team to contribute, learn, and build scalable web applications.",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-teal-500/30",
    badge: "Ready for Work",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-cyan-accent text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" /> About Me
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Driven by Curiosity, <span className="text-gradient">Focused on Code</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            I am a motivated Junior Full Stack Developer based in Kerala, India. My journey is built on continuous learning, problem-solving, and a passion for crafting interactive web applications.
          </p>
        </motion.div>

        {/* Story Intro Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
                <Terminal className="w-6 h-6 text-cyan-accent" />
                MERN Stack Developer & Tech Enthusiast
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Starting with foundational web technologies, I immersed myself in modern JavaScript frameworks and backend architecture. Through dedicated training at Entri App, I gained hands-on experience building RESTful APIs, implementing state management with Redux, and designing responsive React interfaces.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-accent bg-cyan-accent/10 px-3 py-1 rounded-full border border-cyan-accent/20">
                  <CheckCircle className="w-3.5 h-3.5" /> Responsive UI Design
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-accent bg-cyan-accent/10 px-3 py-1 rounded-full border border-cyan-accent/20">
                  <CheckCircle className="w-3.5 h-3.5" /> RESTful API Integration
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-accent bg-cyan-accent/10 px-3 py-1 rounded-full border border-cyan-accent/20">
                  <CheckCircle className="w-3.5 h-3.5" /> Database Architecture
                </span>
              </div>
            </div>

            <div className="md:col-span-4 glass-card p-6 rounded-xl border border-white/10 text-center space-y-3 bg-dark-card/90">
              <div className="text-3xl font-heading font-extrabold text-cyan-accent">100%</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-mono">Dedicated Learner</div>
              <p className="text-xs text-gray-400">
                Eager to collaborate on real-world projects and grow alongside senior engineers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Animated Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`glass-card p-6 rounded-2xl border ${item.borderColor} transition-all duration-300 relative group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-cyan-accent mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 mb-2 inline-block">
                  {item.badge}
                </span>

                <h4 className="text-lg font-heading font-bold text-white mt-1">{item.title}</h4>
                <div className="text-xs font-semibold text-cyan-accent mb-2">{item.subtitle}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;

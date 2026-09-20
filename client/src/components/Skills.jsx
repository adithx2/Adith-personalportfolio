import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Wrench, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

const skillCategories = [
  {
    category: "Frontend Development",
    icon: Code2,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    skills: [
      { name: "HTML5", iconClass: "devicon-html5-plain colored", level: "Advanced", desc: "Semantic markup & web structure" },
      { name: "CSS3", iconClass: "devicon-css3-plain colored", level: "Advanced", desc: "Flexbox, Grid, Animations, Responsive UI" },
      { name: "JavaScript", iconClass: "devicon-javascript-plain colored", level: "Advanced", desc: "ES6+, Async/Await, DOM, Closures" },
      { name: "React.js", iconClass: "devicon-react-original colored", level: "Intermediate", desc: "Hooks, Props, State, React Router" },
      { name: "Bootstrap", iconClass: "devicon-bootstrap-plain colored", level: "Intermediate", desc: "Grid system & component styling" },
      { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-plain colored", level: "Intermediate", desc: "Utility-first styling & dark mode" },
    ],
  },
  {
    category: "Backend Development",
    icon: Layers,
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
    skills: [
      { name: "Node.js", iconClass: "devicon-nodejs-plain colored", level: "Intermediate", desc: "Event-driven runtime & asynchronous I/O" },
      { name: "Express.js", iconClass: "devicon-express-original text-gray-200", level: "Intermediate", desc: "REST API routes, Middleware, Controller architecture" },
    ],
  },
  {
    category: "Database & ORM",
    icon: Database,
    color: "from-green-500/20 to-teal-500/20",
    borderColor: "border-green-500/30",
    skills: [
      { name: "MongoDB", iconClass: "devicon-mongodb-plain colored", level: "Intermediate", desc: "NoSQL document collections & aggregation" },
      { name: "Mongoose", iconClass: "devicon-mongodb-plain text-green-400", level: "Intermediate", desc: "Schema modeling, validation, queries" },
    ],
  },
  {
    category: "Tools & Libraries",
    icon: Wrench,
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    skills: [
      { name: "Git", iconClass: "devicon-git-plain colored", level: "Intermediate", desc: "Version control, branching & merging" },
      { name: "GitHub", iconClass: "devicon-github-original text-white", level: "Intermediate", desc: "Repositories, Pull requests & collaboration" },
      { name: "REST APIs", iconClass: "devicon-fastapi-plain colored", level: "Advanced", desc: "JSON responses, HTTP methods, status codes" },
      { name: "JWT", iconClass: "devicon-json-plain colored", level: "Intermediate", desc: "Token authentication & protected routes" },
      { name: "Axios", iconClass: "devicon-javascript-plain text-blue-400", level: "Advanced", desc: "Async HTTP requests, interceptors" },
      { name: "Redux", iconClass: "devicon-redux-original colored", level: "Intermediate", desc: "Global state management & slices" },
    ],
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCategories = activeCategory === "All"
    ? skillCategories
    : skillCategories.filter(cat => cat.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="skills" className="py-24 relative bg-dark-bg/95 bg-tech-grid">
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
            <Sparkles className="w-3.5 h-3.5" /> Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Tech Stack & <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Technologies and tools I use to build full-stack web applications from front-end user interfaces to back-end RESTful APIs.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {["All", "Frontend", "Backend", "Database", "Tools"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeCategory === tab
                    ? "bg-cyan-accent text-black font-bold shadow-glow-cyan"
                    : "glass-card text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="space-y-12">
          {filteredCategories.map((cat, catIdx) => {
            const CategoryIcon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${cat.color} text-cyan-accent border ${cat.borderColor}`}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">{cat.category}</h3>
                  <span className="text-xs text-gray-500 font-mono">({cat.skills.length} technologies)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: skillIdx * 0.05 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="glass-card p-5 rounded-2xl border border-white/10 hover:border-cyan-accent/50 transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-accent/5 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-accent/15 transition-all" />

                      <div className="flex items-start gap-4">
                        <div className="text-3xl p-2.5 rounded-xl bg-dark-bg/80 border border-white/10 group-hover:scale-110 transition-transform flex items-center justify-center">
                          <i className={skill.iconClass}></i>
                        </div>

                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-heading font-bold text-white group-hover:text-cyan-accent transition-colors">
                              {skill.name}
                            </h4>
                            <span className="text-[10px] font-mono text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded border border-cyan-accent/20">
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed font-sans">{skill.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;

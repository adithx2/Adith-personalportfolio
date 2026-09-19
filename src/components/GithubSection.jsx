import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Code, Activity, Terminal } from 'lucide-react';

const featuredRepos = [
  {
    name: 'Movie-streaming-platform',
    title: 'FilmoraX Streamer',
    description: 'React movie streaming platform with TMDB API integration and responsive UI.',
    language: 'JavaScript',
    langColor: 'bg-yellow-400',
    stars: 12,
    forks: 4,
    url: 'https://github.com/adithx2/Movie-streaming-platform',
  },
  {
    name: 'ecommerce-frontend',
    title: 'MERN E-Commerce App',
    description: 'Full-stack MERN online shop with JWT authentication & Redux state management.',
    language: 'JavaScript',
    langColor: 'bg-yellow-400',
    stars: 15,
    forks: 6,
    url: 'https://github.com/adithx2/ecommerce-frontend',
  },
  {
    name: 'Adith-personalportfolio',
    title: 'Developer Portfolio',
    description: 'Interactive React portfolio with Framer Motion, Tailwind, and animated terminal UI.',
    language: 'JavaScript',
    langColor: 'bg-yellow-400',
    stars: 8,
    forks: 2,
    url: 'https://github.com/adithx2/Adith-personalportfolio',
  },
];

const GithubSection = () => {
  return (
    <section id="github" className="py-24 relative bg-dark-bg">
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
            <Github className="w-3.5 h-3.5" /> Code & Repositories
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Check out my open-source code repositories, commit activity, and software projects on GitHub.
          </p>
        </motion.div>

        {/* GitHub Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 mb-12 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* User Profile Summary */}
            <div className="md:col-span-5 flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-accent/20 to-violet-accent/20 border border-cyan-accent/40 p-1 flex-shrink-0">
                <div className="w-full h-full rounded-xl bg-dark-bg flex items-center justify-center text-cyan-accent text-3xl font-heading font-bold">
                  A
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  Adith <span className="text-xs font-mono text-cyan-accent">@adithx2</span>
                </h3>
                <p className="text-xs text-gray-400">Junior Full Stack / MERN Stack Developer</p>
                <div className="pt-1">
                  <a
                    href="https://github.com/adithx2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-accent hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" /> Visit GitHub Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Quick Counters */}
            <div className="md:col-span-7 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">10+</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono">Public Repos</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-cyan-accent">100+</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono">Git Commits</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-accent">100%</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono">MERN Code</div>
              </div>
            </div>
          </div>

          {/* Activity Graph Heatmap Mockup */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-accent" /> Recent Contribution Activity
              </span>
              <span>Less → More</span>
            </div>

            {/* Grid of green contribution blocks */}
            <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 p-3 rounded-xl bg-dark-bg/80 border border-white/5 overflow-x-auto">
              {Array.from({ length: 96 }).map((_, i) => {
                const opacity = (i * 37) % 5;
                const colors = [
                  'bg-white/5',
                  'bg-emerald-950',
                  'bg-emerald-800',
                  'bg-emerald-600',
                  'bg-emerald-400',
                ];
                return (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${colors[opacity]} hover:scale-125 transition-transform`}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Featured Repository Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-accent/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-accent font-heading font-bold text-base">
                    <Code className="w-4 h-4" />
                    <span>{repo.title}</span>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-2">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs text-gray-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-gray-400" /> {repo.forks}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubSection;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Check, Layers, Code2, Sparkles } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass-card rounded-2xl border border-white/15 overflow-hidden shadow-2xl z-10 bg-dark-card my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white border border-white/10 hover:border-cyan-accent transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Visual Banner */}
          <div className="relative h-56 sm:h-72 w-full bg-gradient-to-br from-dark-lighter to-dark-bg overflow-hidden flex items-center justify-center border-b border-white/10">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top opacity-90"
              />
            ) : (
              <div className="text-center p-6 space-y-3">
                <Code2 className="w-16 h-16 text-cyan-accent mx-auto" />
                <h4 className="text-xl font-heading font-bold text-white">{project.title}</h4>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-accent bg-cyan-accent/10 px-3 py-1 rounded-full border border-cyan-accent/20">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-2">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-3">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Features List */}
            {project.features && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-gray-400">Key Highlights & Architecture</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 p-2 rounded-lg bg-white/5 border border-white/5">
                      <Check className="w-4 h-4 text-emerald-accent flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Badges */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-gray-400">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono text-cyan-accent bg-cyan-accent/10 rounded-full border border-cyan-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-cyan-accent rounded-xl hover:bg-cyan-300 transition-all shadow-glow-cyan"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white glass-card border border-white/15 rounded-xl hover:border-cyan-accent/40 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;

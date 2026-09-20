import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Check, Sparkles, Code2, Layers } from 'lucide-react';

const projectsData = {
  filmorax: {
    id: 'filmorax',
    title: 'FilmoraX — Movie Streaming Platform',
    category: 'Full Stack / React App',
    description: 'A modern, responsive movie discovery and streaming web application featuring real-time movie listings, search filtering, and media previews.',
    longDescription: 'FilmoraX is an interactive entertainment application built with React and TMDB API integration. It presents trending movies, upcoming cinema releases, genre filters, and detailed media previews in a dark cinematic UI.',
    tags: ['React', 'TMDB API', 'React Router', 'Axios', 'Responsive UI', 'CSS Grid'],
    demoUrl: 'https://moviestreamingplatform-lps9.vercel.app/',
    githubUrl: 'https://github.com/adithx2/Movie-streaming-platform',
    features: [
      'Real-time TMDB API integration for latest movies & trailers',
      'Dynamic search & genre category filtering',
      'Responsive dark mode layout optimized for mobile & desktop',
      'React Router single-page navigation',
    ],
    bgGradient: 'from-blue-600/30 to-violet-600/30',
  },
  'mern-ecommerce': {
    id: 'mern-ecommerce',
    title: 'MERN E-Commerce Platform',
    category: 'Full Stack (MERN)',
    description: 'Full-stack online shopping platform with user authentication, product catalog, cart management, and REST API backend.',
    longDescription: 'A complete end-to-end MERN stack e-commerce web application. Built with React on the front-end, Node.js and Express on the backend, and MongoDB for database persistence with JWT authentication and Redux state management.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Redux', 'REST API'],
    demoUrl: 'https://ecommerce-frontend-pi-woad.vercel.app/',
    githubUrl: 'https://github.com/adithx2/ecommerce-frontend',
    features: [
      'JWT Authentication & Protected API Endpoints',
      'Product catalog with filtering and search',
      'Shopping cart & global state management with Redux',
      'RESTful backend architecture with Express & Mongoose',
    ],
    bgGradient: 'from-violet-600/30 to-cyan-600/30',
  },
  portfolio: {
    id: 'portfolio',
    title: 'Personal Developer Portfolio',
    category: 'Frontend & Animations',
    description: 'Modern, high-performance developer portfolio built with React, Tailwind CSS, Framer Motion, and React Router.',
    longDescription: 'An interactive portfolio designed to highlight MERN stack projects, technical skills, learning journey, and GitHub stats. Features custom code terminal animations, glassmorphism UI, React Router routing, and 3D hover interactions.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Lucide Icons'],
    demoUrl: '#',
    githubUrl: 'https://github.com/adithx2/Adith-personalportfolio',
    features: [
      'Interactive typing developer code terminal & live status dashboard',
      'React Router dynamic routes for projects and case studies',
      'Smooth Framer Motion scroll animations',
      'Dark cinematic developer aesthetic with glassmorphism',
    ],
    bgGradient: 'from-cyan-600/30 to-emerald-600/30',
  },
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-heading font-bold text-white mb-4">Project Not Found</h2>
        <p className="text-gray-400 mb-6">The requested project case study could not be found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-cyan-accent rounded-xl shadow-glow-cyan"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-dark-bg relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-accent hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio Home
          </Link>
        </motion.div>

        {/* Hero Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`glass-card p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-br ${project.bgGradient}`}
        >
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-accent bg-black/60 px-3.5 py-1.5 rounded-full border border-cyan-accent/30 backdrop-blur-md">
              {project.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
              {project.title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-cyan-accent rounded-xl hover:bg-cyan-300 transition-all shadow-glow-cyan"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white glass-card border border-white/15 rounded-xl hover:border-cyan-accent/50 transition-all"
                >
                  <Github className="w-4 h-4" /> GitHub Repository
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 glass-card p-8 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-accent" /> Overview & Architecture
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>

            <div className="space-y-3 pt-4">
              <h4 className="text-xs font-mono uppercase text-gray-400">Key Features Implemented</h4>
              <div className="space-y-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-200 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Check className="w-4 h-4 text-emerald-accent flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-accent" /> Tech Stack
              </h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Sparkles, Eye, ArrowRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

const projectsList = [
  {
    id: 'filmorax',
    title: 'FilmoraX — Movie Streaming Platform',
    category: 'Full Stack / React App',
    featured: true,
    description: 'A modern, responsive movie discovery and streaming web application featuring real-time movie listings, search filtering, and details.',
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
  {
    id: 'mern-ecommerce',
    title: 'MERN E-Commerce Platform',
    category: 'Full Stack (MERN)',
    featured: true,
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
  {
    id: 'portfolio',
    title: 'Personal Developer Portfolio',
    category: 'Frontend & Animations',
    featured: true,
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
  {
    id: 'phonebook',
    title: 'Phonebook Application',
    category: 'Learning Project',
    featured: false,
    description: 'Contact management application for creating, editing, and filtering personal phonebook contacts.',
    tags: ['React', 'JavaScript', 'REST API', 'CSS Modules'],
    githubUrl: 'https://github.com/adithx2',
    features: ['Contact search filter', 'CRUD operations', 'Local storage / state sync'],
    bgGradient: 'from-purple-600/20 to-pink-600/20',
  },
  {
    id: 'user-explorer',
    title: 'User Explorer App',
    category: 'Learning Project',
    featured: false,
    description: 'Interactive dashboard fetching and rendering user data profiles from external REST APIs.',
    tags: ['React', 'Axios', 'CSS3', 'REST API'],
    githubUrl: 'https://github.com/adithx2',
    features: ['Async API fetching', 'User profile detail cards', 'Loading states & error handling'],
    bgGradient: 'from-emerald-600/20 to-teal-600/20',
  },
  {
    id: 'inventory-mgmt',
    title: 'Inventory Management System',
    category: 'Learning Project',
    featured: false,
    description: 'Web tool for managing stock items, product categories, and inventory status tracking.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
    githubUrl: 'https://github.com/adithx2',
    features: ['MongoDB schema modeling', 'Express CRUD routing', 'Stock availability alerts'],
    bgGradient: 'from-blue-600/20 to-indigo-600/20',
  },
  {
    id: 'calculator',
    title: 'Interactive Calculator',
    category: 'Learning Project',
    featured: false,
    description: 'Clean scientific & standard calculator with keyboard support and smooth UI feedback.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'DOM Operations'],
    githubUrl: 'https://github.com/adithx2',
    features: ['Math evaluation engine', 'Responsive grid UI', 'Keyboard event listeners'],
    bgGradient: 'from-gray-600/20 to-cyan-600/20',
  },
  {
    id: 'grade-calc',
    title: 'Grade Calculator',
    category: 'Learning Project',
    featured: false,
    description: 'Academic grade & GPA computation utility with instant results and feedback score breakdown.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/adithx2',
    features: ['Percentage to grade mapping', 'Real-time calculation', 'Clean form UI'],
    bgGradient: 'from-orange-600/20 to-amber-600/20',
  },
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const filteredProjects = projectsList.filter((proj) => {
    if (filter === 'All') return true;
    if (filter === 'Featured') return proj.featured;
    if (filter === 'MERN Stack') return proj.tags.includes('MongoDB') || proj.tags.includes('React');
    if (filter === 'Learning') return !proj.featured;
    return true;
  });

  return (
    <section id="projects" className="py-24 relative bg-dark-bg">
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
            <Layers className="w-3.5 h-3.5" /> Featured Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Projects & <span className="text-gradient">Creations</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            A showcase of my full-stack MERN web applications, front-end web apps, and learning projects.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {['All', 'Featured', 'MERN Stack', 'Learning'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  filter === tab
                    ? 'bg-cyan-accent text-black font-bold shadow-glow-cyan'
                    : 'glass-card text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl border border-white/10 hover:border-cyan-accent/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-xl"
            >
              {/* Visual Banner Header */}
              <div className={`relative h-48 bg-gradient-to-br ${project.bgGradient} p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}>
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-accent bg-black/60 px-3 py-1 rounded-full border border-cyan-accent/30 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                <div className="z-10 space-y-1">
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-accent transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-80" />
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] font-mono text-cyan-accent bg-cyan-accent/10 px-2 py-1 rounded-md">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-accent hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </button>
                    {['filmorax', 'mern-ecommerce', 'portfolio'].includes(project.id) && (
                      <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-white"
                      >
                        Route <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                        title="GitHub Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-cyan-accent text-black hover:bg-cyan-300 transition-all shadow-glow-cyan"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Window */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;

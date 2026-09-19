import Project from '../models/Project.js';
import mongoose from 'mongoose';

const fallbackProjects = [
  {
    slug: 'filmorax',
    title: 'FilmoraX — Movie Streaming Platform',
    category: 'Full Stack / React App',
    featured: true,
    description: 'A modern, responsive movie discovery and streaming web application featuring real-time movie listings, search filtering, and details.',
    tags: ['React', 'TMDB API', 'React Router', 'Axios', 'Responsive UI'],
    demoUrl: 'https://moviestreamingplatform-lps9.vercel.app/',
    githubUrl: 'https://github.com/adithx2/Movie-streaming-platform',
  },
  {
    slug: 'mern-ecommerce',
    title: 'MERN E-Commerce Platform',
    category: 'Full Stack (MERN)',
    featured: true,
    description: 'Full-stack online shopping platform with user authentication, product catalog, cart management, and REST API backend.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Redux', 'REST API'],
    demoUrl: 'https://ecommerce-frontend-pi-woad.vercel.app/',
    githubUrl: 'https://github.com/adithx2/ecommerce-frontend',
  },
  {
    slug: 'portfolio',
    title: 'Personal Developer Portfolio',
    category: 'Frontend & Animations',
    featured: true,
    description: 'Modern, high-performance developer portfolio built with React, Tailwind CSS, and Framer Motion.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    demoUrl: '#',
    githubUrl: 'https://github.com/adithx2/Adith-personalportfolio',
  },
];

export const getProjects = async (req, res) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } else {
      return res.status(200).json({
        success: true,
        count: fallbackProjects.length,
        data: fallbackProjects,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

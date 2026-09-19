import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import { connectDB } from './config/db.js';

dotenv.config();

const initialProjects = [
  {
    slug: 'filmorax',
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
    slug: 'mern-ecommerce',
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
    slug: 'portfolio',
    title: 'Personal Developer Portfolio',
    category: 'Frontend & Animations',
    featured: true,
    description: 'Modern, high-performance developer portfolio built with React, Tailwind CSS, and Framer Motion.',
    longDescription: 'An interactive portfolio designed to highlight MERN stack projects, technical skills, learning journey, and GitHub stats. Features custom code terminal animations, glassmorphism UI, and 3D hover interactions.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    demoUrl: '#',
    githubUrl: 'https://github.com/adithx2/Adith-personalportfolio',
    features: [
      'Interactive typing developer code terminal & live status dashboard',
      'Smooth Framer Motion scroll animations',
      'Dark cinematic developer aesthetic with glassmorphism',
      'Accessible, SEO-ready, and mobile responsive',
    ],
    bgGradient: 'from-cyan-600/30 to-emerald-600/30',
  },
];

const initialSkills = [
  { category: 'Frontend', name: 'HTML5', iconClass: 'devicon-html5-plain colored', level: 'Advanced', desc: 'Semantic web structure' },
  { category: 'Frontend', name: 'CSS3', iconClass: 'devicon-css3-plain colored', level: 'Advanced', desc: 'Flexbox, Grid, Animations' },
  { category: 'Frontend', name: 'JavaScript', iconClass: 'devicon-javascript-plain colored', level: 'Advanced', desc: 'ES6+, Async/Await, DOM' },
  { category: 'Frontend', name: 'React.js', iconClass: 'devicon-react-original colored', level: 'Intermediate', desc: 'Hooks, State, React Router' },
  { category: 'Backend', name: 'Node.js', iconClass: 'devicon-nodejs-plain colored', level: 'Intermediate', desc: 'Asynchronous event runtime' },
  { category: 'Backend', name: 'Express.js', iconClass: 'devicon-express-original text-gray-200', level: 'Intermediate', desc: 'REST API routing & middleware' },
  { category: 'Database', name: 'MongoDB', iconClass: 'devicon-mongodb-plain colored', level: 'Intermediate', desc: 'NoSQL collections & queries' },
  { category: 'Database', name: 'Mongoose', iconClass: 'devicon-mongodb-plain text-green-400', level: 'Intermediate', desc: 'Schema modeling & validation' },
  { category: 'Tools', name: 'Git', iconClass: 'devicon-git-plain colored', level: 'Intermediate', desc: 'Version control' },
  { category: 'Tools', name: 'GitHub', iconClass: 'devicon-github-original text-white', level: 'Intermediate', desc: 'Repositories & collaboration' },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Skill.deleteMany({});

    await Project.insertMany(initialProjects);
    await Skill.insertMany(initialSkills);

    console.log('[Seed Success] Database seeded with projects and skills!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedDB();

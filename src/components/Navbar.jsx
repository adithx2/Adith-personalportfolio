import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Terminal, User, Cpu, Briefcase, GitCommit, Mail, Shield } from 'lucide-react';
import { isAuthenticated, getAdminUser } from '../utils/adminAuth';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  const isAdmin = isAuthenticated() && getAdminUser()?.role === 'admin';
  const adminTarget = isAdmin ? '/admin/enquiries' : '/admin/login';

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav py-3.5 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-2 text-xl sm:text-2xl font-heading font-extrabold tracking-tight"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-accent/20 to-violet-accent/20 border border-cyan-accent/40 flex items-center justify-center text-cyan-accent group-hover:scale-105 transition-transform duration-300">
            <Code2 className="w-5 h-5 text-cyan-accent" />
          </div>
          <span className="text-white">Adith</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-dark-card/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <Link
            to="/"
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
              location.pathname === '/' ? 'text-cyan-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            {location.pathname === '/' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-cyan-accent/10 border border-cyan-accent/30 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">Home</span>
          </Link>

          <Link
            to="/about"
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
              location.pathname === '/about' ? 'text-cyan-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            {location.pathname === '/about' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-cyan-accent/10 border border-cyan-accent/30 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">About</span>
          </Link>

          <Link
            to="/skills"
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
              location.pathname === '/skills' ? 'text-cyan-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            {location.pathname === '/skills' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-cyan-accent/10 border border-cyan-accent/30 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">Skills</span>
          </Link>

          <Link
            to="/projects"
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
              location.pathname === '/projects' ? 'text-cyan-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            {location.pathname === '/projects' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-cyan-accent/10 border border-cyan-accent/30 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">Projects</span>
          </Link>

          <Link
            to="/journey"
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
              location.pathname === '/journey' ? 'text-cyan-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            {location.pathname === '/journey' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-cyan-accent/10 border border-cyan-accent/30 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">Journey</span>
          </Link>

          <Link
            to="/contact"
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
              location.pathname === '/contact' ? 'text-cyan-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            {location.pathname === '/contact' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-cyan-accent/10 border border-cyan-accent/30 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">Contact</span>
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to={adminTarget}
            title={isAdmin ? "Admin Enquiries Hub" : "Admin Login"}
            className={`p-2 rounded-full border transition-all ${
              isAdmin
                ? "bg-cyan-accent/20 border-cyan-accent/50 text-cyan-accent shadow-glow-cyan"
                : "bg-white/5 border border-white/10 hover:border-cyan-accent/40 text-gray-400 hover:text-cyan-accent"
            }`}
          >
            <Shield className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-accent rounded-full hover:bg-cyan-300 transition-all duration-300 shadow-glow-cyan hover:scale-105"
          >
            Hire Me
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-xl bg-dark-card/80 border border-white/10 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-accent" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-card border-b border-white/10 px-4 pt-4 pb-6 mt-2 overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === '/'
                    ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Terminal className="w-5 h-5" />
                <span>Home</span>
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === '/about'
                    ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <User className="w-5 h-5" />
                <span>About</span>
              </Link>

              <Link
                to="/skills"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === '/skills'
                    ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Cpu className="w-5 h-5" />
                <span>Skills</span>
              </Link>

              <Link
                to="/projects"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === '/projects'
                    ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Projects</span>
              </Link>

              <Link
                to="/journey"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === '/journey'
                    ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <GitCommit className="w-5 h-5" />
                <span>Journey</span>
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === '/contact'
                    ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span>Contact</span>
              </Link>

              <Link
                to={adminTarget}
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 font-semibold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>{isAdmin ? 'Admin Enquiries' : 'Admin Login'}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
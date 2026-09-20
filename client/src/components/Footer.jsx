import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-dark-bg border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} <strong className="text-white">Build by Adith</strong>
          </span>
        </div>

        {/* Center: Admin Portal link */}
        <div className="flex items-center gap-4">
          <a
            href="/admin"
            className="text-xs font-mono text-gray-500 hover:text-cyan-accent transition-colors flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 hover:border-cyan-accent/30"
          >
            <span>Admin Portal</span>
          </a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl glass-card border border-white/10 text-gray-400 hover:text-cyan-accent hover:border-cyan-accent/40 transition-all flex items-center gap-2 text-xs font-mono"
          aria-label="Scroll to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

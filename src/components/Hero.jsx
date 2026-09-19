import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight , Github, Linkedin,  Mail ,Terminal, CheckCircle2, Flame , Link } from 'lucide-react';

const codeLines = [
  'const developer = "Adith";',
  'const location = "Kerala, India";',
  'const stack = ["MongoDB",  "Express.js", "React", "Node.js"];',
  'const status = "Building modern & scalable web apps...";',
];

const Hero = () => {
  const [typedText, setTypedText] = useState(['', '', '', '']);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [viewMode, setViewMode] = useState('terminal');

  useEffect(() => {
    if (currentLineIndex < codeLines.length) {
      const targetLine = codeLines[currentLineIndex];
      if (currentCharIndex < targetLine.length) {
        const timeout = setTimeout(() => {
          setTypedText((prev) => {
            const copy = [...prev];
            copy[currentLineIndex] = targetLine.substring(0, currentCharIndex + 1);
            return copy;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 35);
        return () => clearTimeout(timeout);
      } else {
        const linePause = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(linePause);
      }
    } else {
      setIsTypingComplete(true);
      const transitionTimer = setTimeout(() => {
        setViewMode('dashboard');
      }, 1500);
      return () => clearTimeout(transitionTimer);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-tech-grid overflow-hidden">
      {/* Soft Ambient Background Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-accent/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-accent/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Intro & Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-cyan-accent/30 text-cyan-accent text-xs sm:text-sm font-medium tracking-wide shadow-glow-cyan">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-accent"></span>
              </span>
              Available for Junior / Fresher Roles
            </div>

            {/* Main Greeting & Title */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl text-gray-300 font-heading font-medium">
                Hi, I'm <span className="text-cyan-accent font-bold">Adith</span>
              </h2>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white leading-none">
                <span className="text-gradient">MERN Stack</span> <br />
                Developer
              </h1>
            </div>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed font-sans">
              Building modern, responsive and scalable web applications with <span className="text-white font-medium">MongoDB</span>, <span className="text-white font-medium">Express.js</span>, <span className="text-white font-medium">React</span> and <span className="text-white font-medium">Node.js</span>. Passionate about clean code and exceptional user experiences.
            </p>

            {/* Action Buttons */}
            <div className=" a flex flex-wrap items-center gap-4 pt-2">
              <a
              href="/projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-black bg-cyan-accent rounded-xl hover:bg-cyan-300 transition-all duration-300 shadow-glow-cyan hover:scale-105"
              >

                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white glass-card hover:bg-white/10 border border-white/15 rounded-xl transition-all duration-300 hover:border-cyan-accent/50"
              >
                <Mail className="w-4 h-4 text-cyan-accent" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Icons & Quick Info */}
            <div className="flex items-center gap-6 pt-4 text-gray-400">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">Connect</span>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/adithx2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-dark-card/80 border border-white/10 text-gray-300 hover:text-cyan-accent hover:border-cyan-accent/40 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/adith-s-445182346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-dark-card/80 border border-white/10 text-gray-300 hover:text-cyan-accent hover:border-cyan-accent/40 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:adiths746@gmail.com"
                  className="p-2.5 rounded-lg bg-dark-card/80 border border-white/10 text-gray-300 hover:text-cyan-accent hover:border-cyan-accent/40 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Code Terminal / Developer Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Floating MERN Tech Floating Badges around terminal */}

            <div className="hidden sm:block absolute -bottom-6 -right-6 z-20 animate-float" style={{ animationDuration: '6s', animationDelay: '1s' }}>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl glass-card border border-emerald-accent/40 text-emerald-accent text-xs font-mono shadow-md">
                <i className="devicon-nodejs-plain colored text-base"></i>
                <span>Node.js</span>
              </div>
            </div>

            <div className="hidden sm:block absolute -top-6 -left-6 z-20 animate-float" style={{ animationDuration: '7s' }}>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl glass-card border border-cyan-accent/40 text-cyan-400 text-xs font-mono shadow-glow-cyan">
                <i className="devicon-react-original colored text-base"></i>
                <span>React.js</span>
              </div>
            </div>

            <div className="hidden sm:block absolute bottom-8 -left-8 z-20 animate-float" style={{ animationDuration: '8s'}}>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl glass-card border border-cyan-accent/40 text-cyan-400 text-xs font-mono shadow-glow-cyan">
                <i className="devicon-mongodb-plain colored text-base"></i>
                <span>Express</span>
              </div>
            </div>

            <div className="hidden sm:block absolute top-1/2 -right-8 z-20 animate-float" style={{ animationDuration: '9s', animationDelay: '2s' }}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-green-500/40 text-green-400 text-xs font-mono shadow-md">
                <i className="devicon-mongodb-plain colored text-base"></i>
                <span>MongoDB</span>
              </div>
            </div>

            {/* Terminal Window Box */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
              {/* Window Header */}
              <div className="bg-dark-card/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-code text-gray-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-accent" /> developer.js
                  </span>
                </div>

                {/* View Switcher Controls */}
                <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setViewMode('terminal')}
                    className={`px-2 py-0.5 rounded transition-all ${
                      viewMode === 'terminal' ? 'bg-cyan-accent/20 text-cyan-accent font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Code
                  </button>
                  <button
                    onClick={() => setViewMode('dashboard')}
                    className={`px-2 py-0.5 rounded transition-all ${
                      viewMode === 'dashboard' ? 'bg-cyan-accent/20 text-cyan-accent font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Dashboard
                  </button>
                </div>
              </div>

              {/* Window Body */}
              <div className="p-5 sm:p-6 min-h-[300px] flex flex-col justify-between font-code text-xs sm:text-sm">
                {viewMode === 'terminal' ? (
                  <div className="space-y-3">
                    <div className="text-gray-500 text-xs">// MERN Stack Developer Initialization</div>

                    {typedText.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-gray-600 select-none">{idx + 1}</span>
                        <div className="text-gray-200">
                          {line}
                          {idx === currentLineIndex && !isTypingComplete && (
                            <span className="inline-block w-2 h-4 ml-1 bg-cyan-accent cursor-blink align-middle" />
                          )}
                        </div>
                      </div>
                    ))}

                    {isTypingComplete && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pt-4 border-t border-white/10 text-emerald-accent flex items-center gap-2 text-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Profile ready. Switching to live dashboard...</span>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  /* Developer Live Dashboard View */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Developer Status</h4>
                        <p className="text-xs text-gray-400">Ready for full-time & contract roles</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-gray-400">Primary Stack</div>
                        <div className="text-sm font-semibold text-cyan-accent mt-1">MERN Stack</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">Mongo, Express, React, Node</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-gray-400">Location</div>
                        <div className="text-sm font-semibold text-white mt-1">Kerala, India</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">IST (UTC +5:30)</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-300 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-orange-400" /> Key Skills Mastery
                        </span>
                        <span className="text-cyan-accent">Frontend & Backend</span>
                      </div>
                      <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div className="bg-gradient-to-r from-cyan-accent to-violet-accent h-full rounded-full w-11/12" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                      <span>Git Status: <strong className="text-white font-mono">Clean</strong></span>
                      <span>Projects Built: <strong className="text-cyan-accent font-mono">5+</strong></span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Scroll Down</span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-accent shadow-glow-cyan"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

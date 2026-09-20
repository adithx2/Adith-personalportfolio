import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Send, Instagram, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.fire({
          title: 'Message Saved to Database!',
          text: 'Thank you for reaching out! Your message was stored in the MERN backend database.',
          icon: 'success',
          background: '#0c0e14',
          color: '#ffffff',
          confirmButtonColor: '#00f0ff',
          customClass: {
            popup: 'glass-card border border-cyan-accent/30 rounded-2xl',
          },
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Backend submission failed');
      }
    } catch (err) {
      console.warn('[Backend Offline - Fallback to Google Form Target Submission]', err);
      // Fallback submit to Google Form target
      const formEl = document.getElementById('google-contact-form');
      if (formEl) {
        formEl.submit();
      }

      Swal.fire({
        title: 'Message Sent!',
        text: 'Thank you for reaching out, Adith will respond to you shortly.',
        icon: 'success',
        background: '#0c0e14',
        color: '#ffffff',
        confirmButtonColor: '#00f0ff',
        customClass: {
          popup: 'glass-card border border-cyan-accent/30 rounded-2xl',
        },
      });
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-dark-bg/95 bg-tech-grid">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-cyan-accent text-xs font-mono">
            <Mail className="w-3.5 h-3.5" /> Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Let's Build <span className="text-gradient">Something Together</span>.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            I'm currently looking for Junior / Fresher MERN Stack Developer opportunities. Whether you have a job offer, project inquiry, or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-accent" /> Contact Details
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Feel free to email me directly or connect through social media profiles.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Item */}
                <a
                  href="mailto:adiths746@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-accent/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center text-cyan-accent group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase">Email Address</div>
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-accent transition-colors">

                      adiths746@gmail.com
                    </div>
                  </div>
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-violet-accent/10 border border-violet-accent/20 flex items-center justify-center text-violet-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase">Location</div>
                    <div className="text-sm font-semibold text-white">Kerala, India</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">Social Links</div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/adithx2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-bg border border-white/10 text-gray-300 hover:text-cyan-accent hover:border-cyan-accent/40 transition-all text-xs font-medium"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adith-s-445182346"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-bg border border-white/10 text-gray-300 hover:text-cyan-accent hover:border-cyan-accent/40 transition-all text-xs font-medium"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/_.adhihh?igsh=MWMwNmJva2c4Ymtraw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-dark-bg border border-white/10 text-gray-300 hover:text-pink-400 hover:border-pink-400/40 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Node.js API Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <iframe name="hidden_iframe" id="hidden_iframe" className="hidden" />

            {/* Hidden fallback HTML form for Google Forms */}
            <form
              id="google-contact-form"
              action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSesAcuboIfUOGxv6vZrUBNPYazEGnPGnRqlAwvk997kMfOvHA/formResponse"
              method="POST"
              target="hidden_iframe"
              className="hidden"
            >
              <input type="text" name="entry.1529089168" value={formData.name} readOnly />
              <input type="email" name="entry.1467842293" value={formData.email} readOnly />
              <textarea name="entry.1504416252" value={formData.message} readOnly />
            </form>

            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-heading font-bold text-white">Send a Message</h3>
                <span className="text-[10px] font-mono text-cyan-accent bg-cyan-accent/10 px-2.5 py-0.5 rounded border border-cyan-accent/20">
                  Node.js API Connected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300">Your Full Name </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300">Your Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300">Your Message</label>
                <textarea
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi, I would like to discuss a MERN developer role..."
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 text-sm font-semibold text-black bg-cyan-accent hover:bg-cyan-300 rounded-xl transition-all shadow-glow-cyan hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Saving to Database...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

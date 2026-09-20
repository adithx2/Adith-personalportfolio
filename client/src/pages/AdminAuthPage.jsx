import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import {
  API_BASE,
  setToken,
  setAdminUser,
  isAuthenticated
} from '../utils/adminAuth';

const AdminAuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin/enquiries', { replace: true });
    }
  }, [navigate]);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminSecretKey: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToken(data.token);
        setAdminUser(data.admin);

        Swal.fire({
          title: 'Access Granted',
          text: `Welcome back, ${data.admin.name}!`,
          icon: 'success',
          background: '#0c0e14',
          color: '#ffffff',
          confirmButtonColor: '#00f0ff',
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: 'glass-card border border-cyan-accent/30 rounded-2xl',
          },
        });

        navigate('/admin/enquiries');
      } else {
        setErrorMessage(data.error || 'Failed to authenticate. Please check your credentials.');
      }
    } catch (err) {
      setErrorMessage('Could not connect to backend server. Make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (registerData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (!registerData.adminSecretKey.trim()) {
      setErrorMessage('Admin Security Passkey is required to create an admin account.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          adminSecretKey: registerData.adminSecretKey.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToken(data.token);
        setAdminUser(data.admin);

        Swal.fire({
          title: 'Admin Account Created!',
          text: 'You have been automatically authenticated into the Client Enquiries Dashboard.',
          icon: 'success',
          background: '#0c0e14',
          color: '#ffffff',
          confirmButtonColor: '#00f0ff',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'glass-card border border-cyan-accent/30 rounded-2xl',
          },
        });

        navigate('/admin/enquiries');
      } else {
        setErrorMessage(data.error || 'Failed to create admin account.');
      }
    } catch (err) {
      setErrorMessage('Could not connect to backend server. Make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden bg-tech-grid">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-violet-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Portfolio Link */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyan-accent transition-colors px-4 py-2 rounded-full glass-card border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
        </Link>
      </motion.div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-card rounded-3xl border border-white/10 p-8 sm:p-10 shadow-2xl relative z-10"
      >
        {/* Header Icon & Title */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-accent/20 to-violet-accent/20 border border-cyan-accent/40 flex items-center justify-center mx-auto text-cyan-accent shadow-glow-cyan">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            Admin <span className="text-gradient">Portal</span>
          </h1>
          <p className="text-xs text-gray-400">
            Sign in or create your admin account to manage client enquiries.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-dark-bg/80 p-1.5 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'login'
                ? 'bg-cyan-accent text-black shadow-glow-cyan'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Login
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'register'
                ? 'bg-cyan-accent text-black shadow-glow-cyan'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Create Account
          </button>
        </div>

        {/* Error Notification */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-red-400 text-xs"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forms */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-accent" /> Admin Email
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="your@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-accent" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-black bg-cyan-accent hover:bg-cyan-300 rounded-xl transition-all shadow-glow-cyan disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-accent" /> Full Name
              </label>
              <input
                type="text"
                required
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-accent" /> Admin Email
              </label>
              <input
                type="email"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                placeholder="your@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-accent" /> Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent" /> Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" /> Admin Security Passkey
                </label>
                <span className="text-[10px] text-gray-500 font-mono">Owner only</span>
              </div>
              <input
                type="password"
                required
                value={registerData.adminSecretKey}
                onChange={(e) => setRegisterData({ ...registerData, adminSecretKey: e.target.value })}
                placeholder="Enter secret passkey to authorize account"
                className="w-full px-4 py-3 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
              />
              <p className="text-[10px] text-gray-500 font-mono">
                Prevents regular visitors from creating admin accounts.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-black bg-cyan-accent hover:bg-cyan-300 rounded-xl transition-all shadow-glow-cyan disabled:opacity-50"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Admin Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AdminAuthPage;

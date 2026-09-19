import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  Mail,
  CheckCircle,
  Archive,
  Trash2,
  Reply,
  RefreshCw,
  LogOut,
  Search,
  Filter,
  Calendar,
  User,
  Shield,
  Clock,
  ExternalLink,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import Swal from 'sweetalert2';
import {
  authFetch,
  getAdminUser,
  clearAdminAuth,
  API_BASE
} from '../utils/adminAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = getAdminUser();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, archived: 0 });
  const [storageType, setStorageType] = useState('MongoDB');

  // Filters
  const [statusFilter, setStatusFilter] = useState('all'); // all, unread, read, archived
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStats = useCallback(async () => {
    try {
      const res = await authFetch('/contact/stats');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  const fetchMessages = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await authFetch(`/contact?${params.toString()}`);

      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMessages(data.data || []);
          if (data.storage) setStorageType(data.storage);
        }
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter, searchQuery, navigate]);

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [fetchMessages, fetchStats]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await authFetch(`/contact/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update local list
        setMessages((prev) =>
          prev.map((msg) =>
            (msg._id === id || msg.id === id) ? { ...msg, status: newStatus } : msg
          )
        );
        fetchStats();

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Status set to ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
          background: '#0c0e14',
          color: '#ffffff',
        });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteMessage = async (id, clientName) => {
    const result = await Swal.fire({
      title: 'Delete Enquiry?',
      text: `Are you sure you want to delete message from ${clientName}? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Yes, Delete',
      background: '#0c0e14',
      color: '#ffffff',
      customClass: {
        popup: 'glass-card border border-white/10 rounded-2xl',
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await authFetch(`/contact/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setMessages((prev) => prev.filter((msg) => (msg._id !== id && msg.id !== id)));
          fetchStats();

          Swal.fire({
            title: 'Deleted!',
            text: 'Enquiry has been removed.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: '#0c0e14',
            color: '#ffffff',
          });
        }
      } catch (err) {
        console.error('Failed to delete enquiry:', err);
      }
    }
  };

  const handleLogout = () => {
    clearAdminAuth();
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out of the admin panel.',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false,
      background: '#0c0e14',
      color: '#ffffff',
    });
    navigate('/admin/login');
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative bg-tech-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Top Navbar / Header */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent shadow-glow-cyan">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  Client <span className="text-gradient">Enquiries Hub</span>
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/30">
                  Admin
                </span>
              </div>
             
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Portfolio
            </Link>

            <button
              onClick={() => {
                fetchMessages(true);
                fetchStats();
              }}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-cyan-accent bg-cyan-accent/10 hover:bg-cyan-accent/20 border border-cyan-accent/30 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-heading">{stats.total}</div>
              <div className="text-xs font-mono text-gray-400 uppercase">Total Enquiries</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-heading">{stats.unread}</div>
              <div className="text-xs font-mono text-gray-400 uppercase">Unread Messages</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-heading">{stats.read}</div>
              <div className="text-xs font-mono text-gray-400 uppercase">Read / Handled</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-accent/10 border border-violet-accent/30 flex items-center justify-center text-violet-accent">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-heading">{stats.archived}</div>
              <div className="text-xs font-mono text-gray-400 uppercase">Archived</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-bg/80 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-dark-bg/80 p-1.5 rounded-xl border border-white/10 w-full md:w-auto overflow-x-auto">
            {['all', 'unread', 'read', 'archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap ${
                  statusFilter === tab
                    ? 'bg-cyan-accent text-black font-semibold shadow-glow-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-2">
            <span>SHOWING {messages.length} CLIENT ENQUIRIES</span>
            <span>FILTER: {statusFilter.toUpperCase()}</span>
          </div>

          {loading ? (
            <div className="glass-card p-12 rounded-3xl border border-white/10 text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-cyan-accent animate-spin mx-auto" />
              <p className="text-sm text-gray-400 font-mono">Loading client enquiries...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl border border-white/10 text-center space-y-4">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-lg font-heading font-bold text-white">No Enquiries Found</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                {searchQuery
                  ? `No enquiries matched your search "${searchQuery}".`
                  : `There are currently no enquiries in the "${statusFilter}" category.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((item) => {
                  const id = item._id || item.id;
                  const isUnread = item.status === 'unread';

                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className={`glass-card p-6 sm:p-7 rounded-2xl border transition-all ${
                        isUnread
                          ? 'border-cyan-accent/40 shadow-glow-cyan/20 bg-dark-card/90'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        {/* Client Info Header */}
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-accent/20 to-violet-accent/20 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent font-bold text-sm">
                              {item.name ? item.name.charAt(0).toUpperCase() : 'C'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-base font-heading font-bold text-white">
                                  {item.name}
                                </h4>
                                {/* Status badge */}
                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${
                                    item.status === 'unread'
                                      ? 'bg-cyan-accent/15 text-cyan-accent border-cyan-accent/30'
                                      : item.status === 'read'
                                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                      : 'bg-gray-500/15 text-gray-400 border-gray-500/30'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </div>
                              <a
                                href={`mailto:${item.email}`}
                                className="text-xs text-cyan-accent hover:underline flex items-center gap-1 mt-0.5"
                              >
                                <Mail className="w-3 h-3" /> {item.email}
                              </a>
                            </div>
                          </div>

                          {/* Message Body */}
                          <div className="p-4 rounded-xl bg-dark-bg/60 border border-white/5 text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                            {item.message}
                          </div>

                          {/* Meta: Timestamp & IP */}
                          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-500" />
                              {formatDate(item.createdAt)}
                            </span>
                            {item.ipAddress && (
                              <span className="flex items-center gap-1 text-gray-500">
                                IP: {item.ipAddress}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap lg:flex-col items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 shrink-0">
                          {/* Reply via email */}
                          <a
                            href={`mailto:${item.email}?subject=Re: Your enquiry on Adith's Developer Portfolio&body=Hi ${encodeURIComponent(item.name)},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A`}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-accent hover:bg-cyan-300 transition-all shadow-glow-cyan"
                          >
                            <Reply className="w-3.5 h-3.5" />
                            <span>Reply Email</span>
                          </a>

                          {/* Mark Read / Unread toggle */}
                          {item.status !== 'read' ? (
                            <button
                              onClick={() => handleStatusChange(id, 'read')}
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Mark Read</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(id, 'unread')}
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>Mark Unread</span>
                            </button>
                          )}

                          {/* Archive toggle */}
                          {item.status !== 'archived' && (
                            <button
                              onClick={() => handleStatusChange(id, 'archived')}
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                            >
                              <Archive className="w-3.5 h-3.5" />
                              <span>Archive</span>
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteMessage(id, item.name)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

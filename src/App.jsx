import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParticleCanvas from './components/ParticleCanvas';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Home from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Contact from './components/Contact'
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminAuthPage from './pages/AdminAuthPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-bg text-gray-100 relative font-sans selection:bg-cyan-accent selection:text-black">
        {/* Interactive Particle Mesh Canvas */}
        <ParticleCanvas />

        {/* Navigation Header */}
        <Navbar />

        {/* Routes */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminAuthPage />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/enquiries"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

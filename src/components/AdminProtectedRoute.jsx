import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getAdminUser } from '../utils/adminAuth';

const AdminProtectedRoute = ({ children }) => {
  const admin = getAdminUser();

  // If user is not authenticated or does not have the 'admin' role, directly navigate to home page ('/')
  if (!isAuthenticated() || !admin || admin.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;

// admin/protectedroute.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    // Additional check in case token is invalid
    if (user && token && !localStorage.getItem('token')) {
      window.location.reload();
    }
  }, [user, token]);

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
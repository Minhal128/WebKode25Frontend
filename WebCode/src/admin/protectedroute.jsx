import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, requiresSubscription } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (requiresSubscription && user.role !== 'admin') {
    return <Navigate to="/pricing" replace />;
  }

  return children;
};

export default ProtectedRoute;
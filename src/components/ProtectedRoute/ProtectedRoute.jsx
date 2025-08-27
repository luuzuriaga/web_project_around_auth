import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, component: Component, ...props }) => {
  return loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
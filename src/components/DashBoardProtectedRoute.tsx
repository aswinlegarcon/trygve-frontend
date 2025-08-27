import React from 'react';
import { Navigate } from 'react-router-dom';
import { JWTService } from '../services/JWTService';

interface AuthProtectedRouteProps {
  children: React.ReactNode;
}

const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({ children }) => {
  // Check if user is authenticated
  if (!JWTService.isAuthenticated()) {
    console.log('Access denied: No valid authentication token');
    return <Navigate to="/home" replace />;
  }

  // Check if token is expired
  if (JWTService.isTokenExpired()) {
    console.log('Access denied: Token expired');
    JWTService.clearAuth();
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default AuthProtectedRoute;
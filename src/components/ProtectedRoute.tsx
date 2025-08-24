import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOtp } from '../contexts/OTPContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePhone?: boolean;
  requireVerified?: boolean;
  requireRegistrationCompleted?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requirePhone = false,
  requireVerified = false,
  requireRegistrationCompleted = false,
  redirectTo = '/signup'
}) => {
  const { phone, verified, registrationCompleted } = useOtp();

  // Check if phone is required and missing
  if (requirePhone && !phone) {
    console.log('Access denied: Phone number required');
    return <Navigate to={redirectTo} replace />;
  }

  // Check if verification is required and missing
  if (requireVerified && !verified) {
    console.log('Access denied: OTP verification required');
    return <Navigate to="/signup" replace />;
  }

  // Check if registration completion is required and missing
  if (requireRegistrationCompleted && !registrationCompleted) {
    console.log('Access denied: Registration completion required');
    return <Navigate to="/signup" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
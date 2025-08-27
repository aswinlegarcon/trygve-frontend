import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OtpProvider } from "./contexts/OTPContext";
import './App.css';
import OnboardingPage from "./pages/OnboardingPage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SignupOTP from "./pages/SignupOTP";
import RegisterForm from "./pages/RegisterForm";
import RegisterFinalPage from "./pages/RegisterFinalPage";
import Login from "./pages/Login";
import LoginOTP from "./pages/LoginOTP";
import LoginFinalPage from "./pages/LoginFinalPage";
import Dashboard from "./pages/DashBoard";
import DashBoardProtectedRoute from "./components/DashBoardProtectedRoute";

function App() {
  return (
    <OtpProvider>
      <Router>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<SignupOTP />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/register-success" element={<RegisterFinalPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-otp" element={<LoginOTP />} />
          <Route path="/login-success" element={<LoginFinalPage />} />
          
          {/* Protected Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={
              <DashBoardProtectedRoute>
                <Dashboard />
              </DashBoardProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </OtpProvider>
  );
}

export default App;
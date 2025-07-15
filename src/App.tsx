import React from 'react';  
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import OnboardingPage from './pages/OnboardingPage';
import Home from './pages/Home';
import Signup from './pages/Signup';
import SignupOTP from './pages/SignupOTP';
import RegisterForm from './pages/RegisterForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<OnboardingPage />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<SignupOTP />} />
        <Route path ="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
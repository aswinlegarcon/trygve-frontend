import React from 'react';  
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import OnboardingPage from './pages/OnboardingPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<OnboardingPage />} />
        <Route path="/home" element = {<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
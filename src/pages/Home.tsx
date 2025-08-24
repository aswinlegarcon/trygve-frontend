import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear all localStorage items when Home page loads
        localStorage.clear();
        console.log("All localStorage items cleared");
    }, []);

    return (
        <div className="home-bg">
            <div className="home-logo-bg" />
            <div className="home-content">
                <h2 className="home-welcome">Welcome to</h2>
                <h1 className="home-title">trygve</h1>
                <p className="home-subtitle">
                "Your trusted partner for personalized healthcare, right at your doorstep."
                </p>
                <button className="home-btn primary" onClick={() => navigate('/signup')}>Sign up</button>
                <button className="home-btn secondary" onClick={() => navigate('/login')}>Log in</button>
            </div>
        </div>
    )
};

export default Home;
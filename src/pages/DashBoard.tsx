import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JWTService, type UserData } from '../services/JWTService';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [sessionTime, setSessionTime] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication on component mount
        checkAuthentication();
        
        // Set up interval to check token expiry and update session time
        const interval = setInterval(() => {
            if (JWTService.isTokenExpired()) {
                handleLogout();
            } else {
                // Update session time every minute
                setSessionTime(JWTService.getFormattedTimeUntilExpiry());
            }
        }, 60000); // Check every minute

        // Initial session time update
        setSessionTime(JWTService.getFormattedTimeUntilExpiry());

        return () => clearInterval(interval);
    }, []);

    const checkAuthentication = () => {
        try {
            if (!JWTService.isAuthenticated()) {
                console.log('User not authenticated, redirecting to home');
                navigate('/home');
                return;
            }

            const user = JWTService.getUserData();
            if (user) {
                setUserData(user);
                setSessionTime(JWTService.getFormattedTimeUntilExpiry());
                console.log('User authenticated:', user.email);
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
            navigate('/home');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        try {
            JWTService.clearAuth();
            alert('You have been logged out successfully.');
            navigate('/home');
        } catch (error) {
            console.error('Logout error:', error);
            // Force redirect even if there's an error
            localStorage.clear();
            navigate('/home');
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading Dashboard...</p>
            </div>
        );
    }

    if (!userData) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="dashboard-bg">
            <div className="dashboard-header">
                <div className="dashboard-logo">
                    <h1 className="dashboard-brand">trygve</h1>
                </div>
                <button className="dashboard-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-welcome">
                    <h2 className="dashboard-title">Welcome back!</h2>
                    <p className="dashboard-subtitle">Here's your healthcare dashboard</p>
                </div>

                <div className="dashboard-user-info">
                    <div className="user-info-card">
                        <h3>Profile Information</h3>
                        <div className="info-row">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{userData.email.split('@')[0]}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{userData.email}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Phone:</span>
                            <span className="info-value">{userData.phoneNumber}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">User ID:</span>
                            <span className="info-value">#{userData.userId}</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <div className="card-icon">🏥</div>
                        <h3>Book Appointment</h3>
                        <p>Schedule a consultation with our trusted doctors</p>
                        <button className="card-btn">Book Now</button>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">💊</div>
                        <h3>My Prescriptions</h3>
                        <p>View and manage your medical prescriptions</p>
                        <button className="card-btn">View All</button>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">📋</div>
                        <h3>Health Records</h3>
                        <p>Access your complete medical history</p>
                        <button className="card-btn">View Records</button>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">🚑</div>
                        <h3>Emergency Care</h3>
                        <p>24/7 emergency medical assistance</p>
                        <button className="card-btn emergency">Call Now</button>
                    </div>
                </div>

                <div className="dashboard-session-info">
                    <p>Session expires in: <strong>{sessionTime}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
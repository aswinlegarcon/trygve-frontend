import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmailRegistration, checkPhoneRegistration, validateLoginCredentials } from "../services/AuthServiceApi";
import { useOtp } from "../contexts/OTPContext";
import "../styles/Login.css";
import { sendOtp } from "../firebase/config";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const { setPhone: setCtxPhone, setConfirmationResult } = useOtp();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!email.trim() || !phone.trim()) {
            alert("Please fill in both email and phone number.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        setLoading(true);

        try {
            // Step 1: Check if email is registered
            console.log("Checking email registration...");
            const emailCheck = await checkEmailRegistration(email.trim());
            
            if (!emailCheck.isRegistered) {
                alert("Email not registered. Please create an account first.");
                setLoading(false);
                return;
            }

            // Step 2: Check if phone number is registered
            const fullPhone = `+91${phone.trim()}`;
            console.log("Checking phone registration...");
            const phoneCheck = await checkPhoneRegistration(fullPhone);
            
            if (!phoneCheck.isRegistered) {
                alert("Phone number not registered. Please create an account first.");
                setLoading(false);
                return;
            }

            // Step 3: Validate that email and phone belong to the same user
            console.log("Validating login credentials...");
            const credentialsCheck = await validateLoginCredentials(email.trim(), fullPhone);
            
            if (!credentialsCheck.belongsToSameUser) {
                alert("Email and phone number don't match our records. Please check your details.");
                setLoading(false);
                return;
            }
            // Store phone in context for OTP verification
            console.log("Login validation successful, redirecting to OTP...");
            const confirmation = await sendOtp(fullPhone);
            setCtxPhone(fullPhone);
            setConfirmationResult(confirmation);
            navigate("/login-otp");

        } catch (error: any) {
            console.error("Login validation error:", error);
            
            if (error.message.includes('network') || error.message.includes('fetch')) {
                alert("Network error. Please check your connection and try again.");
            } else {
                alert(error.message || "Login validation failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-bg">
            <div className="login-logo-bg"></div>
            <div className="login-content">
                <img src="/assets/login-pic.png" alt="Login" className="login-img" />
                <h1 className="login-title">OTP Verification</h1>
                <p className="login-desc">Enter email and phone number to send one time Password</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-input-row">
                        <label className="login-label">Email id</label>
                        <div className="login-input-icon-row">
                            <input 
                                type="email"
                                className="login-input"
                                placeholder="Email id"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                disabled={loading}
                            />
                            <span className="login-edit-icon">
                                <i className="fas fa-edit"></i>
                            </span>
                        </div>
                    </div>
                    <div className="login-input-row">
                        <label className="login-label">Phone Number</label>
                        <input 
                            type="tel" 
                            className="login-input"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required 
                            disabled={loading}
                            maxLength={10}
                        />
                    </div>
                    
                    {/* Add this div for reCAPTCHA */}
                    <div id="recaptcha-container"></div>
                    
                    <button 
                        type="submit" 
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Validating..." : "Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

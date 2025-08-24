import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyFirebaseToken, checkUserRegistration, registerUser } from '../services/AuthServiceApi';
import { useOtp } from '../contexts/OTPContext';
import ProtectedRoute from '../components/ProtectedRoute';
import '../styles/RegisterForm.css';

const RegisterForm: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        location: "",
        secondaryPhoneNumber: ""
    });
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setRegistrationCompleted } = useOtp();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form fields
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        if (form.secondaryPhoneNumber.length !== 10 || !/^\d+$/.test(form.secondaryPhoneNumber)) {
            alert("Please enter a valid secondary phone number.");
            return;
        }
        
        const locationRegex = /^[a-zA-Z\s]+$/;
        if (form.location.trim() === "" || !locationRegex.test(form.location.trim())) {
            alert("Please enter a valid location (letters and spaces only).");
            return;
        }

        setLoading(true);
        
        try {
            // Step 1: Verify Firebase token with backend
            console.log("Verifying Firebase token...");
            await verifyFirebaseToken();
            console.log("Firebase token verified successfully");
            
            // Step 2: Check if user is already registered
            const phone = localStorage.getItem("user_phone") || "";
            if (!phone) {
                alert("Phone number not found. Please restart the registration process.");
                navigate('/signup');
                return;
            }
            
            console.log("Checking user registration status...");
            const registrationStatus = await checkUserRegistration(phone);
            console.log("Registration status:", registrationStatus);
            
            // Step 3: Register/Update user details
            const userDetails = { ...form, primaryPhoneNumber: phone };
            console.log("Registering user details...");
            const result = await registerUser(userDetails);
            console.log("Backend response:", result);

            if (result.status) {
                // Store user details locally (optional)
                localStorage.setItem("user_details", JSON.stringify(userDetails));
                
                // Set registration as completed
                setRegistrationCompleted(true);
                
                // Clear form
                setForm({
                    name: "",
                    email: "",
                    location: "",
                    secondaryPhoneNumber: ""
                });
                
                alert("Registration successful!");
                navigate("/register-success");
            } else {
                alert(result.message || "Registration failed. Please try again.");
            }
            
        } catch (error: any) {
            console.error("Registration error:", error);
            
            // Handle specific error cases
            if (error.message.includes('authentication')) {
                alert("Authentication failed. Please login again.");
                navigate('/signup');
            } else if (error.message.includes('network')) {
                alert("Network error. Please check your connection and try again.");
            } else {
                alert(error.message || "Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute requirePhone={true} requireVerified={true} redirectTo="/signup">
            <div className="register-bg">
                <div className="register-content">
                    <button className="register-back" onClick={() => navigate(-1)}>&lt;</button>
                    <h1 className="register-title">Almost Done!</h1>
                    <p className="register-desc">
                        Please enter your details in the following section.
                    </p>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            name="name"
                            className="register-input"
                            placeholder="Enter Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                        <input 
                            type="email"
                            name="email"
                            className="register-input"
                            placeholder="Enter Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        
                        <div className="register-location-row">
                            <input 
                                type="text"
                                name="location"
                                className="register-input"
                                placeholder="Enter Location"
                                value={form.location}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            <span className="register-location-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </span>
                        </div>
                        
                        <input 
                            type="tel"
                            name="secondaryPhoneNumber"
                            className="register-input"
                            placeholder="Enter Secondary Phone Number"
                            value={form.secondaryPhoneNumber}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                        <button 
                            type="submit" 
                            className="register-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>
                    <div className="register-logo-bg"></div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default RegisterForm;
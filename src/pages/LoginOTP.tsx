import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpVerification from "../components/OtpVerification";
import { useOtp } from "../contexts/OTPContext";
import { loginWithOTP } from "../services/AuthServiceApi";
import { JWTService } from "../services/JWTService";
import ProtectedRoute from "../components/ProtectedRoute";

function LoginOTP() {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const { phone , setRegistrationCompleted} = useOtp();


    // Method to handle login after OTP verification
    const handleLoginAfterOTP = async (otp: string, firebaseToken: string, user: any) => {
        setProcessing(true);
        try {
            console.log("OTP verified, processing login...");
            
            // Call backend login endpoint with phone number and Firebase token
            console.log("Logging in with backend using phone:", phone);
            const loginResponse = await loginWithOTP(phone,firebaseToken);
            
            // Store JWT token and user data in localStorage
            JWTService.setAuthData({
                token: loginResponse.token,
                tokenType: loginResponse.tokenType,
                userId: loginResponse.userId,
                email: loginResponse.email,
                phoneNumber: loginResponse.phoneNumber
            }, 24); // 24 hours expiration

            console.log("Login successful:", loginResponse);
            alert(`Login successful! Welcome back, ${loginResponse.email}`);
            
            // Clean up temporary data
            localStorage.removeItem("login_email");
            localStorage.removeItem("login_phone");
            setRegistrationCompleted(true);
            // Navigate to success page
            navigate("/login-success");
            
        } catch (error: any) {
            console.error("Login error:", error);
            
            // Handle different types of errors
            if (error.message.includes('network')) {
                alert("Network error. Please check your connection and try again.");
            } else if (error.message.includes('unauthorized') || error.message.includes('authentication')) {
                alert("Authentication failed. Please try logging in again.");
                navigate("/login");
            } else {
                alert("Login failed. Please try again or contact support.");
            }
        } finally {
            setProcessing(false);
        }
    };

    // Method to handle OTP resend
    const handleResendOTP = () => {
        alert("Please request a new OTP from the login page.");
        navigate("/login");
    };

    return (
        <ProtectedRoute requirePhone={true} redirectTo="/login">
            <OtpVerification
                title="Verification Code"
                subtitle="We have sent a verification code to your registered mobile number."
                buttonText={processing ? "Processing..." : "Continue"}
                onVerify={handleLoginAfterOTP}
                onResend={handleResendOTP}
                onBack={() => navigate(-1)}
            />
        </ProtectedRoute>
    );
}

export default LoginOTP;
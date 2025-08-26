import React, {useState, useEffect} from "react";
import "../components/OtpVerification.css";
import { useOtp } from "../contexts/OTPContext";
import { useNavigate } from "react-router-dom";

interface OtpVerificationProps{
    title : string;
    subtitle : string;
    buttonText : string;
    onVerify: (otp: string, firebaseToken: string, user: any) => void;
    onResend?: () => void;
    onBack?: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
    title,
    subtitle,
    buttonText,
    onVerify,
    onResend,   
    onBack
}) => {
    const [otp,setOtp] = useState(Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const { confirmationResult, setVerified } = useOtp();
    const navigate = useNavigate();

    const handleChange = (value : string, index: number) => {
        if(/^\d?$/.test(value)){
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if(value && index<5){
                const next = document.getElementById(`otp-input-${index+1}`);
                next && (next as HTMLInputElement).focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key==="Backspace")
        {
            if(otp[index]==="" && index>0)
            {
                const prev = document.getElementById(`otp-input-${index-1}`);
                prev && (prev as HTMLInputElement).focus();
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.some(digit => digit === "")) {
            alert("Please fill all the OTP fields");
            return;
        }
        setLoading(true);
        try {
            // Verify OTP with Firebase
            const userCredential = await confirmationResult.confirm(otp.join(""));
            const user = userCredential.user;
            
            // Get the Firebase JWT token and store it
            const firebaseToken = await user.getIdToken();
            localStorage.setItem("firebase_jwt", firebaseToken);

            setVerified(true);
            alert("OTP Verified Successfully!");
            
            // Call the onVerify method with OTP, Firebase token, and user data
            await onVerify(otp.join(""), firebaseToken, user);
            
        } catch (err) {
            console.error("OTP Verification Error:", err);
            alert("Invalid OTP. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="otp-bg">
            <div className="otp-content">
                <button className="otp-back" onClick={onBack}>&lt;</button>
                <h1 className="otp-title">{title}</h1>
                <p className="otp-desc">{subtitle}</p>
                <form className="otp-form" onSubmit={handleSubmit}>
                    <div className="otp-input-row">
                        {otp.map((digit,index) => (
                            <input 
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="otp-input"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            autoFocus={index === 0}
                            />
                        ))}
                    </div>
                    <div className="otp-resend">
                        Didn't receive the code?{" "}
                        <span className="otp-resend-link" onClick={onResend}>Resend</span>
                    </div>
                    <button type="submit" className="otp-btn" disabled={loading}>
                      {loading ? "Verifying..." : buttonText}
                    </button>
                </form>
                <div className="otp-logo-bg"></div>
            </div>
        </div>
    );
};

export default OtpVerification;
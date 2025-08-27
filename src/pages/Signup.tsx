import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, sendOtp } from "../firebase/config";
import { useOtp } from "../contexts/OTPContext";
import "../styles/Signup.css";
import { checkPhoneRegistration } from "../services/AuthServiceApi";

// Extend the Window interface to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: any;
  }
}

const Signup: React.FC = () => {
  const [countryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPhone: setCtxPhone, setConfirmationResult } = useOtp();
  const navigate = useNavigate();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }
    setLoading(true);
    try {
      const fullPhone = `${countryCode}${phone}`;
      const userExist = await checkPhoneRegistration(fullPhone);
      if (userExist.isRegistered) {
        alert("User already exists.");
        setLoading(false);
        return;
      }
      const confirmation = await sendOtp(fullPhone);
      setCtxPhone(fullPhone);
      setConfirmationResult(confirmation);
      navigate("/otp");
    } catch (err) {
      console.error("Firebase OTP Error:", err);
      alert("Failed to send OTP. Please ensure you are using a test number if in development.");
    }
    setLoading(false);
  };

  return (
    <div className="signup-bg">
      <div className="signup-content">
        <button className="signup-back" onClick={() => navigate(-1)}>&lt;</button>
        <h1 className="signup-title">Can you input your number?</h1>
        <p className="signup-desc">
          You will be sent a code on this number to verify if you are the owner of the number.
        </p>
        <form className="signup-form" onSubmit={handleSendCode}>
          <div className="signup-input-row">
            <div className="signup-country">
              <img src="/assets/india.png" alt="India" className="signup-flag" />
              <span className="signup-code">{countryCode}</span>
            </div>
            <input
              type="tel"
              className="signup-phone"
              placeholder="12345 67890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
            />
          </div>
          <div id="recaptcha-container"></div>
          <button type="submit" className="signup-send" disabled={loading}>
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
        <div className="signup-login">
          Already have an account?{" "}
          <span className="signup-login-link" onClick={() => navigate("/login")}>Log in</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
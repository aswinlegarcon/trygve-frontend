import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login: React.FC = () => {
    const [email,setEmail] = useState("");
        const [phone,setPhone] = useState("");
        const navigate = useNavigate();

        const handleSubmit = (e : React.FormEvent) => {
            e.preventDefault();
            const userDetails = localStorage.getItem("user_details");
            if(!userDetails) {
                alert("No user details found. Please register first.");
                return;
            }
            try{
                const user = JSON.parse(userDetails);
                if(user.email === email.trim() && user.phone === `+91 ${phone.trim()}`) {
                    navigate("/register-otp");
                } else {
                    alert("Invalid email or phone number. Please try again.");
                }
            }catch{
                alert("Error parsing user details. Please try again.");
            }
        };

    return (
        <div className="login-bg">
            <div className="login-logo-bg"> </div>
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
                                required />

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
                            required />
                        </div>
                        <button type="submit" className="login-btn">Continue</button>
                    </form>
                </div>
        </div>
        
    );
};

export default Login;

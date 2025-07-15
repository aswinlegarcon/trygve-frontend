import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Signup.css";

const Signup: React.FC = () => {
    const [countryCode] = useState("+91");
    const [phone,setPhone] = useState("");
    const navigate = useNavigate();

    const handleSendCode = (e: React.FormEvent)=>{
        e.preventDefault();
        navigate("/otp",{ state: { phone: `${countryCode} ${phone}` } });
    }
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
                        <input type="tel" className="signup-phone" 
                        placeholder="12345 67890" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        pattern="[0-9]{10}" />
                    </div>
                    <div className="signup-logo-bg" />
                    <button type="submit" className="signup-send">Send Code</button>
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

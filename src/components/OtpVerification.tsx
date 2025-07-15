import React, {useState, useEffect} from "react";
import "../components/OtpVerification.css"; // Assuming you have a CSS file for styling


interface OtpVerificationProps{
    title : string;
    subtitle : string;
    buttonText : string;
    onVerify: (otp:string) => void;
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
    const [otp,setOtp] = useState(Array(6).fill(""));// Initialize an array of 6 empty strings for OTP input

    useEffect(() => {
        localStorage.setItem("dummy_otp","000000"); // Store a dummy OTP in localStorage
    },[]);

    const handleChange = (value : string, index: number) => {
        if(/^\d?$/.test(value)){
            const newOtp = [...otp];
            newOtp[index] = value; // Update the specific index with the new value
            setOtp(newOtp);
            if(value && index<5){
                const next = document.getElementById(`otp-input-${index+1}`);
                next && (next as HTMLInputElement).focus(); // Move focus to the next input
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key==="Backspace")
        {
            if(otp[index]==="" && index>0)
            {
                const prev = document.getElementById(`otp-input-${index-1}`);
                prev && (prev as HTMLInputElement).focus(); // Move focus to the previous input
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(otp.some(digit=> digit===""))
        {
            alert ("Please fill all the OTP fields");
            return;
        }
        const enteredOtp = otp.join(""); // Join the OTP array into a string
        const dummyOtp = localStorage.getItem("dummy_otp");
        if(enteredOtp !== dummyOtp)
        {
            alert("Invalid OTP");
            return;
        }
        onVerify(enteredOtp); // Join the OTP array into a string and call onVerify
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
                            autoFocus={index === 0} // Focus on the first input initially
                            />
                        ))}
                    </div>
                    <div className="otp-resend">
                        Didn't receive the code?{" "}
                        <span className="otp-resend-link" onClick={onResend}>Resend</span>
                    </div>
                    <button type="submit" className="otp-btn">{buttonText}</button>
                </form>
                <div className="otp-logo-bg"></div>
            </div>
            </div>
    );
};

export default OtpVerification;
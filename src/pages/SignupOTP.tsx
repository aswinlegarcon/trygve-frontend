
import {useLocation,useNavigate} from "react-router-dom";
import {useEffect} from "react";
import "../components/OtpVerification";
import OtpVerification from "../components/OtpVerification";

function maskPhone(phone: string)
{
    const match = phone.match(/(\+?\d+)\s*(\d{1})(\d{6})(\d{3})$/);
    if (match) {
        return `${match[1]} ${match[2]}******${match[4]}`;
    }
    return phone;
}
function SignupOTP(){
    const navigate = useNavigate();
    const phone = useLocation().state?.phone || "";

    useEffect( () => {
        if(phone) localStorage.setItem("user_phone", phone);
    }, [phone]);
    
    const maskedPhone = maskPhone(phone);
    return (
        <OtpVerification
            title="OTP Verification"
            subtitle={`Enter the verification code we just sent to your number ${maskedPhone}`}
            buttonText="Verify"
            onVerify={() => navigate("/register")}
            onResend={() => alert("Resend OTP")}
            onBack={() => navigate(-1)}
        />
    )
}

export default SignupOTP;
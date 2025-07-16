
import {useNavigate} from "react-router-dom";
import "../components/OtpVerification";
import OtpVerification from "../components/OtpVerification";

function LoginOTP(){
    const navigate = useNavigate();
    
    return (
        <OtpVerification
            title="Verification Code"
            subtitle={`We have sent a verification code to your registered email address.`}
            buttonText="Continue"
            onVerify={() => navigate("/login-success")}
            onResend={() => alert("Resend Code")}
            onBack={() => navigate(-1)}
        />
    )
}

export default LoginOTP;
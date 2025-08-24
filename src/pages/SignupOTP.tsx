import {useLocation,useNavigate} from "react-router-dom";
import {useEffect} from "react";
import "../components/OtpVerification";
import OtpVerification from "../components/OtpVerification";
import { useOtp } from "../contexts/OTPContext";
import ProtectedRoute from "../components/ProtectedRoute";

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
    const {phone: contextPhone, setVerified} = useOtp();

    useEffect( () => {
        if(contextPhone) {
            localStorage.setItem("user_phone", contextPhone);
        }
    }, [contextPhone]);

    const maskedPhone = maskPhone(contextPhone);
    
    const handleVerifySuccess = () => {
        setVerified(true); // Set verified to true when OTP is successfully verified
        navigate("/register");
    };

    return (
        <ProtectedRoute requirePhone={true} redirectTo="/signup">
            <OtpVerification
                title="OTP Verification"
                subtitle={`Enter the verification code we just sent to your number ${maskedPhone}`}
                buttonText="Verify"
                onVerify={handleVerifySuccess}
                onResend={() => alert("Resend OTP")}
                onBack={() => navigate(-1)}
            />
        </ProtectedRoute>
    );
}

export default SignupOTP;
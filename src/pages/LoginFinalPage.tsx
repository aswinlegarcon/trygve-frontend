import { useNavigate } from "react-router-dom";
import FinalPage from "../components/FinalPage";
import ProtectedRoute from "../components/ProtectedRoute";

const RegisterFinalPage = () => {
  const navigate = useNavigate();
  return (
    <ProtectedRoute requirePhone={true} requireRegistrationCompleted={true} redirectTo="/login">
    <FinalPage
      title={<>Welcome back to<br />TRYGVE</>}
      subtitle={
        <>
          "Your Trusted Guardian of Life is ready<br />
          to serve you."
        </>
      }
      buttonText="Continue"
      onButtonClick={() => navigate("/login")}
    />
    </ProtectedRoute>
  );
};

export default RegisterFinalPage;
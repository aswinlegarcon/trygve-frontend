import { useNavigate } from "react-router-dom";
import FinalPage from "../components/FinalPage";
import ProtectedRoute from "../components/ProtectedRoute";

const RegisterFinalPage = () => {
  const navigate = useNavigate();
  return (
    <ProtectedRoute
      requirePhone={true}
      requireVerified={true}
      requireRegistrationCompleted={true}
      redirectTo="/signup"
    >
      <FinalPage
        title={<>You're Now with Your<br />Trusted Guardian of Life!</>}
        subtitle={
          <>
            Welcome to the TRYGE Family!<br />
            Your journey to better health starts here.
          </>
        }
        buttonText="Back to Login"
        onButtonClick={() => navigate("/login")}
      />
    </ProtectedRoute>
  );
};

export default RegisterFinalPage;
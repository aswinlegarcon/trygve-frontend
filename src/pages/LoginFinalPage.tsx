import { useNavigate } from "react-router-dom";
import FinalPage from "../components/FinalPage";

const LoginFinalPage = () => {
  const navigate = useNavigate();
  
  return (
    <FinalPage
      title={<>Welcome Back to Your<br />Healthcare Dashboard!</>}
      subtitle={
        <>
          You're successfully logged in.<br />
          Let's continue your health journey.
        </>
      }
      buttonText="Go to Dashboard"
      onButtonClick={() => navigate("/dashboard")}
    />
  );
};

export default LoginFinalPage;
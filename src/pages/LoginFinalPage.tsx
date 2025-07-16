import { useNavigate } from "react-router-dom";
import FinalPage from "../components/FinalPage";

const RegisterFinalPage = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default RegisterFinalPage;
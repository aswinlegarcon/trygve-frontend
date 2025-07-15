import { useNavigate } from "react-router-dom";
import FinalPage from "../components/FinalPage";

const RegisterFinalPage = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default RegisterFinalPage;
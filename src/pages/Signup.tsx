import SignupTemplate from "../components/page/Signup";
import { useAuthContext } from "../hooks/useAuthContext";
import { Redirect } from "react-router-dom";

const Signup: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="container -auth">
      <SignupTemplate />
    </div>
  );
};

export default Signup;

import SignupTemplate from "../components/template/Signup";
import { useAuthContext } from "../hooks/useContextClient";
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

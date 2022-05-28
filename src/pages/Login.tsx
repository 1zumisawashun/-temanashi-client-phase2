import LoginTemplate from "../components/template/Login";
import { useAuthContext } from "../hooks/useContextClient";
import { Redirect } from "react-router-dom";

const Login: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="container -auth">
      <LoginTemplate />
    </div>
  );
};

export default Login;

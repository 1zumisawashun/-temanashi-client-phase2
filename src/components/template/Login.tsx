import { FC, FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { InputText, BasicButton, LinkButton } from "../ui";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, isPending } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="auth-container">
      <div className="wrapper -w25">
        <div className="form" data-cy="login">
          <h1>login</h1>
          <form onSubmit={handleSubmit}>
            <InputText
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="xyz@gmail.com"
              data-cy="email"
            />
            <InputText
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Must have atleast 6 characters"
              data-cy="password"
            />
            <BasicButton
              isDisabled={isPending}
              data-cy="login"
              onClick={handleSubmit}
            >
              Login
            </BasicButton>
            {error && <div className="error">{error}</div>}
            <div className="forgot-signup">
              <LinkButton path="/signup">Forgot password?</LinkButton>
              <LinkButton path="/signup">Sign Up</LinkButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

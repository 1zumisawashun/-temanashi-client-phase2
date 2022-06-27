import LoginTemplate from "../components/template/Login";
import { useAuthContext } from "../hooks/useContextClient";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled("div")`
  flex-grow: 1;
  width: calc(100% - 650px);
  @media (min-width: 576px) {
    display: block;
  }
`;

const Login: React.VFC = () => {
  const { user } = useAuthContext();
  console.log(user, "login user");
  // NOTE:リロードするとユーザ取得が遅れてログイン画面に飛ばされる＞ログインユーザだからトップページに繊維する
  return user ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <LoginTemplate />
    </Container>
  );
};

export default Login;

import LoginTemplate from "../components/template/Login";
import { useAuthContext } from "../hooks";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";
import { Head } from "../components/layout";

const Container = styled("div")`
  flex-grow: 1;
  width: calc(100% - 650px);
`;

export const Login: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <Head title="Login.tsx" />
      <Container>
        <LoginTemplate />
      </Container>
    </>
  );
};

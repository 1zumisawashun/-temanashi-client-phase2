import { SignupTemplate } from "../components/template/Signup";
import { useAuthContext } from "../hooks";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";
import { Head } from "../components/layout";

const Container = styled("div")`
  flex-grow: 1;
  width: calc(100% - 650px);
`;

export const Signup: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <Head title="Signup.tsx" />
      <Container>
        <SignupTemplate />
      </Container>
    </>
  );
};

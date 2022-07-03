import SignupTemplate from "../components/template/Signup";
import { useAuthContext } from "../hooks/useContextClient";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";
import { Head } from "../components/layout";

const Container = styled("div")`
  flex-grow: 1;
  width: calc(100% - 650px);
  @media (min-width: 576px) {
    display: block;
  }
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

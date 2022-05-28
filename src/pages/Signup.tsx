import SignupTemplate from "../components/template/Signup";
import { useAuthContext } from "../hooks/useContextClient";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled("div")`
  width: calc(100% - 650px);
  flex-grow: 1;
  @media (min-width: 576px) {
    display: block;
  }
`;

const Signup: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <SignupTemplate />
    </Container>
  );
};

export default Signup;

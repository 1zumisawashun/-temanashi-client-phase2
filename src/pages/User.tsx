import UserTemplate from "../components/template/User";
import { useAuthContext } from "../hooks/useContextClient";
import {
  Sidebar,
  OnlineUsers,
  Header,
  Footer,
  Head,
} from "../components/layout";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled("div")`
  flex-grow: 1;
  width: calc(100% - 650px);
  @media (min-width: 576px) {
    display: block;
  }
`;
const Inner = styled("div")`
  padding: 0 50px 50px;
`;

const User: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Head title="User.tsx" />
      <Sidebar />
      <Container>
        <Inner>
          <Header />
          <UserTemplate />
        </Inner>
        <Footer />
      </Container>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default User;

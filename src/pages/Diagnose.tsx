import DiagnoseTemplate from "../components/template/Diagnose";
import { useAuthContext } from "../hooks";
import {
  Sidebar,
  OnlineUsers,
  Header,
  Footer,
  Head,
} from "../components/layout";
import { Loading } from "../components/ui";
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

export const Diagnose: React.VFC = () => {
  const { user, authIsReady } = useAuthContext();

  if (!user && !authIsReady) {
    return <Loading />;
  }

  if (!user && authIsReady) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Head title="Diagnose.tsx" />
      <Sidebar />
      <Container>
        <Inner>
          <Header />
          <DiagnoseTemplate />
        </Inner>
        <Footer />
      </Container>
      <OnlineUsers />
    </>
  );
};

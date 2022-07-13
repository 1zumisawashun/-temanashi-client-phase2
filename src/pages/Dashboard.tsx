import DashboardTemplate from "../components/template/Dashboard";
import { useAuthContext } from "../hooks";
import {
  Sidebar,
  OnlineUsers,
  Header,
  Footer,
  Head,
} from "../components/layout";
import styled from "@emotion/styled";
import { Loading } from "../components/ui";
import { Redirect } from "react-router-dom";

const Container = styled("div")`
  flex-grow: 1;
  width: calc(100% - 650px);
`;
const Inner = styled("div")`
  padding: 0 50px 50px;
`;

export const Dashboard: React.VFC = () => {
  const { user, authIsReady } = useAuthContext();

  if (!user && !authIsReady) {
    return <Loading />;
  }

  if (!user && authIsReady) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Head title="Dashboard.tsx" />
      <Sidebar />
      <Container>
        <Inner>
          <Header />
          <DashboardTemplate />
        </Inner>
        <Footer />
      </Container>
      <OnlineUsers />
    </>
  );
};

import DashboardTemplate from "../components/template/Dashboard";
import { useAuthContext } from "../hooks/useContextClient";
import { Sidebar, OnlineUsers, Header, Footer } from "../components/layout";
import { Redirect } from "react-router-dom";

const Dashboard: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Header />
        <DashboardTemplate />
        <Footer />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Dashboard;

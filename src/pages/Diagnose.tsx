import DiagnoseTemplate from "../components/template/Diagnose";
import { useAuthContext } from "../hooks/useContextClient";
import { Sidebar, OnlineUsers, Header, Footer } from "../components/layout";
import { Redirect } from "react-router-dom";

const Diagnose: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Header />
        <DiagnoseTemplate />
        <Footer />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Diagnose;

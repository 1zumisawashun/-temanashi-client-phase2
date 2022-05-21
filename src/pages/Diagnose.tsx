import DiagnoseTemplate from "../components/page/Diagnose";
import { useAuthContext } from "../hooks/useAuthContext";
import { Sidebar, OnlineUsers, Navbar } from "../components/layout";
import { Redirect } from "react-router-dom";

const Diagnose: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Navbar />
        <DiagnoseTemplate />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Diagnose;

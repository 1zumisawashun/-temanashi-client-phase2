import CreateTemplate from "../components/page/Create";
import { useAuthContext } from "../hooks/useAuthContext";
import { Sidebar, OnlineUsers, Navbar } from "../components/layout";
import { Redirect } from "react-router-dom";

const Create: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Navbar />
        <CreateTemplate />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Create;

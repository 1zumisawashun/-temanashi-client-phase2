import UserTemplate from "../components/page/User";
import { useAuthContext } from "../hooks/useAuthContext";
import { Sidebar, OnlineUsers, Navbar } from "../components/layout";
import { Redirect } from "react-router-dom";

const User: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Navbar />
        <UserTemplate />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default User;

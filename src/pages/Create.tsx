import CreateTemplate from "../components/template/Create";
import { useAuthContext } from "../hooks/useContextClient";
import { Sidebar, OnlineUsers, Header, Footer } from "../components/layout";
import { Redirect } from "react-router-dom";

const Create: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Header />
        <CreateTemplate />
        <Footer />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Create;

import ProductTemplate from "../components/page/Product";
import { useAuthContext } from "../hooks/useAuthContext";
import { Sidebar, OnlineUsers, Navbar } from "../components/layout";
import { Redirect } from "react-router-dom";

const Product: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Navbar />
        <ProductTemplate />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Product;

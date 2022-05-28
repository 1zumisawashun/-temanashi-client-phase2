import ProductTemplate from "../components/template/Product";
import { useAuthContext } from "../hooks/useContextClient";
import { Sidebar, OnlineUsers, Header, Footer } from "../components/layout";
import { Redirect } from "react-router-dom";

const Product: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Header />
        <ProductTemplate />
        <Footer />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Product;

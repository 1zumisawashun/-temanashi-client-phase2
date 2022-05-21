import CartTemplate from "../components/page/Cart";
import { useAuthContext } from "../hooks/useAuthContext";
import { Sidebar, OnlineUsers, Navbar } from "../components/layout";
import { Redirect } from "react-router-dom";

const Cart: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Navbar />
        <CartTemplate />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Cart;

import CartTemplate from "../components/template/Cart";
import { useAuthContext } from "../hooks/useContextClient";
import { Sidebar, OnlineUsers, Header, Footer } from "../components/layout";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled("div")`
  width: calc(100% - 650px);
  flex-grow: 1;
  @media (min-width: 576px) {
    display: block;
  }
`;
const Inner = styled("div")`
  padding: 0 50px 50px;
`;

const Cart: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <Container>
        <Inner>
          <Header />
          <CartTemplate />
        </Inner>
        <Footer />
      </Container>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Cart;

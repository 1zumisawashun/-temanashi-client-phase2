import CartTemplate from "../components/template/Cart";
import { useAuthContext } from "../hooks/useContextClient";
import {
  Sidebar,
  OnlineUsers,
  Header,
  Footer,
  Head,
} from "../components/layout";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled("div")`
  flex-grow: 1;
  width: calc(100% - 650px);
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
      <Head title="Cart.tsx" />
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

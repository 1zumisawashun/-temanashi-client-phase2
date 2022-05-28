import { useState } from "react";
import { productUseCase } from "../../utilities/stripeClient";
import { useAuthContext, useCartContext } from "../../hooks/useContextClient";
import Loading from "../ui/Loading";
import { useToken } from "../../hooks/useToken";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import CartList from "../model/cart/CartList";
import { NotFoundItem } from "../ui";
import CartPaymentArea from "../model/cart/CartAgreement";

const Cart: React.VFC = () => {
  const history = useHistory();
  const { verifyJWT } = useToken();
  const { logout } = useAuth();
  const { cart } = useCartContext();
  const { user } = useAuthContext();

  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);

  if (!user) throw new Error("we cant find your account");

  const onClickBuy = async () => {
    const line_items = cart.map((item) => {
      return {
        price: item.priceIndex,
        quantity: item.quantity ?? 0,
      };
    });

    const token = await verifyJWT();
    console.log(token); // FIXME:今はトークン認証バグっているのであとで修正が必要
    if (token) {
      alert("認証トークンが有効期限切れです。ログインしなおしてください。");
      logout();
      history.push("/login");
      return;
    }
    try {
      setIsPendingBuy(true);
      const uid = user.uid;
      const seccess_url = `${window.location.origin}/complete`;
      const cancel_url = `${window.location.origin}/error`;
      await productUseCase.buy(uid, line_items, seccess_url, cancel_url);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${!!error.message ? error.message : error}`);
      }
    } finally {
      setIsPendingBuy(false);
    }
  };

  return (
    <div className="common-container">
      {isPendingBuy && <Loading />}
      {cart.length !== 0 ? (
        <>
          <CartList productItems={cart} />
          <CartPaymentArea onClick={onClickBuy} />
        </>
      ) : (
        <NotFoundItem />
      )}
    </div>
  );
};
export default Cart;

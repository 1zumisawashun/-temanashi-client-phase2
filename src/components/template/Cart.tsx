import { useState } from "react";
import { productUseCase } from "../../utilities/stripeClient";
import { useAuthContext, useCartContext } from "../../hooks/useContextClient";
import { useToken } from "../../hooks/useToken";
import CartList from "../model/cart/CartList";
import { NotFoundItem, Loading } from "../ui";
import CartPaymentArea from "../model/cart/CartAgreement";

const Cart: React.VFC = () => {
  const { verifyJWT } = useToken();
  const { cart } = useCartContext();
  const { user } = useAuthContext();

  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  if (!user) throw new Error("we cant find your account");

  const onClickBuy = async () => {
    setIsError("");
    setIsPendingBuy(true);

    const line_items = cart.map((item) => {
      return {
        price: item.priceIndex,
        quantity: item.quantity ?? 0,
      };
    });

    const token = await verifyJWT(); // FIXME:今はトークン認証バグっているのであとで修正が必要
    if (token) {
      setIsError(
        "認証トークンが有効期限切れです。ログインしなおしてください。"
      );
      return;
    }
    try {
      const {uid} = user;
      const seccess_url = `${window.location.origin}/complete`;
      const cancel_url = `${window.location.origin}/error`;
      await productUseCase.buy(uid, line_items, seccess_url, cancel_url);
      setIsPendingBuy(false);
    } catch (error) {
      setIsError("Stripeページへの遷移が失敗しました。");
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
      {isError.length !== 0 && <p>{isError}</p>}
    </div>
  );
};
export default Cart;

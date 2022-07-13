import { useState } from "react";
import { productUseCase } from "../../utilities/stripeClient";
import { useAuthContext, useCartContext } from "../../hooks/useContextClient";
import { useToken } from "../../hooks/useToken";
import { CartList, CartAgreement } from "../model/cart";
import { ErrorNotFound } from "../ui";
import { useErrorHandler } from "react-error-boundary";

export const CartTemplate: React.VFC = () => {
  const { verifyJWT } = useToken();
  const { cart } = useCartContext();
  const { user } = useAuthContext();
  const handleError = useErrorHandler();

  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);

  if (!user) throw new Error("we cant find your account");

  const onClickBuy = async () => {
    setIsPendingBuy(true);

    const line_items = cart.map((item) => {
      return {
        price: item.priceIndex,
        quantity: item.quantity ?? 0,
      };
    });

    /**
     * 今はトークン認証バグっているのであとで修正が必要_20220713
     * 購入画面へ繊維する時にトークンチェックがないので直接ハンドリングする必要がある
     * https://ja.reactjs.org/docs/error-boundaries.html
     * react-dom.development.jsでエラーが発生している模様
     */
    const token = await verifyJWT();
    if (token) {
      setIsPendingBuy(false);
      handleError("onClickBuy Error");
      return;
    }

    try {
      const { uid } = user;
      const seccess_url = `${window.location.origin}/complete`;
      const cancel_url = `${window.location.origin}/error`;
      await productUseCase.buy(uid, line_items, seccess_url, cancel_url);
      setIsPendingBuy(false);
    } catch (error) {
      setIsPendingBuy(false);
      handleError("onClickBuy Error");
    }
  };

  return (
    <div>
      {cart.length !== 0 ? (
        <>
          <CartList productItems={cart} />
          <CartAgreement onClick={onClickBuy} isLoading={isPendingBuy} />
        </>
      ) : (
        <ErrorNotFound />
      )}
    </div>
  );
};

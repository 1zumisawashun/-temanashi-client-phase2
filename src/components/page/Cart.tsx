import { FC, useState } from "react";
import {
  line_item,
  productUseCase,
  ProductItemWithoutComment,
} from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCartDocument } from "../../hooks/useCartDocument";
import Loading from "../ui/Loading";
import { useToken } from "../../hooks/useToken";
// import { useAuth } from "../../hooks/useAuth";
// import { useHistory } from "react-router-dom";
import CartList from "../model/cart/CartList";
import NotFound from "../ui/NotFound";
import CartPaymentArea from "../model/cart/CartPaymentArea";

const Cart: FC = () => {
  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const [line_items, setLinetems] = useState<Array<line_item>>([]);
  const { verifyJWT } = useToken();
  // const { logout } = useAuth();
  // const history = useHistory();

  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const { documents } = useCartDocument();

  const onClickBuy = async () => {
    // NOTE:2n・n2乗のパフォーマンス改善でループを分けている
    const priceIndexArray = documents.map(
      (document: ProductItemWithoutComment): string => {
        return Object.keys(document.prices)[0];
      }
    );

    const documentsLineItems = priceIndexArray.map(
      (priceIndex): line_item => {
        return { price: priceIndex, quantity: 1 };
      }
    );

    let formatlineItems: { [key: string]: line_item } = {};

    if (line_items.length === 0) {
      formatlineItems = line_items.reduce(
        (acc: { [key: string]: line_item }, v: line_item) => {
          acc[v.price] = v;
          return acc;
        },
        {}
      );
    }

    const resultsLineItems = documentsLineItems.map(
      (item: line_item) => formatlineItems[item.price] ?? item
    );
    const token = await verifyJWT();
    console.log(token);
    // if (!token) {
    //   alert("認証トークンが有効期限切れです。ログインしなおしてください。");
    //   logout();
    //   history.push("/login");
    //   return;
    // }
    try {
      setIsPendingBuy(true);
      const uid = user.uid;
      const seccess_url = `${window.location.origin}/complete`;
      const cancel_url = `${window.location.origin}/error`;
      await productUseCase.buy(uid, resultsLineItems, seccess_url, cancel_url);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${!!error.message ? error.message : error}`);
      }
    } finally {
      setIsPendingBuy(false);
    }
  };

  const checkSameProduct = (price: string): Array<line_item> => {
    const result = line_items.filter((item: line_item) => {
      return item.price !== price;
    });
    return result;
  };

  const selectProduct = async (price: string, quantity: number) => {
    const lineItem: line_item = {
      price,
      quantity,
    };
    const checkedProduct = await checkSameProduct(price);
    const result = [...checkedProduct, lineItem];
    await setLinetems(result);
  };

  const removeProduct = async (price: string) => {
    const result = await checkSameProduct(price);
    setLinetems(result);
  };
  return (
    <div className="common-container">
      {isPendingBuy && <Loading />}
      {documents.length === 0 && <NotFound />}
      {documents.length !== 0 && (
        <>
          <CartList
            productItems={documents}
            selectProduct={selectProduct}
            removeProduct={removeProduct}
          />
          <CartPaymentArea onClick={onClickBuy} />
        </>
      )}
    </div>
  );
};
export default Cart;

import { FC, useEffect } from "react";
import UserFilter from "../model/user/UserFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import Loading from "../../components/Loading";
import { useCookies } from "react-cookie";
import UserFavorite from "../model/user/UserFavorite";
import UserHistory from "../model/user/UserHistory";
import UserAccount from "../model/user/UserAccount";

const Dashboard: FC = () => {
  const { user } = useAuthContext();
  const [currentFilter, setCurrentFilter] = useState<String>("all");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  /* eslint-disable */
  const [cookies, setCookie] = useCookies(["random"]);
  /* eslint-enable */

  const changeFilter = (newFilter: String) => {
    setCurrentFilter(newFilter);
  };

  const fetchProducts = async () => {
    try {
      setIsPending(true);
      const productItems = await productUseCase.fetchAll();
      setProductItems(productItems);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setCookie("random", productItems.length, { path: "/" });
  }, [setCookie, productItems.length]);

  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  return (
    <div className="common-container">
      {isPending && <Loading />}
      {!isPending && (
        <UserFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      )}
      {currentFilter === "favorite" && <UserFavorite />}
      {currentFilter === "history" && <UserHistory />}
      {currentFilter === "account" && <UserAccount />}
    </div>
  );
};

export default Dashboard;

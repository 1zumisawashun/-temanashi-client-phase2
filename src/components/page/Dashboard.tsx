import { FC, useEffect } from "react";
import DashboardFilter from "../model/dashboard/DashboardFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import DashboardList from "../model/dashboard/DashboardList";
import Loading from "../ui/Loading";
import { useCookies } from "react-cookie";

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

  const filteredProductItems = productItems
    ? // eslint-disable-next-line
      productItems.filter((productItem: ProductItem) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "bed":
          case "blanket":
          case "chair":
          case "lamp":
          case "plant":
          case "rug":
          case "table":
          case "shelf":
          case "sofa":
          case "development":
          case "sales":
          case "design":
          case "marketing":
            return productItem.product.metadata?.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="common-container">
      {isPending && <Loading />}
      {filteredProductItems && (
        <DashboardFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {filteredProductItems && (
        <DashboardList productItems={filteredProductItems} />
      )}
    </div>
  );
};

export default Dashboard;

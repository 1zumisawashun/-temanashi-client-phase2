import { useEffect } from "react";
import DashboardFilter from "../model/dashboard/DashboardFilter";
import { useState } from "react";
import { useAuthContext, useRandomContext } from "../../hooks/useContextClient";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import DashboardList from "../model/dashboard/DashboardList";
import { Loading } from "../ui";
import { projectFirestore } from "../../firebase/config";

const Dashboard: React.VFC = () => {
  const { user } = useAuthContext();
  const { addProductWithRandom } = useRandomContext();
  const [currentFilter, setCurrentFilter] = useState<String>("all");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  const changeFilter = (newFilter: String) => {
    setCurrentFilter(newFilter);
  };

  useEffect(() => {
    (async () => {
      setIsPending(true);
      const productItems = await productUseCase.fetchAll();
      const productsRef = projectFirestore.collection("products");
      const querySnapshot = await productsRef.get();
      const results = querySnapshot.docs.map((doc, index) => {
        const { name, images } = doc.data();
        return { name, image: images[0], id: doc.id, random: index };
      });
      addProductWithRandom(results);
      setProductItems(productItems);
      setIsPending(false);
    })();
  }, [addProductWithRandom]);

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

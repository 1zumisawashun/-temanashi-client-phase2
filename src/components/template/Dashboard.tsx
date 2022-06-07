import { useEffect, useState } from "react";
import DashboardFilter from "../model/dashboard/DashboardFilter";
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
  const [isError, setIsError] = useState<string>("");

  const changeFilter = (newFilter: String) => {
    setCurrentFilter(newFilter);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsError("");
        setIsPending(true);
        const productItems = await productUseCase.fetchAll();
        setProductItems(productItems);
        setIsPending(false);
      } catch (error) {
        setIsError("fetchに失敗しました。");
        setIsPending(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const productsRef = projectFirestore.collection("products");
      const querySnapshot = await productsRef.get();
      const results = querySnapshot.docs.map((doc, index) => {
        const { name, images } = doc.data();
        return { name, image: images[0], id: doc.id, random: index };
      });
      addProductWithRandom(results);
    })();
    // NOTE:依存配列にaddProductWithRandomを突っ込んで請求100円きた泣
    // eslint-disable-next-line
  }, []);

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
      {isError.length !== 0 && <p>{isError}</p>}
    </div>
  );
};

export default Dashboard;

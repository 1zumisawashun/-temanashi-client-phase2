import { useState } from "react";
import DashboardFilter from "../model/dashboard/DashboardFilter";
import { useAuthContext } from "../../hooks/useContextClient";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import DashboardList from "../model/dashboard/DashboardList";
import { useErrorHandler } from "react-error-boundary";
import { useData } from "../../hooks/useData";

const Dashboard: React.VFC = () => {
  const { user } = useAuthContext();
  const handleError = useErrorHandler();
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  const productItems = useData<ProductItem[]>("productItems", () =>
    productUseCase.fetchAll()
  );

  const changeFilter = (newFilter: string) => {
    if (!newFilter) handleError("we cant find new filter");
    setCurrentFilter(newFilter);
  };

  if (!user) throw new Error("we cant find your account");

  const filteredProductItems = productItems
    ? productItems.filter((productItem: ProductItem) => {
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

import ProductList from "../dashboard/DashboardList";
import { ProductItem } from "../../../utilities/stripeClient";
import { NotFoundItem } from "../../ui";
interface UserFavoriteProps {
  productItems: Array<ProductItem>;
}

const UserFavorite: React.VFC<UserFavoriteProps> = ({ productItems }) => {
  return (
    <div className="user-container">
      <div className="inner">
        {productItems.length !== 0 ? (
          <ProductList productItems={productItems} />
        ) : (
          <NotFoundItem />
        )}
      </div>
    </div>
  );
};
export default UserFavorite;

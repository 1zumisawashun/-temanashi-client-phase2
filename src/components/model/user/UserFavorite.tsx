import ProductList from "../dashboard/DashboardList";
import { ProductItem } from "../../../utilities/stripeClient";
import { NotFoundItem } from "../../ui";
import styled from "@emotion/styled";

const UserContaienr = styled("div")`
  width: 100%;
  min-height: 300px;
  background: #f4f4f4;
`;
interface UserFavoriteProps {
  productItems: Array<ProductItem>;
}

const UserFavorite: React.VFC<UserFavoriteProps> = ({ productItems }) => {
  return (
    <UserContaienr>
      {productItems.length !== 0 ? (
        <ProductList productItems={productItems} />
      ) : (
        <NotFoundItem />
      )}
    </UserContaienr>
  );
};
export default UserFavorite;

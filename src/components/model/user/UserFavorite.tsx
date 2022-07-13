import { DashboardList } from "../dashboard";
import { ProductItem } from "../../../utilities/stripeClient";
import { ErrorNotFound } from "../../ui";
import styled from "@emotion/styled";

const UserContaienr = styled("div")`
  width: 100%;
  min-height: 300px;
  background: #f4f4f4;
`;
interface UserFavoriteProps {
  productItems: Array<ProductItem>;
}

export const UserFavorite: React.VFC<UserFavoriteProps> = ({
  productItems,
}) => {
  return (
    <UserContaienr>
      {productItems.length !== 0 ? (
        <DashboardList productItems={productItems} />
      ) : (
        <ErrorNotFound />
      )}
    </UserContaienr>
  );
};

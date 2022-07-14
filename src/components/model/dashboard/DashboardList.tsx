import { Link } from "react-router-dom";
import {
  ProductItem,
  ProductItemWithoutComment,
} from "../../../utilities/stripeClient";
import { useAuthContext } from "../../../hooks/useContextClient";
import { formatTaxIncludedPrice } from "../../../utilities";
import { Image, Divider } from "../../ui";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

export const DashboardListContainer = styled("div")`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 20px;
`;
export const DashboardListWrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
`;
export const Thumbnail = styled("div")`
  width: 70%;
  display: flex;
  margin: auto;
`;
/*
 * 小コンポーネントに送るために作成
 */
export const styledImage = css`
  width: 230px;
  height: 160px;
  object-fit: cover;
`;
export const Content = styled("div")`
  width: 30%;
  margin: auto;
`;
export const Name = styled("p")`
  font-size: 1.1rem;
  color: #444;
  font-weight: bold;
  text-decoration: none;
  /*
   * 3点リーダー
   */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;
export const Price = styled("span")`
  color: #444;
  font-size: 0.9rem;
`;
export const DimentionContainer = styled("div")``;
export const DimentionInner = styled("ul")`
  margin: 10px 0 0 0;
  font-size: 14px;
`;
export const DimentionItem = styled("li")`
  margin-right: 10px;
`;

type DashboardListProps = {
  productItems: Array<ProductItem | ProductItemWithoutComment>;
};

export const DashboardList: React.VFC<DashboardListProps> = ({
  productItems,
}) => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  return (
    <DashboardListContainer>
      {productItems &&
        productItems.map((item: ProductItem | ProductItemWithoutComment) => (
          <DashboardListWrapper
            to={`/products/${item.product.id}`}
            key={item.product.id}
          >
            <Thumbnail>
              {item.product.images.length > 0 ? (
                <Image src={item.product.images[0]} className={styledImage} />
              ) : (
                <Image
                  src="https://placehold.jp/230x160.png"
                  className={styledImage}
                />
              )}
            </Thumbnail>
            <Content>
              <Name>{item.product.name}</Name>
              {Object.keys(item.prices).map((priceIndex) => (
                <Price>
                  {formatTaxIncludedPrice(item.prices[priceIndex].unit_amount)}
                </Price>
              ))}
              <Divider />
              <DimentionContainer>
                <DimentionInner>
                  <DimentionItem>
                    横幅 {item.product.metadata?.width ?? 111}cm
                  </DimentionItem>
                  <DimentionItem>
                    深さ {item.product.metadata?.length ?? 222}cm
                  </DimentionItem>
                  <DimentionItem>
                    高さ {item.product.metadata?.height ?? 333}cm
                  </DimentionItem>
                </DimentionInner>
              </DimentionContainer>
            </Content>
          </DashboardListWrapper>
        ))}
    </DashboardListContainer>
  );
};

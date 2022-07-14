import { Link } from "react-router-dom";
import {
  useAuthContext,
  useCartContext,
} from "../../../hooks/useContextClient";
import { formatTaxIncludedPrice } from "../../../utilities";
import { CartCounter } from "./CartCounter";
import { Divider, Image, ButtonIconDelete } from "../../ui";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

const CartListContainer = styled("div")`
  width: 80%;
  margin: 0 auto;
`;
const CartListWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 6px;
`;
const Thumbnail = styled(Link)`
  display: block;
  width: 30%;
  display: flex;
  margin: auto;
`;
/*
 * 小コンポーネントに送るために作成
 */
const styledImage = css`
  width: 130px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
`;
const Content = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 70%;
`;
const Detail = styled("div")`
  margin: auto 0;
`;
const ButtonWrapper = styled("div")``;
const Name = styled("p")`
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
const Price = styled("span")`
  color: #444;
  font-size: 0.9rem;
  margin: 0 10px;
`;
interface Product {
  id: string;
  title: string;
  price: number;
  priceIndex: string;
  quantity?: number;
  image: string;
}
interface CartListProps {
  productItems: Array<Product>;
}

export const CartList: React.VFC<CartListProps> = ({ productItems }) => {
  const { user } = useAuthContext();
  const { removeProductFromCart } = useCartContext();

  if (!user) throw new Error("we cant find your account");

  const HandleRemove = (productId: string) => {
    removeProductFromCart(productId);
  };

  return (
    <CartListContainer>
      {productItems &&
        productItems.map((item: Product) => (
          <>
            <CartListWrapper>
              <Thumbnail
                to={`/products/${item.id}`}
                key={item.id}
                className="thumbnail"
              >
                {item.image ? (
                  <Image src={item.image} className={styledImage} />
                ) : (
                  <Image
                    src="https://placehold.jp/230x160.png"
                    className={styledImage}
                  />
                )}
              </Thumbnail>
              <Content>
                <Detail>
                  <Name>
                    {item.title}
                    <Price>{formatTaxIncludedPrice(item.price)}</Price>
                  </Name>
                  <ButtonWrapper>
                    {item.quantity && (
                      <CartCounter
                        quantity={item.quantity}
                        productId={item.id}
                      />
                    )}
                  </ButtonWrapper>
                </Detail>
                <ButtonWrapper>
                  <ButtonIconDelete
                    styleName="delete-icon"
                    size="large"
                    onClick={() => HandleRemove(item.id)}
                  />
                </ButtonWrapper>
              </Content>
            </CartListWrapper>
            <Divider />
          </>
        ))}
    </CartListContainer>
  );
};

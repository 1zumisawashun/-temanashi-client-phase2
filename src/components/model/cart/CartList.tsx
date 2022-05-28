import { Link } from "react-router-dom";
import {
  useAuthContext,
  useCartContext,
} from "../../../hooks/useContextClient";
import { taxIncludedPrice } from "../../../utilities/utilities";
import CartCounter from "./CartCounter";
import { Divider, Image, DeleteButton } from "../../ui";
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

const CartList: React.VFC<CartListProps> = ({ productItems }) => {
  const { user } = useAuthContext();
  const { removeProductFromCart } = useCartContext();

  if (!user) throw new Error("we cant find your account");

  const HandleRemove = (productId: string) => {
    removeProductFromCart(productId);
  };

  return (
    <div className="cart-list">
      {productItems &&
        productItems.map((item: Product) => (
          <>
            <div className="wrapper">
              <Link
                to={`/products/${item.id}`}
                key={item.id}
                className="thumbnail"
              >
                {item.image ? (
                  <Image src={item.image} />
                ) : (
                  <Image src="https://placehold.jp/230x160.png" />
                )}
              </Link>
              <div className="content">
                <div className="details">
                  <p className="name">
                    {item.title}
                    <span className="price">
                      {taxIncludedPrice(item.price)}
                    </span>
                  </p>
                  <div className="btnarea">
                    {item.quantity && (
                      <CartCounter
                        quantity={item.quantity}
                        productId={item.id}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <DeleteButton
                    styleName="delete-icon"
                    size="large"
                    onClick={() => HandleRemove(item.id)}
                  />
                </div>
              </div>
            </div>
            <Divider />
          </>
        ))}
    </div>
  );
};
export default CartList;

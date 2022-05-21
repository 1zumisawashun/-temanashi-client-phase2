import { useCartContext } from "../../../hooks/useCartContext";
import { CountDownButton, CountUpButton } from "../../ui/IconButton";

interface CartCounterProps {
  productId: string;
  quantity: number;
}

const CartCounter: React.VFC<CartCounterProps> = ({ quantity, productId }) => {
  const { countDownProduct, countUpProduct } = useCartContext();

  const handleCountUp = () => {
    countUpProduct(productId);
  };
  const handleCountDown = () => {
    countDownProduct(productId);
  };

  return (
    <div className="counter-container">
      <CountDownButton onClick={handleCountDown} />
      <span className="count">{quantity}</span>
      <CountUpButton onClick={handleCountUp} />
    </div>
  );
};

export default CartCounter;

import { useCartContext } from "../../../hooks/useCartContext";
import { CountUpButton, CountDownButton } from "../../ui";
import styled from "@emotion/styled";

const CounterWrapper = styled("div")`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const Quantity = styled("p")`
  display: block;
  margin: auto;
`;
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
    <CounterWrapper>
      <CountDownButton onClick={handleCountDown} />
      <Quantity>{quantity}</Quantity>
      <CountUpButton onClick={handleCountUp} />
    </CounterWrapper>
  );
};

export default CartCounter;

import { useCartContext } from "../../../hooks/useContextClient";
import { CountUpButton, CountDownButton } from "../../ui";
import styled from "@emotion/styled";

const CounterWrapper = styled("div")`
  display: flex;
  gap: 10px;
  justify-content: center;
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

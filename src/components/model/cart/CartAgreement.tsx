import { useState } from "react";
import { InputCheckbox } from "../../ui/InputCheckbox";
import Button from "../../ui/BasicButton";

interface CartAgreementProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Cart: React.VFC<CartAgreementProps> = ({ onClick }) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAccepted(!isAccepted);
  };

  return (
    <div className="accept-block">
      <InputCheckbox
        label="利用規約に同意しますか？"
        checked={isAccepted}
        value=""
        size="medium"
        onChange={(e) => onInputChange(e)}
      />
      <Button isDisabled={!isAccepted} onClick={onClick}>
        購入する
      </Button>
    </div>
  );
};
export default Cart;

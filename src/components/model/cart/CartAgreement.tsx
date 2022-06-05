import { useState } from "react";
import { InputCheckbox, BasicButton } from "../../ui";

interface CartAgreementProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CartAgreement: React.VFC<CartAgreementProps> = ({ onClick }) => {
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
      <BasicButton isDisabled={!isAccepted} onClick={onClick}>
        購入する
      </BasicButton>
    </div>
  );
};
export default CartAgreement;

import { FC, useState } from "react";
import InpuCheckbox from "../../ui/InputCheckbox";

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const Cart: FC<Props> = ({ onClick }) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const handleAlert = () => {
    alert("利用規約に同意してください");
  };

  return (
    <div className="accept-block">
      <InpuCheckbox
        state={isAccepted}
        setState={setIsAccepted}
        text="利用規約・個人情報の取り扱いについて同意しますか？"
      />
      {isAccepted && (
        <button className="btn" onClick={onClick}>
          購入する
        </button>
      )}
      {!isAccepted && (
        <button className="btn -disabled" onClick={handleAlert}>
          購入する
        </button>
      )}
    </div>
  );
};
export default Cart;

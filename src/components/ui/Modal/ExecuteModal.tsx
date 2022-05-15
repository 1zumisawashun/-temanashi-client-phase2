import { FC } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import BasicButton from "../BasicButton";
import { scrollTop } from "../../../utilities/utilities";

type Props = {
  message: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExecuteModal: FC<Props> = ({ message, onClick, setToggleModal }) => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const closeModal = () => {
    setToggleModal(false);
    document.body.style.overflow = "";
  };

  const styles = { top: scrollTop() };

  // title
  // content
  // footer

  return (
    <div className="execute-modal">
      <div className="overlay" style={styles}>
        <div className="wrapper -form">
          <p className="message">{message}</p>
          <div className="buttons">
            <BasicButton onClick={onClick}>はい</BasicButton>
            <BasicButton onClick={closeModal}>いいえ</BasicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecuteModal;

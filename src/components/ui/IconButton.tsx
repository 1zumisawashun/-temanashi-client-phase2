import { VFC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

type Props = {
  styleName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CloseButton: VFC<Props> = ({ styleName, onClick }: Props) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

const DeleteButton: VFC<Props> = ({ styleName, onClick }: Props) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
export { CloseButton, DeleteButton };

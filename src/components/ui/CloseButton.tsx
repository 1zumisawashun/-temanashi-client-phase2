import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

type Props = {
  styleName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CloseButton: FC<Props> = ({ styleName, onClick }: Props) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};
export default CloseButton;

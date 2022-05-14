import { FC } from "react";
import Button from "@mui/material/Button";

type Props = {
  content: string;
  styleName?: string;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FlatButton: FC<Props> = ({
  styleName,
  content,
  isDisabled,
  onClick,
}: Props) => {
  return (
    <Button
      variant="contained"
      className={styleName + ` btn -mt10`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {content}
    </Button>
  );
};
export default FlatButton;

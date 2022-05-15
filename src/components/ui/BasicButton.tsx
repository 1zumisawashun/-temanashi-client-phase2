import { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";

type Props = {
  children: ReactNode;
  icon?: SvgIconProps;
  onColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  styleName?: string;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const BasicButton: FC<Props> = ({
  styleName,
  children,
  icon,
  onColor = "primary",
  isDisabled,
  onClick,
}: Props) => {
  return (
    <Button
      variant="contained"
      color={onColor}
      className={styleName + ` btn -mt10`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};
export default BasicButton;

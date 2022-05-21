import { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";

type ButtonProps = {
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
  size?: "small" | "medium" | "large";
  styleName?: string;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const BasicButton: FC<ButtonProps> = ({
  styleName,
  children,
  icon,
  onColor = "primary",
  size = "medium",
  isDisabled,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color={onColor}
      size={size}
      className={styleName + ` btn -mt10`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};
export default BasicButton;

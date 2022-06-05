import { ReactNode } from "react";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";

interface BasicButtonProps {
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
  fullWidth?: boolean;
}

const BasicButton: React.VFC<BasicButtonProps> = ({
  styleName,
  children,
  icon,
  onColor = "primary",
  size = "medium",
  isDisabled,
  onClick,
  fullWidth = false,
}) => {
  return (
    <Button
      variant="contained"
      color={onColor}
      size={size}
      className={styleName + ` btn -mt10`}
      onClick={onClick}
      disabled={isDisabled}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};

export default BasicButton;

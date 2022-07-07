import { ReactNode } from "react";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface BasicButtonProps {
  children: ReactNode;
  icon?: SvgIconProps;
  variant?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  styledName?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
}

const BasicButton: React.VFC<BasicButtonProps> = ({
  styledName,
  children,
  icon,
  type = "button",
  variant = "primary",
  size = "medium",
  isDisabled,
  isLoading,
  onClick,
  fullWidth = false,
}) => {
  return (
    <Button
      variant="contained"
      color={variant}
      size={size}
      type={type}
      className={styledName}
      onClick={onClick}
      disabled={isDisabled}
      fullWidth={fullWidth}
      startIcon={icon}
      sx={{
        marginTop: () => (size === "medium" || fullWidth ? "10px" : "0px"),
        marginBottom: () => (size === "medium" || fullWidth ? "10px" : "0px"),
      }}
    >
      {isLoading && <CircularProgress color="primary" />}
      {children}
    </Button>
  );
};

export default BasicButton;

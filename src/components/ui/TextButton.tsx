import { ReactNode, CSSProperties } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";

type LinkButtonProps = {
  path?: string;
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
  onClick?: () => void;
  styledName?: CSSProperties;
};

/**
 * MUIのLinkコンポーネントの場合iconの追加ができないためButtonを採用
 * 初期カラーを白にするためにvariant = secondaryを当てている
 */
const LinkButton: React.VFC<LinkButtonProps> = ({
  path,
  children,
  icon,
  variant = "secondary",
  onClick,
}) => {
  return (
    <Button
      component={Link}
      to={`${path}`}
      startIcon={icon}
      color={variant}
      size="large"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

/**
 * NavLinkの場合「active」というクラスの付与が可能になる
 * styledNameにお使い方に関してはProgressbarコンポーネントを見た方が良いかもしれない
 */
const NavlinkButton: React.VFC<LinkButtonProps> = ({
  path,
  children,
  icon,
  styledName,
}) => {
  return (
    <Button
      component={NavLink}
      exact
      to={`${path}`}
      startIcon={icon}
      size="large"
      fullWidth
      style={styledName}
    >
      {children}
    </Button>
  );
};

export { LinkButton, NavlinkButton };

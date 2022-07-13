import { ReactNode, CSSProperties } from "react";
import { Link, NavLink } from "react-router-dom";
import MuiButton from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";

type ButtonLinkProps = {
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
export const ButtonLink: React.VFC<ButtonLinkProps> = ({
  path,
  children,
  icon,
  variant = "secondary",
  onClick,
}) => {
  return (
    <MuiButton
      component={Link}
      to={`${path}`}
      startIcon={icon}
      color={variant}
      size="large"
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

/**
 * NavLinkの場合「active」というクラスの付与が可能になる
 * styledNameにお使い方に関してはProgressbarコンポーネントを見た方が良いかもしれない
 */
export const ButtonNavlink: React.VFC<ButtonLinkProps> = ({
  path,
  children,
  icon,
  styledName,
}) => {
  return (
    <MuiButton
      component={NavLink}
      exact
      to={`${path}`}
      startIcon={icon}
      size="large"
      fullWidth
      style={styledName}
    >
      {children}
    </MuiButton>
  );
};

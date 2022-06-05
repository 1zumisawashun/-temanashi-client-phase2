import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";

type LinkButtonProps = {
  path: string;
  children: ReactNode;
  icon?: SvgIconProps;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};
// NOTE:MUIのLinkコンポーネントの場合iconの追加ができないためButtonを採用

const LinkButton: React.VFC<LinkButtonProps> = ({
  path,
  children,
  icon,
  color,
}) => {
  return (
    <Button
      component={Link}
      to={`${path}`}
      startIcon={icon}
      color={color}
      size="large"
    >
      {children}
    </Button>
  );
};

// NOTE:NavLinkの場合activeという選択した・していないの判定が可能
const NavlinkButton: React.VFC<LinkButtonProps> = ({
  path,
  children,
  icon,
}) => {
  return (
    <Button
      component={NavLink}
      exact
      to={`${path}`}
      startIcon={icon}
      size="large"
    >
      {children}
    </Button>
  );
};

export { LinkButton, NavlinkButton };

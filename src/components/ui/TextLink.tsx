import { FC, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";

type Props = {
  path: string;
  children: ReactNode;
  icon?: SvgIconProps;
};
// NOTE:MUIのLinkコンポーネントの場合iconの追加ができないためButtonを採用

const LinkButton: FC<Props> = ({ path, children, icon }: Props) => {
  return (
    <Button component={Link} to={`${path}`} startIcon={icon}>
      {children}
    </Button>
  );
};
const NavlinkButton: FC<Props> = ({ path, children, icon }: Props) => {
  return (
    <Button component={NavLink} exact to={`${path}`} startIcon={icon}>
      {children}
    </Button>
  );
};
export { LinkButton, NavlinkButton };

import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material";

type Props = {
  path: string;
  children: ReactNode;
  icon?: SvgIconProps;
};

const LinkButton: FC<Props> = ({ path, children, icon }: Props) => {
  return (
    <Button component={Link} to={`${path}`} startIcon={icon}>
      {children}
    </Button>
  );
};
export default LinkButton;

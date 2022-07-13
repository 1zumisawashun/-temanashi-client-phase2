import MuiDivider from "@mui/material/Divider";

type DividerProps = {
  variant?: "fullWidth" | "inset" | "middle";
};

/**
 * https://mui.com/material-ui/react-divider/
 * https://mui.com/material-ui/api/divider/
 */
export const Divider: React.VFC<DividerProps> = ({ variant = "middle" }) => {
  return (
    <MuiDivider
      variant={variant}
      sx={{
        marginTop: () => (variant === "middle" ? "10px" : "0px"),
        marginBottom: () => (variant === "middle" ? "10px" : "0px"),
      }}
    />
  );
};

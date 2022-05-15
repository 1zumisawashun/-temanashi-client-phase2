import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#84bcb4",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  // NOTE:https://mui.com/material-ui/api/button/#css
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: "white",
        },
        containedSecondary: {
          color: "#84bcb4",
        },
      },
    },
  },
});

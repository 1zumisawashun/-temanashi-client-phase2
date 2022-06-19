import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/sass/app.scss";
import App from "./router/App";
import {
  AuthContextProvider,
  CartContextProvider,
  RandomContextProvider,
} from "./contexts";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utilities/muiThemeClient";

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <AuthContextProvider>
        <RandomContextProvider>
          <ThemeProvider theme={theme}>
            <CookiesProvider>
              <App />
            </CookiesProvider>
          </ThemeProvider>
        </RandomContextProvider>
      </AuthContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

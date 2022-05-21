import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/sass/app.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
// for connecting user and authIsReady propaties from all components
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./context/ThemeContext";
import { CartContextProvider } from "./context/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

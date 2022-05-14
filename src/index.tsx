import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/sass/app.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
// for connecting user and authIsReady propaties from all components
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

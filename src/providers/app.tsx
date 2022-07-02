import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { ForbiddenError, Loading } from "../components/ui";
import {
  AuthContextProvider,
  CartContextProvider,
  RandomContextProvider,
} from "../contexts";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../utilities/muiThemeClient";

export const ErrorFallback = () => {
  return <ForbiddenError />;
};

export const SuspenseFallback = () => {
  return <Loading />;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.VFC<AppProviderProps> = ({ children }) => {
  return (
    <React.Suspense fallback={SuspenseFallback}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <CartContextProvider>
            <AuthContextProvider>
              <RandomContextProvider>
                <ThemeProvider theme={theme}>
                  <CookiesProvider>
                    <Router>{children}</Router>
                  </CookiesProvider>
                </ThemeProvider>
              </RandomContextProvider>
            </AuthContextProvider>
          </CartContextProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

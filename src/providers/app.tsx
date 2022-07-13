import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ErrorForbidden, Loading } from "../components/ui";
import {
  AuthContextProvider,
  CartContextProvider,
  RandomContextProvider,
} from "../contexts";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../utilities/muiThemeClient";

export const ErrorFallback: React.VFC = () => {
  return <ErrorForbidden />;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.VFC<AppProviderProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<Loading color="blue" />}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HelmetProvider>
            <CartContextProvider>
              <AuthContextProvider>
                <RandomContextProvider>
                  <CookiesProvider>
                    <BrowserRouter>{children}</BrowserRouter>
                  </CookiesProvider>
                </RandomContextProvider>
              </AuthContextProvider>
            </CartContextProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </React.Suspense>
  );
};

import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { lazyImport } from "../utilities";
import { Loading } from "../components/ui";
import styled from "@emotion/styled";

const { Cart } = lazyImport(() => import("../pages"), "Cart");
const { Complete } = lazyImport(() => import("../pages"), "Complete");
const { Create } = lazyImport(() => import("../pages"), "Create");
const { Dashboard } = lazyImport(() => import("../pages"), "Dashboard");
const { Diagnose } = lazyImport(() => import("../pages"), "Diagnose");
const { Error } = lazyImport(() => import("../pages"), "Error");
const { Login } = lazyImport(() => import("../pages"), "Login");
const { Product } = lazyImport(() => import("../pages"), "Product");
const { Signup } = lazyImport(() => import("../pages"), "Signup");
const { User } = lazyImport(() => import("../pages"), "User");

const AppContainer = styled("div")`
  display: flex;
  min-height: 100vh;
`;

export const AppRoute: React.VFC = () => {
  return (
    <AppContainer>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/error">
            <Error />
          </Route>
          <Route path="/complete">
            <Complete />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/diagnose">
            <Diagnose />
          </Route>
          <Route path="/create/product">
            <Create />
          </Route>
          <Route path="/products/:id">
            <Product />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </React.Suspense>
    </AppContainer>
  );
};

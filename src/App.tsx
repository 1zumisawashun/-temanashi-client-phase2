import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Cart,
  Complete,
  Create,
  Dashboard,
  Diagnose,
  Error,
  Login,
  Product,
  Signup,
  User,
} from "./pages";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
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
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

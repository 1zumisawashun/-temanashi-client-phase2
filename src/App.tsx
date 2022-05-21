import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Cart,
  Complete,
  Create,
  Dashboard,
  Diagnose,
  Error,
  Login,
  Privacy,
  Product,
  Signup,
  Terms,
  User,
} from "./pages";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/error">
          <Error />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
        <Route path="/privacy">
          <Privacy />
        </Route>
        <Route path="/complete">
          <Complete />
        </Route>
        <Switch>
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

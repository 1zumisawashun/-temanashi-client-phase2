import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Furniture from "./pages/Product";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import OnlineUsers from "./components/layout/OnlineUsers";
import Diagnose from "./pages/Diagnose";
import Cart from "./pages/Cart";
import Complete from "./pages/Complete";
import Terms from "./pages/Terms";
import Privacy from "./pages/privacy";
import Error from "./pages/Error";
import User from "./pages/User";

const App = () => {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {/* 一度もログインしたことのないユーザー */}
      {!authIsReady && (
        <BrowserRouter>
          <div className="container -auth">
            <Switch>
              <Route exact path="/">
                {!user && !authIsReady && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/login" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/login" />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}

      {/* アクティブユーザーがログアウトした時 */}
      {authIsReady && !user && (
        <BrowserRouter>
          <div className="container -auth">
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/login" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/login" />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}

      {/* アクティブユーザー */}
      {authIsReady && user && (
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
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route exact path="/diagnose">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Diagnose />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/create/product">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/furnitures/:id">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Furniture />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/login">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/signup">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/users/:id">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <User />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/cart">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Cart />}
              </div>
              {user && <OnlineUsers />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;

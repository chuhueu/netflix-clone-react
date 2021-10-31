import React from "react";
import './app.scss';
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Watch from "./pages/watch/Watch";
import Info from "./pages/info/Info";
import Search from "./pages/search/Search";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Edit from "./components/EditProfile/ProfileScreen";
import MyList from "./pages/myList/MyList";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        {/* <Route path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route> */}
        {user && (
          <>
            <Route path="/movies">
              <Home type="movie" />
            </Route>
            <Route path="/series">
              <Home type="series" />
            </Route>
            <Route path="/watch/:watchID" render={(props) => <Watch {...props} /> }>
              <Watch />
            </Route>
            <Route path="/edit">
              <Edit />
            </Route>
            <Route path="/info/:infoID" render={(props) => <Info {...props} />}>
              <Info />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/myList">
              <MyList />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  )
};

export default App;
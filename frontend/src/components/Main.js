import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Allplants from "./Allplants";
import Login from "./Login";
import Signup from "./Signup";
import UserProfile from "./UserProfile";
import CreatePlant from "./CreatePlant";
import ViewPlant from "./ViewPlant";
import UpdateUser from "./UpdateUser";
import UpdatePlant from "./UpdatePlant";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={(props) => <Home {...props} />} />
        <Route
          exact
          path="/signup"
          component={(props) => <Signup {...props} />}
        />
        <Route
          exact
          path="/login"
          component={(props) => <Login {...props} />}
        />
        <Route path="/user" component={(props) => <UserProfile {...props} />} />
        <Route
          path="/users/:userid"
          component={(props) => <UserProfile {...props} />}
        />
        <Route
          path="/update/:userid"
          component={(props) => <UpdateUser {...props} />}
        />
        <Route
          exact
          path="/allplants"
          component={(props) => <Allplants {...props} />}
        />
        <Route
          exact
          path="/addplant"
          component={(props) => <CreatePlant {...props} />}
        />
        <Route
          path="/plants/:plantid"
          component={(props) => <ViewPlant {...props} />}
        />
        <Route
          path="/plantsupdate/:plantid"
          component={(props) => <UpdatePlant {...props} />}
        />
      </Switch>
    </div>
  );
};

export default Main;

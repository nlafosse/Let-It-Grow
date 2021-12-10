import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Signup from "./Signup";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={(props) => <Signup {...props} />} />
      </Switch>
    </div>
  );
};

export default Main;

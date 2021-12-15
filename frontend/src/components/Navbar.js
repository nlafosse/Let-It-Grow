import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { get } from "../http/actions";

const Navbar = () => {
  const logout = () => {
    get("/users/logout")
      .then((results) => {
        console.log("This is our user", results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };
  return (
    <div className="navbar">
      <div>
        <p>
          <Link to="/">Let It Grow</Link>
        </p>
      </div>
      <div>
        {}
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/user">Profile</Link>
        <Link to="/" onClick={logout}>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

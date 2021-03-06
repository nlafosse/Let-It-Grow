import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { get } from "../http/actions";
import { Context } from "../context/LoginContext";

const Navbar = () => {
  const { state, contextlogout } = useContext(Context);

  const logout = () => {
    get("/users/logout")
      .then((results) => {
        console.log("This is our user", results.data);
        contextlogout();
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };
  console.log("this is state", state);

  return (
    <div>
      <div className="navbar">
        <div>
          <p>
            <Link to="/">Let It Grow</Link>
          </p>
        </div>
        <div>
          {!state.isLoggedin ? (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          ) : (
            <div>
              <Link to="/user">Profile</Link>
              <Link to="/" onClick={logout}>
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

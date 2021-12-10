import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <p>
          <Link to="/">Let It Grow</Link>
        </p>
      </div>
      <div>
        <Link to="/users/signup">Sign Up</Link>
        <Link to="/users/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;

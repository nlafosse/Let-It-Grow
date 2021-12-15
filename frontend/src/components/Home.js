import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homeBody">
      <div className="homeButtons">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Home;

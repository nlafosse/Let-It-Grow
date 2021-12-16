import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homeBody">
      <div>
        <h1 style={{ textShadow: "2px 2px 10px #bee8ad" }}>Let It Grow</h1>
        <h6 style={{ textShadow: "2px 2px 10px #bee8ad" }}>
          plant care tracking app
        </h6>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Home;

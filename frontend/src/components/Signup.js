import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [fieldInput, setFieldInput] = useState("");
  return (
    <div className="signupForm">
      <input type="text" value="" placeholder="username" />
      <input type="text" value="" placeholder="password" />
      <button>Sign Up</button>
      <p>
        Already have an account? <Link to="/users/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;

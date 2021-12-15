import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { post } from "../http/actions";

const Signup = () => {
  const [usernameHook, setUsernameHook] = useState("");
  const [passwordHook, setPasswordHook] = useState("");
  const [redirect, setRedirect] = useState(false);

  const registerUser = () => {
    post("/users/sign-up", {
      username: usernameHook,
      password: passwordHook,
    })
      .then((results) => {
        console.log("These are the results", results.data);
        setRedirect(true);
      })
      .catch((err) => {
        console.log("Something went wrong:", err);
      });
  };

  return (
    <div className="signupForm">
      <h1>SIGN IN PAGE</h1>
      <input
        type="text"
        value={usernameHook}
        placeholder="username"
        onChange={(e) => {
          setUsernameHook(e.target.value);
        }}
      />
      <input
        type="password"
        value={passwordHook}
        placeholder="password"
        onChange={(e) => {
          setPasswordHook(e.target.value);
        }}
      />
      <button onClick={registerUser}>Sign Up</button>

      {redirect && <Redirect to="/login" />}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;

import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { get, post } from "../http/actions";
import { Context } from "../context/LoginContext";

const Login = () => {
  const [usernameHook, setUsernameHook] = useState("");
  const [passwordHook, setPasswordHook] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState("");

  const { contextlogin } = useContext(Context);

  const login = () => {
    post("/users/login", {
      username: usernameHook,
      password: passwordHook,
    })
      .then((results) => {
        console.log("These are the results", results.data);
        console.log("Token", results.data.token);
        //Store this in localStorage
        localStorage.setItem("token", results.data.token);
        contextlogin();
        setUserId(results.data.id);
        setRedirect(true);
      })
      .catch((err) => {
        console.log("Something went wrong:", err);
      });
  };
  const loginTest = () => {
    console.log("Attempting to Test log in");
    get("/users/login-test")
      .then((results) => {
        console.log("This is our user", results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <div className="signupFormContainer">
      <div className="signupFormBox">
        <h1 className="titleStyle">Log In</h1>
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
        <button onClick={login}>Log in</button>
        {redirect && <Redirect to={`/users/${userId}`} />}
        {/* <button style={{ color: "blue" }} onClick={loginTest}>
          Test login
        </button> */}
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

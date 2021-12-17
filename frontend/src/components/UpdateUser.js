import React, { useState } from "react";
import { post } from "../http/actions";
import { Redirect } from "react-router-dom";

const UpdateUser = (props) => {
  const [username, setUsername] = useState("");
  const [redirect, setRedirect] = useState(false);

  const update = () => {
    post(`/users/update-user/${props.match.params.userid}`, {
      username: username,
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
    <div className="signupFormContainer">
      <div className="signupFormBox">
        <h1 className="titleStyle">Update Username</h1>
        <form>
          <label>
            <input
              type="test"
              value={username}
              placeholder="new username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
        </form>
        <button onClick={update}>Change username</button>
        {redirect && <Redirect to="/user" />}
      </div>
    </div>
  );
};

export default UpdateUser;

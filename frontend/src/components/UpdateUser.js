import React, { useState } from "react";
import { post } from "../http/actions";

const UpdateUser = (props) => {
  const [username, setUsername] = useState("");
  const update = () => {
    post(`/users/update-user/${props.match.params.userid}`, {
      username: username,
    })
      .then((results) => {
        console.log("These are the results", results.data);
      })
      .catch((err) => {
        console.log("Something went wrong:", err);
      });
  };
  return (
    <div>
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
    </div>
  );
};

export default UpdateUser;

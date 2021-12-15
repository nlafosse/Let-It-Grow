import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../http/actions";
import Weather from "../Weather";

const UserProfile = (props) => {
  console.log("props", props);
  const [username, setUsername] = useState("");

  useEffect(() => {
    get(`/users/${props.match.params.userid}`)
      .then((results) => {
        console.log("RESULTS", results);
        setUsername(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  return (
    <div className="userProfile">
      <h3>{username.username}</h3>
      <div>Show plant alerts </div>
      <Weather />
      <Link to="/allplants">View plants</Link>
      <Link to="/addplant">Add new plant</Link>
      <Link to={`/update/${props.match.params.userid}`}>Update user</Link>
    </div>
  );
};

export default UserProfile;

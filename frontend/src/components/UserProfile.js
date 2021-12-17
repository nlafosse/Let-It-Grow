import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../http/actions";
import Weather from "./Weather";
import Alerts from "./Alerts";

const UserProfile = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    get("/users/user")
      .then((results) => {
        // console.log("RESULTS", results);
        setUser(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  // console.log("user", user);
  return (
    <div className="userProfileContainer">
      <h2 class="titleStyle">Welcome, {user.username}</h2>
      <div class="userProfileLinks">
        <div className="userProfileButtons">
          <Link to="/allplants">View plants</Link>
        </div>
        <div className="userProfileButtons">
          <Link to="/addplant">Add new plant</Link>
        </div>
        <div className="userProfileButtons">
          <Link to={`/update/${user._id}`}>Update user</Link>
        </div>
      </div>
      <div className="weatherAndAlertsContainer">
        <div className="weatherBox">
          <Weather />
        </div>
        <div className="alertsBox">
          <Alerts />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

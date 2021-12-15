import React, { useState, useEffect } from "react";
import { get } from "../http/actions";
import { Link } from "react-router-dom";

const Allplants = () => {
  const [plantsArr, setPlantsArr] = useState([]);

  useEffect(() => {
    get("/plants/all-plants")
      .then((results) => {
        console.log(results);
        setPlantsArr(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);
  console.log(plantsArr);

  return (
    <div>
      <div className="allPlantsHeader">
        <h1>All the plants for this user</h1>
        <Link to="/addplant">Add new plant</Link>
      </div>
      <div className="allPlantsGallery">
        {plantsArr.map((plant) => {
          return (
            <div className="galleryRow">
              <p>{plant.image ? <img src={plant.image} alt="plant" /> : "x"}</p>
              <ul>
                <Link to={`/plants/${plant._id}`}>
                  <li>{plant.name ? plant.name : "_"}</li>
                  <li>{plant.genus ? plant.genus : "_"}</li>
                </Link>
                <li>Planted on: {plant.planted ? plant.planted : "-"}</li>
                <li>Last watered: {plant.watered ? plant.watered : "-"}</li>
                <li>
                  Last fertilized: {plant.fertilized ? plant.fertilized : "-"}
                </li>
                <li>Window: {plant.sunDirection ? plant.sunDirection : "-"}</li>
                <li>notes: {plant.notes ? plant.notes : "-"}</li>
              </ul>
              <div className="updateButton">
                <Link to={`/plantsupdate/${plant._id}`}>Update</Link>
              </div>

              {/* <Link to={`/plants/delete-plant/${plant._id}`}>Delete</Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Allplants;

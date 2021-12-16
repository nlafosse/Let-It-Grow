import React, { useState, useEffect } from "react";
import { get } from "../http/actions";
import { Link } from "react-router-dom";
import zzplaceholder from "../images/zzplaceholder.jpg";

const Allplants = () => {
  const [plantsArr, setPlantsArr] = useState([]);
  const [owner, setOwner] = useState({});

  useEffect(() => {
    get("/plants/all-plants")
      .then((results) => {
        console.log("RESULTS", results);
        setPlantsArr(results.data);
        setOwner(results.data[0].owner);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);
  console.log("plantsArr:", plantsArr);
  console.log("owner hook:", owner);

  return (
    <div>
      <div className="allPlantsHeader">
        <h1 className="titleStyle">{owner.username}'s collection</h1>
        <Link to="/addplant">Add new plant</Link>
      </div>
      <div className="allPlantsGallery">
        {plantsArr.map((plant) => {
          return (
            <div className="galleryRow">
              <div className="galleryPlantTitle">
                <p>
                  {plant.image ? (
                    <img src={plant.image} alt="plant" />
                  ) : (
                    <img src={zzplaceholder} alt="no image placeholder" />
                  )}
                </p>
                <Link to={`/plants/${plant._id}`}>
                  <p>{plant.genus ? plant.genus : "_"}</p>
                  <p>{plant.name ? plant.name : "_"}</p>
                </Link>
              </div>
              <ul>
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

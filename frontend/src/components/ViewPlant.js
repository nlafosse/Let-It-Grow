import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../http/actions";
import zzplaceholder from "../images/zzplaceholder.jpg";

const ViewPlant = (props) => {
  console.log("PROPS", props);
  const [plant, setPlant] = useState("");

  useEffect(() => {
    get(`/plants/${props.match.params.plantid}`)
      .then((results) => {
        console.log("RESULTS", results);
        setPlant(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  console.log("PLANTHOOK", plant);

  return (
    <div className="singlePlantContainer">
      <p className="titleStyle">
        {plant.genus} {plant.name}
      </p>
      <div class="singlePlantLinks">
        {/* <div className="singlePlantButtons">
          <Link to={`/plantsupdate/${props.match.params.plantid}`}>Update</Link>
        </div> */}
        <div className="singlePlantButtons">
          <Link to="/allplants">View plants</Link>
        </div>
      </div>
      <div className="singlePlantBox">
        <div className="singlePlant">
          <span>
            {plant.image ? (
              <img src={plant.image} alt="plant" />
            ) : (
              <img src={zzplaceholder} alt="no image placeholder" />
            )}
          </span>
          <div className="singlePlantDetailsContainer">
            <div className="singlePlantDetails">
              <ul>
                <li>Planted on: {plant.planted ? plant.planted : "-"}</li>
                <li>Last watered: {plant.watered ? plant.watered : "-"}</li>
                <li>
                  Last fertilized: {plant.fertilized ? plant.fertilized : "-"}
                </li>
                <li>Window: {plant.sunDirection ? plant.sunDirection : "-"}</li>
                <li>notes: {plant.notes ? plant.notes : "-"}</li>
              </ul>
            </div>

            <div className="singlePlantUpdateButton">
              <Link to={`/plantsupdate/${props.match.params.plantid}`}>
                Update
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlant;

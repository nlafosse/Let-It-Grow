import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../http/actions";

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
    <div>
      <h1>Single Plant</h1>
      <p>{plant.genus}</p>
      <p>{plant.name}</p>
      <p>Planted on: {plant.planted}</p>
      <p>Last watered: {plant.watered}</p>
      <Link to={`/plantsupdate/${props.match.params.plantid}`}>Update</Link>
      <Link to="/allplants">View plants</Link>
    </div>
  );
};

export default ViewPlant;

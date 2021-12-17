import React, { useState, useEffect } from "react";
import { get } from "../http/actions";
import { Link } from "react-router-dom";

const Alerts = () => {
  const [plantsArr, setPlantsArr] = useState([]);
  var twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  var oneYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

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
  console.log("plants array:", plantsArr);
  console.log("two weeks", twoWeeksAgo);
  console.log("one year", oneYear);

  return (
    <div>
      <div className="plantsAlert">
        <h5 className="titleStyle" style={{ margin: "0", fontSize: "25px" }}>
          Plants in need of attention
        </h5>
        <h6>Not watered in more than 14 days</h6>
        {plantsArr.map((plant) => {
          return (
            <div>
              <p>
                {new Date(plant.watered) < twoWeeksAgo ? (
                  <Link to={`/plants/${plant._id}`}>
                    {plant.genus} {plant.name}
                  </Link>
                ) : null}
              </p>
            </div>
          );
        })}
        <h6>Not fertilized in more than 14 days</h6>
        {plantsArr.map((plant) => {
          return (
            <div>
              <p>
                {new Date(plant.fertilized) < twoWeeksAgo ? (
                  <Link to={`/plants/${plant._id}`}>
                    {plant.genus} {plant.name}
                  </Link>
                ) : null}
              </p>
            </div>
          );
        })}
        <h6>May require repotting</h6>
        {plantsArr.map((plant) => {
          return (
            <div>
              <p>
                {new Date(plant.planted) < oneYear ? (
                  <Link to={`/plants/${plant._id}`}>
                    {plant.genus} {plant.name}
                  </Link>
                ) : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;

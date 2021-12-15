import React, { useState } from "react";
import axios from "axios";
import { apiurl } from "./http/url";

const Weather = () => {
  const [temp, setTemp] = useState({});

  React.useEffect(() => {
    axios
      .get(`${apiurl}&q=33020`)
      .then((info) => {
        setTemp(info.data);
        console.log("temp variable:", temp);
        console.log("location:", temp?.location);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  return (
    <div>
      Weather
      <p>
        {temp.location?.name}, {temp.location?.region}
      </p>
      <p>
        currently {temp.current?.temp_f}° {temp.current?.condition.text}
      </p>
      <p>humidity {temp.current?.humidity}%</p>
    </div>
  );
};

export default Weather;

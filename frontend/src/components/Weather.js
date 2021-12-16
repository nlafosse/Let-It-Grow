import React, { useState } from "react";
import axios from "axios";
import { apiurl, ipurl } from "../http/url";

const Weather = () => {
  const [temp, setTemp] = useState({});

  React.useEffect(() => {
    axios
      .get(`${ipurl}`)
      .then((info) => {
        console.log("ip hook", info.data.location.postalCode);

        axios
          .get(`${apiurl}${info.data.location.postalCode}`)
          .then((info) => {
            setTemp(info.data);
            console.log("temp variable:", temp);
            console.log("location:", temp.location);
          })
          .catch((err) => {
            console.log("Something went wrong", err);
          });
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  return (
    <div>
      <p>
        {temp.location?.name}, {temp.location?.region}
      </p>
      <img src={temp.current?.condition.icon} />
      <div>
        {temp.current?.temp_f}° {temp.current?.condition.text}
        <p>{temp.current?.humidity}% humidity</p>
      </div>
    </div>
  );
};

export default Weather;

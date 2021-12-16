import React, { useState, useEffect } from "react";
import { post, remove, get } from "../http/actions";

const UpdatePlant = (props) => {
  const [name, setName] = useState("");
  const [genus, setGenus] = useState("");
  const [planted, setPlanted] = useState("");
  const [watered, setWatered] = useState("");
  const [fertilized, setFertilized] = useState("");
  const [direction, setDirection] = useState("");
  const [notes, setNotes] = useState("");
  //hook for the plant name for title
  const [plant, setPlant] = useState("");

  const updatePlant = () => {
    let obj = {
      name: name,
      genus: genus,
      planted: planted,
      watered: watered,
      fertilized: fertilized,
      sunDirection: direction,
      notes: notes,
    };

    //CONDITIONAL TO ENSURE ONLY INPUT FIELDS FILLED GET UPDATED, AND EMPTY FIELDS KEEP DATA ALREADY STORED IN DB
    for (let x in obj) {
      if (!obj[x]) {
        delete obj[x];
      }
    }

    post(`/plants/update-plant/${props.match.params.plantid}`, { ...obj })
      .then((results) => {
        console.log("These are the results", results.data);

        // setRedirect(true);
      })
      .catch((err) => {
        console.log("Something went wrong:", err);
      });
  };
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

  const deletePlant = () => {
    console.log("Attempting to delete");
    remove(`/plants/delete-plant/${props.match.params.plantid}`)
      .then((results) => {
        console.log("deleted plant", results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <div className="updateContainer">
      <div className="updateForm">
        <h1>
          Update {plant.genus} {plant.name}
        </h1>
        <label for="genus">Genus:</label>
        <input
          id="genus"
          type="text"
          value={genus}
          onChange={(e) => {
            setGenus(e.target.value);
          }}
        />
        <br></br>
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br></br>
        <label for="planted">Planted on:</label>
        <input
          id="planted"
          type="date"
          value={planted}
          onChange={(e) => {
            setPlanted(e.target.value);
          }}
        />
        <br></br>
        <label for="water">Last watered on:</label>
        <input
          id="water"
          type="date"
          value={watered}
          onChange={(e) => {
            setWatered(e.target.value);
          }}
        />
        <br></br>
        <label for="fertilized">Last fertilized on:</label>
        <input
          id="fertilized"
          type="date"
          value={fertilized}
          onChange={(e) => {
            setFertilized(e.target.value);
          }}
        />
        <br></br>
        <label for="direction">Window direction:</label>
        <input
          id="direction"
          type="text"
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value);
          }}
        />
        <br></br>
        <label for="notes">Notes:</label>
        <input
          id="notes"
          type="text"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />
        <br></br>
        <button onClick={updatePlant}>Update</button>
        <button onClick={deletePlant}>DELETE</button>
      </div>
    </div>
  );
};
export default UpdatePlant;

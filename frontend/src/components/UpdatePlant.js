import React, { useState } from "react";
import { post, remove } from "../http/actions";

const UpdatePlant = (props) => {
  const [name, setName] = useState("");
  const [genus, setGenus] = useState("");
  const [planted, setPlanted] = useState("");
  const [watered, setWatered] = useState("");
  const [fertilized, setFertilized] = useState("");
  const [direction, setDirection] = useState("");
  const [notes, setNotes] = useState("");

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
    for (let x in obj) {
      // console.log(Object.value(x))
      if (!obj[x]) {
        //  console.log(“f,x)
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
    <div>
      <h1>Update or Delete plant here</h1>
      <input
        type="text"
        value={genus}
        placeholder="genus"
        onChange={(e) => {
          setGenus(e.target.value);
        }}
      />
      <input
        type="text"
        value={name}
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="date"
        value={planted}
        placeholder="planted on"
        onChange={(e) => {
          setPlanted(e.target.value);
        }}
      />
      <input
        type="date"
        value={watered}
        placeholder="last watered on"
        onChange={(e) => {
          setWatered(e.target.value);
        }}
      />
      <input
        type="date"
        value={fertilized}
        placeholder="last time fertilized"
        onChange={(e) => {
          setFertilized(e.target.value);
        }}
      />
      <input
        type="text"
        value={direction}
        placeholder="near window facing"
        onChange={(e) => {
          setDirection(e.target.value);
        }}
      />
      <input
        type="text"
        value={notes}
        placeholder="notes"
        onChange={(e) => {
          setNotes(e.target.value);
        }}
      />
      <button onClick={updatePlant}>Update</button>
      <button onClick={deletePlant}>DELETE</button>
    </div>
  );
};
export default UpdatePlant;

import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { post } from "../http/actions";
import axios from "axios";

const CreatePlant = () => {
  const [name, setName] = useState("");
  const [genus, setGenus] = useState("");
  const [planted, setPlanted] = useState("");
  const [watered, setWatered] = useState("");
  const [fertilized, setFertilized] = useState("");
  const [direction, setDirection] = useState("");
  const [notes, setNotes] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [plantId, setPlantId] = useState("");
  const [image, setImage] = useState(null);

  const createPlant = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "r691fonf");
    //UPLOAD_PRESET is found in your cloudinary account settings. Make sure it's 'unsigned'
    //CLOUD_NAME comes from youir cloudinary account
    axios
      .post("https://api.cloudinary.com/v1_1/deorw3ces/upload", formData)
      .then((results) => {
        setImage(results.data.url);
        post("/plants/add-plant", {
          name: name,
          genus: genus,
          planted: planted,
          watered: watered,
          fertilized: fertilized,
          sunDirection: direction,
          notes: notes,
          image: results.data.url,
        })
          .then((results) => {
            console.log("These are the results", results.data);
            setPlantId(results.data._id);
            setRedirect(true);
          })
          .catch((err) => {
            console.log("Something went wrong:", err);
          });

        //results.data.url should be the url for the newly updated photo
        //Once the image has uploaded, add the url to the backend
        // post('/route', actions)
        //   .then((results) => {
        //     console.log('results', results);
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  return (
    <div>
      <Link to="/allplants">View plants</Link>
      <h1>Add Plant</h1>
      <form
        method="post"
        type="file"
        encType="multipart/form-data"
        onSubmit={createPlant}
        name="TESTING"
      >
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
        <label for="img">Select image:</label>
        {/* This is the input for uploading a file */}
        <input
          //This is a file upload
          type="file"
          name="test-image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files)}
          //don't set value of the hook
        />
        <button onClick={createPlant}>Add</button>
        {redirect && <Redirect to={`/plants/${plantId}`} />}
      </form>
    </div>
  );
};
export default CreatePlant;

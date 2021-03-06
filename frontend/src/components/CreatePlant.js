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

    if (image) {
      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append("upload_preset", "r691fonf");
      axios
        .post("https://api.cloudinary.com/v1_1/deorw3ces/upload", formData)
        .then((results) => {
          setImage(results.data.url);
          console.log("image after cloudinary .post", image);
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
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    } else {
      post("/plants/add-plant", {
        name: name,
        genus: genus,
        planted: planted,
        watered: watered,
        fertilized: fertilized,
        sunDirection: direction,
        notes: notes,
      })
        .then((results) => {
          console.log("These are the results", results.data);
          setPlantId(results.data._id);
          setRedirect(true);
        })
        .catch((err) => {
          console.log("Something went wrong:", err);
        });
    }
  };

  return (
    <div className="singlePlantContainer">
      <h1 className="titleStyle">Add Plant</h1>
      <div class="singlePlantLinks">
        <div className="singlePlantButtons">
          <Link to="/allplants">View plants gallery</Link>
        </div>
      </div>
      <div className="createContainer">
        <div className="createForm">
          <form method="post" type="file" encType="multipart/form-data">
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
              type="text"
              value={name}
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br></br>
            <label for="planted">Planted on:</label>
            <input
              type="date"
              value={planted}
              id="planted"
              onChange={(e) => {
                setPlanted(e.target.value);
              }}
            />
            <br></br>
            <label for="water">Last watered on:</label>
            <input
              type="date"
              value={watered}
              id="water"
              onChange={(e) => {
                setWatered(e.target.value);
              }}
            />
            <br></br>
            <label for="fertilized">Last fertilized on:</label>
            <input
              type="date"
              value={fertilized}
              id="fertilized"
              onChange={(e) => {
                setFertilized(e.target.value);
              }}
            />
            <br></br>
            <label for="direction">Window direction:</label>
            <input
              type="text"
              value={direction}
              id="direction"
              onChange={(e) => {
                setDirection(e.target.value);
              }}
            />
            <br></br>
            <label for="notes">Notes:</label>
            <br></br>
            <textarea
              id="notesw3review"
              rows="4"
              cols="50"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            >
              textbox
            </textarea>
            <br></br>
            <label for="img">Select image:</label>
            <input
              type="file"
              name="test-image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files)}
            />
            <br></br>
            <button onClick={createPlant}>Add New Plant</button>
            {redirect && <Redirect to={`/plants/${plantId}`} />}
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePlant;

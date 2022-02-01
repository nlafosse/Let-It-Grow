import React, { useState, useEffect } from "react";
import { post, remove, get } from "../http/actions";
import { Redirect } from "react-router-dom";
import axios from "axios";

const UpdatePlant = (props) => {
  const [name, setName] = useState("");
  const [genus, setGenus] = useState("");
  const [planted, setPlanted] = useState("");
  const [watered, setWatered] = useState("");
  const [fertilized, setFertilized] = useState("");
  const [direction, setDirection] = useState("");
  const [notes, setNotes] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [plant, setPlant] = useState("");
  const [image, setImage] = useState("");

  const updatePlant = (e) => {
    console.log("e", e);
    e.preventDefault();
    let obj = {
      name: name,
      genus: genus,
      planted: planted,
      watered: watered,
      fertilized: fertilized,
      sunDirection: direction,
      notes: notes,
      image: image,
    };
    //CONDITIONAL TO ENSURE ONLY INPUT FIELDS FILLED GET UPDATED, AND EMPTY FIELDS KEEP DATA ALREADY STORED IN DB
    for (let x in obj) {
      if (!obj[x]) {
        delete obj[x];
      }
    }
    console.log("OBJ", obj);

    if (image) {
      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append("upload_preset", "r691fonf");
      axios
        .post("https://api.cloudinary.com/v1_1/deorw3ces/upload", formData)
        .then((results) => {
          setImage(results.data.url);
          obj.image = results.data.url;
          post(`/plants/update-plant/${props.match.params.plantid}`, { ...obj })
            .then(() => {
              setRedirect(true);
            })
            .catch((err) => {
              console.log("Something went wrong:", err);
            });
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    } else {
      console.log("else props", props.match.params.plantid);
      post(`/plants/update-plant/${props.match.params.plantid}`, { ...obj })
        .then((results) => {
          setRedirect(true);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    }
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
  }, [props.match.params.plantid]);

  const deletePlant = () => {
    console.log("Attempting to delete");
    remove(`/plants/delete-plant/${props.match.params.plantid}`)
      .then((results) => {
        console.log("deleted plant", results.data);
        setRedirect(true);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <div>
      <h1 className="titleStyle">
        Update {plant.genus} {plant.name}
      </h1>
      <div className="updateContainer">
        <div className="updateForm">
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
            <br></br>
            <button onClick={updatePlant}>Update</button>
            {redirect && (
              <Redirect to={`/plants/${props.match.params.plantid}`} />
            )}
          </form>

          <button onClick={deletePlant}>DELETE</button>
          {redirect && <Redirect to="/allplants" />}
        </div>
      </div>
    </div>
  );
};
export default UpdatePlant;

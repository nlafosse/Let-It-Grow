var express = require("express");
var router = express.Router();
const Plant = require("../models/Plant");
const auth = require("../middleware/auth");

router.post("/add-plant", auth, (req, res, next) => {
  console.log("New plant added:", req.body);

  const plantToCreate = new Plant({
    name: req.body.name,
    genus: req.body.genus,
    planted: req.body.planted,
    watered: req.body.watered,
    fertilized: req.body.fertilized,
    sunDirection: req.body.sunDirection,
    notes: req.body.notes,
    owner: req.user.id,
    image: req.body.image,
  });

  Plant.create(plantToCreate)
    .then((results) => {
      console.log("results", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("ERROR:", err);
      res.json(err);
    });
});

//GET all plants
router.get("/all-plants", auth, (req, res) => {
  Plant.find({ owner: req.user.id })
    .populate("owner")
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.json({ error: err.message });
    });
});

//GET one plant
router.get("/:plantid", auth, (req, res) => {
  Plant.findOne({ _id: req.params.plantid })
    .then((results) => {
      console.log("PLANT", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

//UPDATE
//First argument is the object we're searching for
//Second, what we will be updating
router.post("/update-plant/:plantid", auth, (req, res) => {
  Plant.findByIdAndUpdate(req.params.plantid, { ...req.body })
    // .WHERE() CHECKS IF ID IN TOKEN MATCHES THE ID OF PLANT
    .where("owner", req.user.id)
    .then((updateddata) => {
      console.log("Update successful: ", updateddata);
      res.json(updateddata);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
});

// ROUTE DOUBLE CHECKS IF PLANT OWNER ID MATCHES THE USER ID IN TOKEN
// LINE 49 WITH .WHERE() DOES ALL THIS FOR US
// router.post("/update-plant/:plantid", auth, function (req, res, next) {
//   Plant.findByIdAndUpdate(req.params.plantid, { ...req.body })
//     .then((updateddata) => {
//       if (updateddata.owner._id == req.user.id) {
//         updateddata
//           .save()
//           .then((results) => {
//             console.log("plant was updated", results);
//             res.json(results);
//           })
//           .catch((err) => {
//             console.log("Something went wrong", err);
//             res.json(err);
//           });
//       } else {
//         console.log(req.user.id);
//         res.json({ message: "You cannot update this" });
//       }
//     })
//     .catch((err) => {
//       console.log("ERROR:", err);
//       res.json(err);
//     });
// });

//DELETE
router.delete("/delete-plant/:plantid", auth, (req, res) => {
  Plant.findByIdAndRemove(req.params.plantid)
    .where("owner", req.user.id)
    .then((updateddata) => {
      console.log("Plant was deleted", updateddata);
      res.json({ message: "plant has been deleted" });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
});

module.exports = router;

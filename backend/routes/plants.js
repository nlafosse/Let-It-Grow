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
    owner: req.body.owner,
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

router.get("/all-plants", auth, (req, res) => {
  Plant.find()
    .populate("owner")
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.json({ error: err.message });
    });
});

//UPDATE
//First argument is the object we're searching for
//Second, what we will be updating
router.post("/update-plant/:plantid", auth, (req, res) => {
  Plant.findByIdAndUpdate(req.params.plantid, { ...req.body })
    .then((updateddata) => {
      console.log("Update successful: ", updateddata);
      res.json(updateddata);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
});

// Pet.updateMany({ age: 11 }, { age: 6 })
//   .then((res) => {
//     console.log('Update successful: ', res);
//   })
//   .catch((err) => {
//     console.log('Something went wrong: ', err);
//   });

//Example: find all animals and increment by one
// Pet.updateMany({}, { $inc: { age: 1 } })
//   .then((res) => {
//     console.log('Update successful: ', res);
//   })
//   .catch((err) => {
//     console.log('Something went wrong: ', err);
//   });

// Pet.updateOne({ name: 'NewCat' }, { name: 'Mittens' })
//   .then((res) => {
//     console.log('Update successful: ', res);
//   })
//   .catch((err) => {
//     console.log('Something went wrong: ', err);
//   });

//DELETE

router.delete("/delete-plant/:plantid", auth, (req, res) => {
  Plant.findByIdAndRemove(req.params.plantid)
    .then((updateddata) => {
      console.log("Plant was deleted", updateddata);
      res.json({ message: "plant has been deleted" });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
});

// Pet.deleteMany({ key: value })
//   .then((res) => {
//     console.log('Pet was deleted', res);
//   })
//   .catch((error) => {
//     console.log('Something went wrong', err);
//   });

// Plant.deleteOne()
//   .then((res) => {
//     console.log("Plant was deleted", res);
//   })
//   .catch((error) => {
//     console.log("Something went wrong", err);
//   });

module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  genus: String,
  planted: String,
  watered: String,
  fertilized: String,

  sunDirection: String,

  notes: String,

  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  image: String,

  time: {
    type: Date,
    default: Date.now,
  },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;

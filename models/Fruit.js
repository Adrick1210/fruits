// Import Dependencies and Connection
const mongoose = require("./connections");

// Fruits Model - destructure Schema and modal in variables
const { Schema, model } = mongoose;

// Schema - shape of the Data
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
  username: String,
});
// Modal - object for interacting with the db
const Fruit = model("Fruit", fruitsSchema);

// Export
module.exports = Fruit;

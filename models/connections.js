// DEPENDENCIES
require("dotenv").config();
const mongoose = require("mongoose");

// CONNECTION
// grab url
const DATABASE_URL = process.env.DATABASE_URL;

// Connect
mongoose.connect(DATABASE_URL);

// Events
mongoose.connection
  .on("error", (error) => {
    console.log(error);
  })
  .on("open", () => {
    console.log("connected to mongo");
  })
  .on("close", () => {
    console.log("Disconnected from mongo");
  });

// Export
module.exports = mongoose; 

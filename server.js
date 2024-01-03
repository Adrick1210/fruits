// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

// Database connection
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.on("open", () => console.log("connected to mongo"));
mongoose.connection.on("close", () => console.log("Disconnected from mongo"));

// Fruits Model - destructure Schema and modal in variables
const {Schema, model} = mongoose;

// Schema - shape of the Data
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
});
// Modal - object for interacting with the db
const Fruit = model("Fruit", fruitsSchema);

// App object
const app = express();

// MIDDLE WARE
app.use(morgan("dev")); // logger
app.use(express.urlencoded({ extended: true })); // parse url encoded bodies
app.use(methodOverride("_method")); // override form submissions
app.use(express.static("public")); // serve files from public statically

// ROUTES

// LISTENER

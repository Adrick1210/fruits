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
const { Schema, model } = mongoose;

// Schema - shape of the Data
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
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
// Test
app.get("/", (req, res) => {
  res.send("your server is running");
});

// Seed
app.get("/fruits/seed", async (req, res) => {
  try {
    // array of starter fruits
    const startFruits = [
      { name: "Orange", color: "orange", readyToEat: false },
      { name: "Grape", color: "purple", readyToEat: false },
      { name: "Banana", color: "orange", readyToEat: false },
      { name: "Strawberry", color: "red", readyToEat: false },
      { name: "Coconut", color: "brown", readyToEat: false },
    ];
    // delete all Fruits
    await Fruit.deleteMany({});

    // Seed my starter fruits
    const fruits = await Fruit.create(startFruits);

    // send fruits as response
    res.json(fruits);
  } catch (error) {
    console.log(error.message);
    res.send("There was a error, read logs for error details");
  }
});

// Index
app.get("/fruits", async (req, res) => {
  try {
    const fruits = await Fruit.find({});
    res.render("fruits/index.ejs", { fruits });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// NEW
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// CREATE
app.post("/fruits", async (req,res) => {
  try {
    // check if readyToEat should be true
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    // create fruit in the database
    await Fruit.create(req.body);
    // redirect back to main page
    res.redirect("/fruits")
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
})
// Show
app.get("/fruits/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const fruit = await Fruit.findById(id);
    res.render("fruits/show.ejs", { fruit });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

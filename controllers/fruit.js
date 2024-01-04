// DEPENDENCIES
const express = require("express");
const Fruit = require("../models/Fruit");

// Router
const router = express.Router();

// MIDDLE WARE
router.use((req, res, next) => {
  console.table(req.session);

  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

// Routes
// Seed
router.get("/seed", async (req, res) => {
  try {
    // send fruits as response
    res.json(fruits);
  } catch (error) {
    console.log(error.message);
    res.send("There was a error, read logs for error details");
  }
});

// Index
router.get("/", async (req, res) => {
  try {
    const fruits = await Fruit.find({});
    res.render("fruits/index.ejs", { fruits });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// NEW
router.get("/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// CREATE
router.post("/", async (req, res) => {
  try {
    // check if readyToEat should be true
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // create fruit in the database
    await Fruit.create(req.body);
    // redirect back to main page
    res.redirect("/fruits");
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Edit
router.get("/:id/edit", async (req, res) => {
  try {
    // get the id
    const id = req.params.id;
    // get fruit
    const fruit = await Fruit.findById(id);
    // render
    res.render("fruits/edit.ejs", { fruit });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    // get id
    const id = req.params.id;
    // update readyToEat
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // update the fruit
    await Fruit.findByIdAndUpdate(id, req.body);
    // redirect to show page
    res.redirect(`/fruits/${id}`);
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  //id
  const id = req.params.id;
  // delete the fruit
  await Fruit.findByIdAndDelete(id);
  // redirect
  res.redirect("/fruits");
});

// Show
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const fruit = await Fruit.findById(id);
    res.render("fruits/show.ejs", { fruit });
  } catch (error) {
    console.log("-----", error.message, "-----");
    res.status(400).send("error, read logs for error details");
  }
});

// Export
module.exports = router;

// DEPENDENCIES
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Router
const router = express.Router();

// Routes

// Sign Up Page (GET -> /user/signup -> form)
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

// Sign Up Submit (POST -> /user/signup -> create user)
router.post("/signup", async (req, res) => {
  try {
    // encrypt the password
    req.body.password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    console.log("Hashed Password:", req.body.password);
    //create the user
    await User.create(req.body);
    res.redirect("/user/login");
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
});

// Login Page (GET -> /user/login -> form)
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

// Login Submit (POST -> /user/login -> login the user)
router.post("/login", async (req, res) => {
  try {
    // get the username and password from req.body
    const { username, password } = req.body;
    // search the database for the user
    const user = await User.findOne({ username });
    // check if user exists
    if (!user) {
      throw new Error("User Error: User Doesn't Exist");
    }
    // check if password matches
    const result = await bcrypt.compare(password, user.password);
    // check the result of the match
    if (!result) {
      throw new Error("User Error: Password Doesn't Match");
    }
    // send back to fruits
    res.redirect("/fruits");
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
});

// Logout (??? -> destroy the session)
router.get("/logout", async (req, res) => {
  res.send("logout");
});

// Export
module.exports = router;

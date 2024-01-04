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
  res.send("login");
});

// Logout (??? -> destroy the session)
router.get("/logout", async (req, res) => {
  res.send("logout");
});

// Export
module.exports = router;

// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();

// Database connection
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.on("open", () => console.log("connected to mongo"));
mongoose.connection.on("close", () => console.log("Disconnected from mongo"));

// MIDDLE WARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));

// ROUTES

// LISTENER

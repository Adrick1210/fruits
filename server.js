// DEPENDENCIES
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();

// MIDDLE WARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));

// ROUTES

// LISTENER

// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

function registerGlobalMiddleware(app) {
  // NORMAL MIDDLE WARE
  app.use(morgan("dev")); // logger
  app.use(express.urlencoded({ extended: true })); // parse url encoded bodies
  app.use(methodOverride("_method")); // override form submissions
  app.use(express.static("public")); // serve files from public statically
  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );
}

module.exports = registerGlobalMiddleware;

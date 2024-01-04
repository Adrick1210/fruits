// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const FruitController = require("./controllers/fruit");
const UserController = require("./controllers/user");

// App object
const app = express();

// MIDDLE WARE
app.use(morgan("dev")); // logger
app.use(express.urlencoded({ extended: true })); // parse url encoded bodies
app.use(methodOverride("_method")); // override form submissions
app.use(express.static("public")); // serve files from public statically
app.use("/fruits", FruitController); // router for fruits data
app.use("/user", UserController); // router for user data

// ROUTES
// Test
app.get("/", (req, res) => {
  res.send("your server is running");
});

// LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//DEPENDENCIES
require("dotenv").config();
const express = require("express");
const registerGlobalMiddleware = require("./utils/middleware.js");
const registerRouters = require("./utils/routers.js")

// App object
const app = express();

//MIDDLEWARE
registerGlobalMiddleware(app);
registerRouters(app);

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

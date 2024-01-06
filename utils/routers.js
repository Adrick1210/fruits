const FruitController = require("../controllers/fruit");
const UserController = require("../controllers/user");

function registerRouters(app) {
    // Routers
  app.use("/fruits", FruitController); // router for fruits data
  app.use("/user", UserController); // router for user data
}

module.exports = registerRouters
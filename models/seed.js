// DEPENDENCIES
const mongoose = require("./connections");
const Fruit = require("./Fruit");

// SEED
mongoose.connection.on("open", async () => {
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
    const data = await Fruit.create(startFruits);

    //log the create fruits
    console.log("--------FRUITS CREATED----------");
    console.log(data);
    console.log("--------FRUITS CREATED----------");

    // close the DB connection
    mongoose.connection.close();
  } catch (error) {
    console.log("-------", error.message, "-----------");
  }
});

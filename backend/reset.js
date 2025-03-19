const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/MealPlannerDB")
  .then(async () => {
    const db = mongoose.connection.db;
    try {
      await db.collection("users").dropIndex("userId_1");
      console.log("Dropped userId unique index.");
    } catch (err) {
      console.error("Index might not exist or another error occurred:", err);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

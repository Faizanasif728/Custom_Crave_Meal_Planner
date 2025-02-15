const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://faizan:faizan880@cluster0.l012v.mongodb.net/MealPlannerDB"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Stop the app on failure
  }
};

module.exports = connectDB;

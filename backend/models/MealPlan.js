const mongoose = require("mongoose");

const mealPlannerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Linking to Users
  weightGoal: {
    type: String,
    enum: ["Weight Gain", "Weight Loss"],
    required: true,
  },
  mealType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
    required: true,
  },
  // duration: { type: Number, required: true }, // Number of days for the plan
  dietaryType: {
    // <-- Fixed the key to match Recipe schema
    type: String,
    enum: ["Keto", "Veg", "Non-Veg", "Vegan", "Mediterranean"],
    required: true,
  },
  generatedMeals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }], // One-to-Many relation
  createdAt: { type: Date, default: Date.now },
});

const MealPlanner = mongoose.model("MealPlanner", mealPlannerSchema);
module.exports = MealPlanner;

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  instructions: { type: String, required: true },
  calories: { type: String, required: true },
  nutrients: { type: String, required: true },
  ingredients: { type: String, required: true },
  preparationTime: { type: String, required: true },
  mealType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
    required: true,
  },
  dietaryType: {
    type: String,
    enum: ["Keto", "Veg", "Non-Veg", "Vegan", "Mediterranean"],
    required: true,
  },
  weightGoal: {
    type: String,
    enum: ["Weight Gain", "Weight Loss"],
    required: true,
  },
  mealImageUrl: { type: String, required: true },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    recipeName: { type: String, required: true }, // Name of the recipe
    instructions: { type: [String], required: true }, // Array of instructions
    calories: { type: Number, required: true }, // Calories per serving
    nutrients: { type: String, required: true }, // Nutritional information
    ingredients: { type: [String], required: true }, // List of ingredients
    preparationTime: { type: Number, required: true }, // Time in minutes
    mealType: { type: String, required: true }, // e.g., Breakfast, Lunch, Dinner
    dietaryType: { type: String, required: true }, // e.g., Keto, Vegan, etc.
    weightGoal: { type: String, required: true }, // e.g., Weight Loss, Weight Gain
    mealImageURL: { type: String, required: true }, // Cloudinary or other image URL
  },

  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);

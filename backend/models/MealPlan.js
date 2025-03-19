const mongoose = require("mongoose");

const MealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    noOfDays: {
      type: Number,
      required: true,
      min: 1, // Ensure at least a 1-day meal plan
      max: 7, // Optional limit for long meal plans
    },

    weightGoal: {
      type: String,
      required: true,
      enum: ["Weight Loss", "Weight Gain"],
    },

    mealType: {
      type: [String],
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
    },

    dietaryType: {
      type: String,
      required: true,
      enum: ["Keto", "Vegan", "Vegetarian", "Non-Vegetarian", "Mediterranean"],
    },

    mealPlans: [
      {
        day: { type: Number, required: true }, // Day number (e.g., Day 1, Day 2)
        totalCalories: { type: Number, required: true, default: 0 },
        recipes: [
          {
            recipeId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Recipe",
              required: true,
            },
            recipeName: { type: String, required: true },
            mealImageURL: { type: String, required: true },
            preparationTime: { type: Number, required: true },
            calories: { type: Number, required: true },
            mealType: { type: String, required: true },
            servings: { type: Number, required: true, default: 1 },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MealPlan", MealPlanSchema);

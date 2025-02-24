const MealPlan = require("../models/MealPlan");
const Recipe = require("../models/Recipes");

// GENERATE MEAL PLAN
const generateMealPlan = async (req, res) => {
  try {
    console.log("🔹 Meal Plan Request Received:", req.body);

    const userId = req.user ? req.user.id : null; // Ensure userId is available
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("🔹 Extracted User ID:", userId);

    const { weightGoal, mealType, dietaryType } = req.body;

    // Find recipes matching the given criteria
    const recipes = await Recipe.find({ weightGoal, mealType, dietaryType });

    if (!recipes.length) {
      return res.status(404).json({ message: "No matching recipes found" });
    }

    // Create meal plan entry
    const newMealPlan = new MealPlan({
      userId, // ✅ Now including userId in the meal plan
      weightGoal,
      mealType,
      dietaryType,
      generatedMeals: recipes.map((recipe) => recipe._id),
    });

    await newMealPlan.save();
    console.log("✅ Meal Plan Created Successfully:", newMealPlan);

    res.status(201).json(newMealPlan);
  } catch (error) {
    console.error("❌ Error Generating Meal Plan:", error);
    res.status(500).json({ message: "Error generating meal plan", error });
  }
};

module.exports = { generateMealPlan };

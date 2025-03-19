const Recipe = require("../models/Recipes");

// Create a New Recipe
const createRecipe = async (req, res) => {
  try {
    console.log("Incoming Recipe Data:", req.body);

    const {
      recipeName,
      weightGoal,
      mealType,
      dietaryType,
      mealImageURL,
      preparationTime,
      calories,
    } = req.body;

    if (
      !recipeName ||
      !weightGoal ||
      !mealType ||
      !dietaryType ||
      !preparationTime ||
      !calories
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newRecipe = new Recipe({
      recipeName,
      weightGoal,
      mealType,
      dietaryType,
      mealImageURL,
      preparationTime,
      calories,
    });

    await newRecipe.save();
    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error("Error Creating Recipe:", error);
    res.status(500).json({
      success: false,
      message: "Error creating recipe",
      error: error.message,
    });
  }
};

// Get All Recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.error("Error Fetching Recipes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recipes",
      error: error.message,
    });
  }
};

// Get a Recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({ success: true, recipe });
  } catch (error) {
    console.error("Error Fetching Recipe by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recipe",
      error: error.message,
    });
  }
};

// Update a Recipe
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedRecipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error Updating Recipe:", error);
    res.status(500).json({
      success: false,
      message: "Error updating recipe",
      error: error.message,
    });
  }
};

// Delete a Recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error Deleting Recipe:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting recipe",
      error: error.message,
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};

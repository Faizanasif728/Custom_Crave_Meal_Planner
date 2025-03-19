const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  // getRecipeById,
  // updateRecipe,
  // deleteRecipe,
} = require("../controllers/recipeController");

const router = express.Router();
router.get("/all", getAllRecipes); // Get All Recipes
router.post("/create", createRecipe); // Create Recipe

// router.get("/:id", getRecipeById); // Get Recipe by ID
// router.put("/:id", updateRecipe); // Update Recipe
// router.delete("/:id", deleteRecipe); // Delete Recipe

module.exports = router;

const express = require("express");
const router = express.Router();
const { generateMealPlan } = require("../controllers/mealplanController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to generate a meal plan (now requires authentication)
router.post("/generate", authMiddleware, generateMealPlan);

module.exports = router;

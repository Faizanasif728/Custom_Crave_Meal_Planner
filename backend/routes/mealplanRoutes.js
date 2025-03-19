const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");
const {
  generateMealPlan,
  // getAllMealPlans,
  // deleteMealPlan,
} = require("../controllers/mealplanController");
const router = express.Router();

router.post("/generate", authenticateUser, generateMealPlan);
// router.get("/all", getAllMealPlans);
// router.delete("/:mealPlanId", deleteMealPlan);

module.exports = router;

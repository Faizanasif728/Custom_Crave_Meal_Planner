const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getFeedbacks,
} = require("../controllers/feedbackController");
const middleware = require("../middleware/authMiddleware");
// Submit feedback
router.post("/submit", middleware, submitFeedback);

// Get all feedbacks (for admin)
router.get("/all", middleware, getFeedbacks);

module.exports = router;

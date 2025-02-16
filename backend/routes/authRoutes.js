const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authController");
const middleware = require("../middleware/authMiddleware");

// User login
router.post("/login", login);

// User logout
router.post("/logout", middleware, logout);

module.exports = router;

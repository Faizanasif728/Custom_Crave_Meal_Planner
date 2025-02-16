const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");

// (C) Create user
router.post("/create-user", createUser);

// (R) Get user profile by username or email
router.get("/get-profile", getUserProfile);

// (U) Update user profile by username and current password
router.put("/update-profile", updateUserProfile);

// (D) Delete user profile by username and current password
router.delete("/delete-user", deleteUser);

module.exports = router;

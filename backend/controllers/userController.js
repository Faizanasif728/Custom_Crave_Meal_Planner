require("dotenv").config(); // Ensure environment variables are loaded
const mongoose = require("mongoose");
const User = require("../models/users");
const UserProfile = require("../models/UserProfile"); // Import UserProfile model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const calculateCalories = require("../utils/calorieCalculator");

// Email & Password validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// 🔹 Register User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create dummy profile
    const dummyProfile = new UserProfile({
      userId: newUser._id,
      age: 25,
      gender: "not_specified",
      height: 170,
      weight: 70,
      activityLevel: "not_specified",
      goal: "not_specified",
    });

    await dummyProfile.save();

    // JWT Token
    const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    // Set HTTP-only cookie
    res.cookie("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      success: true, // Ensure success field is present
      message: "User registered successfully",
      user: { username, email },
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Error creating user" });
  }
};
// Get user calorie needs
exports.getUserCalories = async (req, res) => {
  try {
    // Ensure `req.user` exists (it should be set by authentication middleware)
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized. User not authenticated." });
    }

    // Find the user's profile using `userId`
    let userProfile = await UserProfile.findOne({ userId: req.user.id });
    console.log("Found User Profile:", userProfile);

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Extract update fields from request body
    const { age, weight, height, activityLevel, goal, gender } = req.body;

    // Prepare update object (only include fields that are provided)
    const updateFields = {};
    if (age !== undefined) updateFields.age = age;
    if (weight !== undefined) updateFields.weight = weight;
    if (height !== undefined) updateFields.height = height;
    if (activityLevel !== undefined) updateFields.activityLevel = activityLevel;
    if (goal !== undefined) updateFields.goal = goal;
    if (gender !== undefined) updateFields.gender = gender;

    // Calculate daily calorie needs with updated values
    const dailyCalories = calculateCalories(
      updateFields.gender || userProfile.gender,
      updateFields.age || userProfile.age,
      updateFields.weight || userProfile.weight,
      updateFields.height || userProfile.height,
      updateFields.activityLevel || userProfile.activityLevel,
      updateFields.goal || userProfile.goal
    );

    // Store `dailyCalories` in UserProfile
    updateFields.dailyCalories = dailyCalories;

    // Update the existing profile using `_id`
    userProfile = await UserProfile.findByIdAndUpdate(
      userProfile._id,
      { $set: updateFields },
      { new: true } // Return updated document
    );

    // Send response
    res.status(200).json({
      message: "Profile updated successfully",
      updatedProfile: userProfile, // Updated profile data
      dailyCalories: dailyCalories, // Newly calculated calorie needs
    });
  } catch (error) {
    console.error("Error updating profile and calculating calories:", error);
    res
      .status(500)
      .json({ message: "Error processing request", error: error.message });
  }
};

// 🔹 Get User Profile (Requires Authentication)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// 🔹 Update User Profile (Authenticated)
exports.updateUserProfile = async (req, res) => {
  try {
    const { newUsername, newEmail, oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update username
    if (newUsername && newUsername !== user.username) {
      const existingUsername = await User.findOne({ username: newUsername });
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      user.username = newUsername;
    }

    // Update email
    if (newEmail && newEmail !== user.email) {
      const existingEmail = await User.findOne({ email: newEmail });
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already taken" });
      }
      user.email = newEmail;
    }

    // Update password
    if (newPassword) {
      if (!oldPassword) {
        return res
          .status(400)
          .json({ message: "Old password is required to update password" });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect old password" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// 🔹 Delete User (Authenticated)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id: req.user.id });

    res.clearCookie("auth"); // Corrected cookie name
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

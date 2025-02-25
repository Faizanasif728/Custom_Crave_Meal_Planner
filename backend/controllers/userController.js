const { v4: uuidv4 } = require("uuid"); // Import UUID generator
require("dotenv").config();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Email & Password Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ✅ Create User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, with one uppercase letter, one number, and one special character.",
      });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already taken" });
    }

    const newUser = new User({
      userId: uuidv4(), // Generate UUID for userId
      username,
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email, _id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// ✅ Get User Profile (Authenticated)
exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    // Support both userId and _id
    const user = await User.findOne({
      $or: [{ _id: userId }, { userId }],
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// ✅ Update User Profile (Authenticated)
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { currentPassword, newUsername, newEmail } = req.body;

    // Support both userId and _id
    const user = await User.findOne({
      $or: [{ _id: userId }, { userId }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (newUsername && newUsername !== user.username) {
      const existingUsername = await User.findOne({ username: newUsername });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      user.username = newUsername;
    }

    if (newEmail && newEmail !== user.email) {
      const existingEmail = await User.findOne({ email: newEmail });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already taken" });
      }
      user.email = newEmail;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

// ✅ Delete User (Authenticated)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { currentPassword } = req.body;

    // Support both userId and _id
    const user = await User.findOne({
      $or: [{ _id: userId }, { userId }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    await User.deleteOne({ $or: [{ _id: userId }, { userId }] });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

require("dotenv").config();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ✅ Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    // Set token in a secure HTTP-only cookie
    res.cookie("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// ✅ Logout User
exports.logout = async (req, res) => {
  try {
    res.clearCookie("auth", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging out" });
  }
};

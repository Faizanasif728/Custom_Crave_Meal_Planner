const User = require("../models/users");
const bcrypt = require("bcryptjs"); // Use bcryptjs consistently
const { v4: uuidv4 } = require("uuid");

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation regex (Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password strength
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already taken" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId: uuidv4(), // Generate unique userId
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Get user profile by username or email
exports.getUserProfile = async (req, res) => {
  try {
    const { username, email } = req.query;

    if (!username && !email) {
      return res.status(400).json({
        message: "Please provide a username or email to search for the user.",
      });
    }

    // Find user based on username or email (excluding password)
    const user = await User.findOne({ $or: [{ username }, { email }] }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, currentPassword, newUsername, newEmail } = req.body;

    // Find user by username
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password before updating
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Check if new username or email is already taken
    if (newUsername && newUsername !== user.username) {
      const existingUsername = await User.findOne({ username: newUsername });
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      user.username = newUsername;
    }

    if (newEmail && newEmail !== user.email) {
      const existingEmail = await User.findOne({ email: newEmail });
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already taken" });
      }
      user.email = newEmail;
    }

    // Save updated user data
    await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { username, currentPassword } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Delete user
    await User.deleteOne({ username });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

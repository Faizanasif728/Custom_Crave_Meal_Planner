const jwt = require("jsonwebtoken");
const User = require("../models/users"); // Import User model

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request
    console.log("✅ Authenticated User:", req.user.id);
    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

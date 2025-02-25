const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check using either _id (MongoDB default) or userId (UUID)
    const user = await User.findOne({
      $or: [{ _id: decoded.userId }, { userId: decoded.userId }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

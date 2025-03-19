const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    if (!token)
      return res.status(401).json({ message: "Access denied, no token" });

    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticateUser;

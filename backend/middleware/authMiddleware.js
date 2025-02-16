require("dotenv").config();
const { verify } = require("jsonwebtoken");

const middleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    verify(token, process.env.SECRET, (error, data) => {
      if (error) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
      }
      req.user = data;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = middleware;

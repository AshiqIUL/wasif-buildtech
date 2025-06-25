// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Add admin data to request
    next(); // Continue to the actual route
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;

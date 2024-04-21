// middlewares.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_secret_key";

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "Authorization token is required" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

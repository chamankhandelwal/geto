import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decodedData = jwt.verify(token, process.env.JWT_SEC);
    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token, login again!" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(401).json({ message: "You are not admin!" });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

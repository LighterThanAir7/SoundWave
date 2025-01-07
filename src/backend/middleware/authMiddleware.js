import jwt from 'jsonwebtoken';
import { validateApiKeys } from '../models/apiKeyModel.js';

export const verifyToken = async (req, res, next) => {
  try {
    const { jwtSecret } = await validateApiKeys();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Adds user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
import jwt from 'jsonwebtoken';
import { validateApiKeys } from '../models/apiKeyModel.js';

export const verifyToken = async (req, res, next) => {
  try {
    const { jwtSecret } = await validateApiKeys();
    const token = req.headers.authorization?.split(' ')[1];

    if (!req.headers.authorization) {
      console.error("Authorization header missing");
    }
    console.log("Authorization token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
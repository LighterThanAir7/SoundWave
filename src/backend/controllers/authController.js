import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import pool from "../db/db.js";

import {
  getUserByEmail,
} from "../models/authModel.js";
import {validateApiKeys} from "../models/apiKeyModel.js";
import { generateUniqueDiscriminator } from "../helpers/userHelper.js";

/**
 * Create a Super Administrator account if it doesn't already exist.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const createSuperAdmin = async (req, res) => {
  try {
    const { email, password, base_username, firstname, lastname, date_birth, sex } = req.body;

    // 1. Provjera jesu li sva obavezna polja prisutna
    if (!email || !password || !base_username) {
      return res.status(400).json({
        message: "Email, password, and base_username are required"
      });
    }

    // 2. Provjera postojećeg korisnika po emailu
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists"
      });
    }

    // 3. Generiranje jedinstvenog discriminatora
    const discriminator = await generateUniqueDiscriminator(base_username);

    // 4. Hash lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Kreiranje Super Administrator korisnika
    await pool.query(
      `INSERT INTO users (
        id_type,
        status,
        email,
        firstname,
        lastname,
        base_username,
        discriminator,
        password,
        date_birth,
        sex,
        created_on
      ) VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        1, // Super Administrator id_type
        email,
        firstname || null,
        lastname || null,
        base_username,
        discriminator,
        hashedPassword,
        date_birth || null,
        sex || null
      ]
    );

    res.status(201).json({
      message: "Super Administrator created successfully"
    });
  } catch (error) {
    console.error("Error creating Super Administrator:", error);
    res.status(500).json({
      message: "An error occurred while creating Super Administrator",
      error: error.message
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password, remember_me } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Get JWT secrets
    const { jwtSecret, jwtRefreshSecret } = await validateApiKeys();
    if (!jwtSecret || !jwtRefreshSecret) {
      return res.status(500).json({ message: "Authentication system error" });
    }

    // Get user from database
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND (id_type = 1 OR id_type = 2)",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.id_type },
      jwtSecret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      jwtRefreshSecret,
      { expiresIn: remember_me ? '7d' : '24h' }
    );

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: remember_me ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 7 days or 24 hours
      path: '/api/auth/refresh' // Restrict cookie to refresh endpoint
    });

    // Store refresh token hash in database
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await pool.query(
      "UPDATE users SET refresh_token = ? WHERE id = ?",
      [refreshTokenHash, user.id]
    );

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.id_type,
        base_username: user.base_username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Get JWT secrets
    const { jwtSecret, jwtRefreshSecret } = await validateApiKeys();
    if (!jwtSecret || !jwtRefreshSecret) {
      return res.status(500).json({ message: "Authentication system error" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, jwtRefreshSecret);

    // Get user and their stored refresh token hash
    const [users] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = users[0];

    // Verify stored refresh token
    const validRefreshToken = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!validRefreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.id_type },
      jwtSecret,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { jwtSecret } = await validateApiKeys();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, jwtSecret);
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password, remember_me } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Get JWT secrets
    const { jwtSecret, jwtRefreshSecret } = await validateApiKeys();
    if (!jwtSecret || !jwtRefreshSecret) {
      return res.status(500).json({ message: "Authentication system error" });
    }

    // Get user from database - note the id_type = 3 for regular users
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND id_type = 3",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.id_type, base_username: user.base_username },
      jwtSecret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      jwtRefreshSecret,
      { expiresIn: remember_me ? '7d' : '24h' }
    );

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: remember_me ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh'
    });

    // Store refresh token hash in database
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await pool.query(
      "UPDATE users SET refresh_token = ?, last_login = NOW() WHERE id = ?",
      [refreshTokenHash, user.id]
    );

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.id_type,
        base_username: user.base_username,
        discriminator: user.discriminator
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};


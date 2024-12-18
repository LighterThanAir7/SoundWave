import bcrypt from "bcrypt";
import pool from "../db/db.js";

import {
  getUserByEmail,
} from "../models/authModel.js";

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

async function generateUniqueDiscriminator(baseUsername) {
  // First, check if username has already reached capacity
  const [capacityReached] = await pool.query(
    "SELECT 1 FROM username_capacity_reached WHERE base_username = ?",
    [baseUsername]
  );

  if (capacityReached.length > 0) {
    // Increment the attempts counter
    await pool.query(
      "UPDATE username_capacity_reached SET attempts_after_capacity = attempts_after_capacity + 1 WHERE base_username = ?",
      [baseUsername]
    );
    throw new Error(`The username "${baseUsername}" has no available discriminators. Please choose a different username.`);
  }

  // If not at capacity, proceed with random approach
  for (let attempt = 0; attempt < 10; attempt++) {
    const randomNum = Math.floor(Math.random() * 10000);
    const discriminator = randomNum.toString().padStart(4, '0');

    const [existing] = await pool.query(
      "SELECT 1 FROM users WHERE base_username = ? AND discriminator = ?",
      [baseUsername, discriminator]
    );

    if (existing.length === 0) {
      return discriminator;
    }
  }

  // If random approach fails, resort to sequential approach
  for (let i = 1; i < 10000; i++) {
    const discriminator = i.toString().padStart(4, '0');

    const [existing] = await pool.query(
      "SELECT 1 FROM users WHERE base_username = ? AND discriminator = ?",
      [baseUsername, discriminator]
    );

    if (existing.length === 0) {
      return discriminator;
    }
  }

  // If we get here, all discriminators are taken
  // Log this username to our tracking table with initial attempts count of 1
  await pool.query(
    "INSERT INTO username_capacity_reached (base_username, attempts_after_capacity) VALUES (?, 1)",
    [baseUsername]
  );

  throw new Error(`The username "${baseUsername}" has no available discriminators. Please choose a different username.`);
}


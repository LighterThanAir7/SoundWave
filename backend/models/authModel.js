import pool from "../db/db.js";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const getAdminByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND (id_type = 1 OR id_type = 2)",
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const createSuperAdminModel = async (userData) => {
  const { email, firstname, lastname, base_username, discriminator, password, date_birth, sex } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
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

  return result;
};

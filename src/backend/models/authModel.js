import pool from "../db/db.js";

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
};

export const getUserRoleName = async (roleId) => {
  const [rows] = await pool.query("SELECT name FROM spt_user_type WHERE id = ?", [roleId]);
  return rows.length > 0 ? rows[0].name : null;
};










/**
 * Store a new refresh token in the database.
 * @param {string} token - The refresh token to store.
 * @param {number} userId - The associated user ID.
 * @returns {Promise<void>}
 */
export const storeRefreshToken = async (token, userId) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // Token valid for 7 days

  await pool.query(
    "INSERT INTO refresh_tokens (token, user_id, expiry_date) VALUES (?, ?, ?)",
    [token, userId, expiryDate]
  );
};

/**
 * Check if a refresh token is valid.
 * @param {string} token - The refresh token to validate.
 * @returns {Promise<boolean>} - Returns true if token is valid, otherwise false.
 */
export const validateRefreshToken = async (token) => {
  const [rows] = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token = ? AND expiry_date > NOW()",
    [token]
  );
  return rows.length > 0; // Token is valid if the query returns rows
};

/**
 * Delete a refresh token from the database.
 * @param {string} token - The refresh token to delete.
 * @returns {Promise<void>}
 */
export const deleteRefreshToken = async (token) => {
  await pool.query("DELETE FROM refresh_tokens WHERE token = ?", [token]);
};
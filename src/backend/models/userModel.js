import pool from "../db/db.js";

export const createUser = async ({
     email,
     password,
     displayName,
     dateOfBirth,
     gender,
     marketingConsent,
     dataSharingConsent
   }) => {
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
      marketing_consent,
      data_sharing_consent,
      created_on
    ) VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      3, // Regular user type
      email,
      displayName,
      '', // Empty lastname
      displayName,
      discriminator,
      password,
      dateOfBirth,
      gender.charAt(0).toUpperCase(),
      marketingConsent ? 1 : 0,
      dataSharingConsent ? 1 : 0
    ]
  );

  return result.insertId;
};

export const checkExistingUsername = async (baseUsername, discriminator) => {
  const [rows] = await pool.query(
    "SELECT 1 FROM users WHERE base_username = ? AND discriminator = ?",
    [baseUsername, discriminator]
  );
  return rows.length > 0;
};

export const checkUsernameCapacity = async (baseUsername) => {
  const [rows] = await pool.query(
    "SELECT 1 FROM username_capacity_reached WHERE base_username = ?",
    [baseUsername]
  );
  return rows.length > 0;
};

export const incrementCapacityAttempts = async (baseUsername) => {
  await pool.query(
    "UPDATE username_capacity_reached SET attempts_after_capacity = attempts_after_capacity + 1 WHERE base_username = ?",
    [baseUsername]
  );
};

export const logUsernameCapacityReached = async (baseUsername) => {
  await pool.query(
    "INSERT INTO username_capacity_reached (base_username, attempts_after_capacity) VALUES (?, 1)",
    [baseUsername]
  );
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
};

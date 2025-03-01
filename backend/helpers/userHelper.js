import pool from "../db/db.js";

export async function generateUniqueDiscriminator(baseUsername) {
  // Check if username has reached capacity
  const [capacityReached] = await pool.query(
    "SELECT 1 FROM username_capacity_reached WHERE base_username = ?",
    [baseUsername]
  );

  if (capacityReached.length > 0) {
    await pool.query(
      "UPDATE username_capacity_reached SET attempts_after_capacity = attempts_after_capacity + 1 WHERE base_username = ?",
      [baseUsername]
    );
    throw new Error(`The username "${baseUsername}" has no available discriminators. Please choose a different username.`);
  }

  // Try random approach first
  for (let attempt = 0; attempt < 10; attempt++) {
    const randomNum = Math.floor(Math.random() * 10000);
    const discriminator = randomNum.toString().padStart(4, '0');
    const [existing] = await pool.query(
      "SELECT 1 FROM users WHERE base_username = ? AND discriminator = ?",
      [baseUsername, discriminator]
    );
    if (existing.length === 0) return discriminator;
  }

  // If random fails, try sequential
  for (let i = 1; i < 10000; i++) {
    const discriminator = i.toString().padStart(4, '0');
    const [existing] = await pool.query(
      "SELECT 1 FROM users WHERE base_username = ? AND discriminator = ?",
      [baseUsername, discriminator]
    );
    if (existing.length === 0) return discriminator;
  }

  // If all discriminators are taken, log and throw error
  await pool.query(
    "INSERT INTO username_capacity_reached (base_username, attempts_after_capacity) VALUES (?, 1)",
    [baseUsername]
  );
  throw new Error(`The username "${baseUsername}" has no available discriminators. Please choose a different username.`);
}

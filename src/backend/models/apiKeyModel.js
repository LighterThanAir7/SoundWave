import pool from '../db/db.js';
import { encrypt, decrypt } from '../utils/apiKeyManager.js';

export const storeSecrets = async (keyName, apiKey, secretKey, jwtSecret, jwtRefreshSecret) => {
  const encryptedApiKey = encrypt(apiKey);
  const encryptedSecretKey = encrypt(secretKey);
  const encryptedJwtSecret = encrypt(jwtSecret);
  const encryptedJwtRefreshSecret = encrypt(jwtRefreshSecret);

  // Using REPLACE instead of INSERT
  await pool.query(
    'REPLACE INTO api_keys (key_name, encrypted_key) VALUES (?, ?), (?, ?), (?, ?), (?, ?)',
    [
      keyName + '_api', encryptedApiKey,
      keyName + '_secret', encryptedSecretKey,
      keyName + '_jwt', encryptedJwtSecret,
      keyName + '_jwt_refresh', encryptedJwtRefreshSecret
    ]
  );
};

export const validateApiKeys = async (apiKey, secretKey) => {
  const [rows] = await pool.query('SELECT * FROM api_keys WHERE is_active = TRUE');

  let foundApiKey = false;
  let foundSecretKey = false;
  let jwtSecret = null;
  let jwtRefreshSecret = null;

  for (const row of rows) {
    if (!row.encrypted_key) {
      continue;
    }

    const decryptedKey = decrypt(row.encrypted_key);
    if (row.key_name.endsWith('_api') && decryptedKey === apiKey) foundApiKey = true;
    if (row.key_name.endsWith('_secret') && decryptedKey === secretKey) foundSecretKey = true;
    if (row.key_name.endsWith('_jwt')) jwtSecret = decryptedKey;
    if (row.key_name.endsWith('_jwt_refresh')) jwtRefreshSecret = decryptedKey;
  }

  return {
    isValid: foundApiKey && foundSecretKey,
    jwtSecret,
    jwtRefreshSecret
  };
};

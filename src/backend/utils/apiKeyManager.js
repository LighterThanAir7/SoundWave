import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export const generateJwtSecrets = () => {
  return {
    jwtSecret: crypto.randomBytes(32).toString('base64'),
    jwtRefreshSecret: crypto.randomBytes(32).toString('base64')
  };
};

export const encrypt = (text) => {
  if (!process.env.API_KEY_ENCRYPTION_KEY) {
    throw new Error('API_KEY_ENCRYPTION_KEY is not defined in environment variables');
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(process.env.API_KEY_ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (text) => {
  if (!text) {
    throw new Error('Cannot decrypt undefined or empty text');
  }

  if (!process.env.API_KEY_ENCRYPTION_KEY) {
    throw new Error('API_KEY_ENCRYPTION_KEY is not defined');
  }

  try {
    const textParts = text.split(':');
    if (textParts.length < 2) {
      throw new Error('Invalid encrypted text format');
    }

    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(process.env.API_KEY_ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
};

export const generateApiKeyPair = () => {
  const customWord = "icecream";
  const prefix = crypto.createHash('sha256').update(customWord).digest('hex').slice(0, 8);
  return {
    apiKey: `${prefix}_${crypto.randomUUID().replace(/-/g, '')}`,
    secretKey: `${prefix}_${crypto.randomUUID().replace(/-/g, '')}`
  };
};
